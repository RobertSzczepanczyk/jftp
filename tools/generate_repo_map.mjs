#!/usr/bin/env node
// Deterministic, read-only repository map generator. Node built-ins only.
// This intentionally uses a Java lexical/structural scanner, not tree-sitter.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const GENERATED = new Set(['docs/repo-map.json', 'docs/repo-map-full.md', 'docs/repo-map.md']);
const DEFAULT_BUDGET = 1000;
const VERSION = 1;
const TEXT_EXTENSIONS = new Set(['.java','.properties','.prefs','.xml','.html','.txt','.md','.dtd','.css','.bat','.sh','.classpath','.project']);

function argsOf(argv) {
  const out = { focus: null, maxTokens: DEFAULT_BUDGET, stdout: false, check: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--focus') out.focus = argv[++i];
    else if (a === '--max-tokens') out.maxTokens = Number(argv[++i]);
    else if (a === '--stdout') out.stdout = true;
    else if (a === '--check') out.check = true;
    else if (a === '--help' || a === '-h') out.help = true;
    else throw new Error(`Unknown option: ${a}`);
  }
  if (!Number.isInteger(out.maxTokens) || out.maxTokens < 100) throw new Error('--max-tokens must be an integer >= 100');
  if (out.check && (out.focus || out.stdout || out.maxTokens !== DEFAULT_BUDGET)) throw new Error('--check compares only the default un-focused artifacts; do not combine it with --focus, --stdout, or a custom --max-tokens');
  return out;
}

function norm(p) { return p.split(path.sep).join('/'); }
function cmp(a,b) { return a < b ? -1 : a > b ? 1 : 0; }
function sha256(buf) { return crypto.createHash('sha256').update(buf).digest('hex'); }
function isMap(p) { return GENERATED.has(p); }
function textLineCount(text) {
  if (!text.length) return 0;
  return text.split(/\r\n|\n|\r/).length - (/\r\n$|\n$|\r$/.test(text) ? 1 : 0);
}
function byteLineCount(buf) {
  if (!buf.length) return 0;
  let lines=0;
  for(let i=0;i<buf.length;i++) if(buf[i]===10 || buf[i]===13) { lines++; if(buf[i]===13 && buf[i+1]===10) i++; }
  const last=buf[buf.length-1];
  return lines + (last===10 || last===13 ? 0 : 1);
}

function trackedFiles() {
  return execFileSync('git', ['ls-files', '-z'], { cwd: ROOT, encoding: 'utf8' }).split('\0').filter(Boolean).map(norm);
}

function allowedTaskFile(rel) {
  if (rel === 'micro' || rel.startsWith('.git/')) return false;
  if (rel === 'AGENTS.md' || rel === 'CLAUDE.md') return true;
  if (/(^|\/)AGENTS\.md$|(^|\/)CLAUDE\.md$/i.test(rel)) return true;
  if (rel.startsWith('docs/') && rel.toLowerCase().endsWith('.md')) return true;
  if (rel.startsWith('tools/')) return true;
  return false;
}

function walkApproved(dir = '', result = []) {
  const ents = fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true }).sort((a, b) => cmp(a.name,b.name));
  for (const ent of ents) {
    const rel = dir ? `${dir}/${ent.name}` : ent.name;
    if (ent.name === '.git' || ent.name === 'node_modules' || ent.name === '__pycache__' || ent.name === '.cache' || rel === 'micro') continue;
    if (ent.isDirectory()) walkApproved(rel, result);
    else if (ent.isFile() && allowedTaskFile(rel)) result.push(rel);
  }
  return result;
}

function tokenizeJava(source) {
  const tokens = [];
  let i = 0, line = 1;
  const push = (value, kind, ln) => tokens.push({ value, kind, line: ln });
  while (i < source.length) {
    const c = source[i], n = source[i + 1], startLine = line;
    if (c === '\n') { line++; i++; continue; }
    if (/\s/.test(c)) { i++; continue; }
    if (c === '/' && n === '/') { i += 2; while (i < source.length && source[i] !== '\n') i++; continue; }
    if (c === '/' && n === '*') { i += 2; while (i < source.length) { if (source[i] === '\n') line++; if (source[i] === '*' && source[i + 1] === '/') { i += 2; break; } i++; } continue; }
    if (c === '"' && source.slice(i, i + 3) === '"""') {
      i += 3;
      while (i < source.length) { if (source[i] === '\n') line++; if (source.slice(i, i + 3) === '"""' && source[i - 1] !== '\\') { i += 3; break; } if (source[i] === '\\') i++; i++; }
      push('<literal>', 'literal', startLine); continue;
    }
    if (c === '"' || c === "'") {
      const q = c; i++;
      while (i < source.length) { if (source[i] === '\n') line++; if (source[i] === '\\') { i += 2; continue; } if (source[i++] === q) break; }
      push('<literal>', 'literal', startLine); continue;
    }
    if (/[\p{ID_Start}_$]/u.test(c)) { const begin=i; i++; while (i < source.length && /[\p{ID_Continue}_$]/u.test(source[i])) i++; push(source.slice(begin, i), 'id', startLine); continue; }
    if (/[0-9]/.test(c)) { i++; while (i < source.length && /[\p{ID_Continue}.]/u.test(source[i])) i++; push('<number>', 'literal', startLine); continue; }
    const op = ['...', '::', '->', '<<=', '==', '!=', '<=', '>=', '&&', '||', '++', '--', '+=', '-=', '*=', '/=', '%=', '&=', '|=', '^=', '<<'].find(x => source.startsWith(x, i));
    if (op) { push(op, 'punct', startLine); i += op.length; } else { push(c, 'punct', startLine); i++; }
  }
  return tokens;
}

function pretty(ts) {
  let out = '', prev = '';
  const tightLeft = new Set(['.', '::', ',', ';', ')', ']', '>', '...', '(', '[']);
  const tightRightPrev = new Set(['.', '::', '(', '[', '<', '@']);
  for (const t of ts) {
    const v = t.value;
    if (v === '<literal>' || v === '<number>') continue;
    const word = t.kind === 'id';
    const prevWord = /^[\p{ID_Continue}_$]+$/u.test(prev) || prev === '>' || prev === ']' || prev === ')';
    if (out && !tightLeft.has(v) && !tightRightPrev.has(prev) && (word || prevWord || v === '@')) out += ' ';
    out += v;
    prev = v;
  }
  return out.trim();
}

function matching(tokens, open, left = '{', right = '}') {
  let depth = 0;
  for (let i = open; i < tokens.length; i++) {
    if (tokens[i].value === left) depth++;
    else if (tokens[i].value === right && --depth === 0) return i;
  }
  return tokens.length - 1;
}

function typeDefinitions(tokens, filePackage) {
  const types = [];
  for (let i = 0; i < tokens.length; i++) {
    const v = tokens[i].value;
    if (!['class', 'interface', 'enum', 'record'].includes(v)) continue;
    if (tokens[i - 1]?.value === '.') continue;
    const nameToken = tokens[i + 1];
    if (!nameToken || nameToken.kind !== 'id') continue;
    let open = i + 2, paren = 0, angle = 0, square = 0;
    while (open < tokens.length) {
      const x = tokens[open].value;
      if (x === '(') paren++; else if (x === ')') paren--;
      else if (x === '<') angle++; else if (x === '>') angle = Math.max(0, angle - 1);
      else if (x === '[') square++; else if (x === ']') square--;
      if (x === '{' && paren === 0 && angle === 0 && square === 0) break;
      if (x === ';' && paren === 0) break;
      open++;
    }
    if (tokens[open]?.value !== '{') continue;
    const close = matching(tokens, open);
    const header = tokens.slice(i, open);
    const extendsTypes = [], implementsTypes = [];
    let mode = '', angleDepth=0, segment=[];
    const flushType=()=>{
      if(!mode||!segment.length) {segment=[];return;}
      const ids=segment.filter(t=>t.kind==='id');
      const ref=ids.at(-1)?.value;
      const list=mode==='extends'?extendsTypes:implementsTypes;
      if(ref&&!list.includes(ref)) list.push(ref);
      segment=[];
    };
    for(let j=i+2;j<open;j++) {
      const v=tokens[j].value;
      if(v==='<') {angleDepth++; if(angleDepth===1) continue;}
      if(v==='>') {angleDepth=Math.max(0,angleDepth-1); if(angleDepth===0) continue;}
      if(angleDepth>0) continue;
      if(v==='extends'||v==='implements') {flushType();mode=v;continue;}
      if(v==='permits') {flushType();mode='';continue;}
      if(v===',') {flushType();continue;}
      if(mode) segment.push(tokens[j]);
    }
    flushType();
    let kind = v;
    if (v === 'interface' && tokens[i - 1]?.value === '@') kind = 'annotation';
    let prefixStart=i-1;
    while(prefixStart>=0 && ![';','{','}'].includes(tokens[prefixStart].value)) prefixStart--;
    const prefix=tokens.slice(prefixStart+1,i).map(t=>t.value);
    const modifiers=prefix.filter(x=>['public','protected','private','abstract','final','static','sealed','non-sealed'].includes(x));
    const visibility=modifiers.includes('public')?'public':modifiers.includes('protected')?'protected':modifiers.includes('private')?'private':'package';
    const signature = `${modifiers.length?`${modifiers.join(' ')} `:''}${kind} ${filePackage ? `${filePackage}.` : ''}${nameToken.value}`;
    types.push({ kind, name: nameToken.value, qualifiedName: filePackage ? `${filePackage}.${nameToken.value}` : nameToken.value,
      line: tokens[i].line, signature, extends: extendsTypes, implements: implementsTypes, open, close, keyword: i,
      modifiers, visibility });
  }
  types.sort((a,b) => a.open - b.open || b.close - a.close);
  for (const t of types) {
    const parent=types.filter(p=>p!==t&&p.open<t.open&&p.close>t.close).sort((a,b)=>(a.close-a.open)-(b.close-b.open))[0];
    t.qualifiedName=parent?`${parent.qualifiedName}.${t.name}`:(filePackage?`${filePackage}.${t.name}`:t.name);
    const mod=t.modifiers.length?`${t.modifiers.join(' ')} `:'';
    t.signature=`${mod}${t.kind} ${t.qualifiedName}`;
  }
  return types;
}

function memberDefinitions(tokens, types) {
  const result = [];
  for (const owner of types) {
    let i = owner.open + 1;
    while (i < owner.close) {
      const nested = types.find(t => t !== owner && t.keyword === i);
      if (nested) { i = nested.close + 1; continue; }
      if (tokens[i].value === ';') { i++; continue; }
      const start = i;
      let paren = 0, bracket = 0, angle = 0, j = i, delim = '';
      for (; j < owner.close; j++) {
        const v = tokens[j].value;
        if (v === '(') paren++; else if (v === ')') paren--;
        else if (v === '[') bracket++; else if (v === ']') bracket--;
        else if (v === '<') angle++;
        else if (v === '>' && angle > 0) angle--;
        if (paren === 0 && bracket === 0 && angle === 0 && (v === '{' || v === ';')) { delim = v; break; }
      }
      if (!delim) break;
      const header = tokens.slice(start, j);
      if (delim === '{') {
        const eq = header.some(t => t.value === '=');
        const parens = header.map((t,k) => t.value === '(' ? k : -1).filter(k => k >= 0);
        let methodAt = -1;
        for (const k of parens) if (header[k - 1]?.kind === 'id' && header[k - 1]?.value !== 'if' && header[k - 1]?.value !== 'for' && header[k - 1]?.value !== 'while' && header[k - 1]?.value !== 'switch' && header[k - 1]?.value !== 'catch' && header[k - 1]?.value !== 'synchronized') methodAt = k;
        if (!eq && methodAt > 0) {
          const name = header[methodAt - 1].value;
          const closeParen = matching(header, methodAt, '(', ')');
          const visibility = header.some(t => t.value === 'private') ? 'private' : header.some(t => t.value === 'public') ? 'public' : header.some(t => t.value === 'protected') ? 'protected' : 'package';
          if (closeParen > methodAt) {
            const signature = pretty(header);
            result.push({ kind: name === owner.name ? 'constructor' : 'method', owner: owner.qualifiedName, name,
              line: header[0]?.line ?? tokens[start].line, visibility, signature });
          }
        }
        const close = matching(tokens, j);
        i = close + 1;
        if (tokens[i]?.value === ';') i++;
      } else {
        const hasParen = header.some(t => t.value === '(');
        const eq = header.findIndex(t => t.value === '=');
        const methodParen = header.findIndex((t,k) => t.value === '(' && header[k - 1]?.kind === 'id');
        if (hasParen && eq < 0 && methodParen > 0) {
          const methodCandidates = header.map((t,k) => t.value === '(' && header[k - 1]?.kind === 'id' ? k : -1).filter(k => k >= 0);
          const at = methodCandidates.at(-1);
          const name = header[at - 1].value;
          const visibility = header.some(t => t.value === 'private') ? 'private' : header.some(t => t.value === 'public') ? 'public' : header.some(t => t.value === 'protected') ? 'protected' : 'package';
          result.push({ kind: name === owner.name ? 'constructor' : 'method', owner: owner.qualifiedName, name, line: header[0]?.line ?? tokens[start].line, visibility, signature: pretty(header) });
        } else if (!hasParen && header.length) {
          const visibility = header.some(t => t.value === 'private') ? 'private' : header.some(t => t.value === 'public') ? 'public' : header.some(t => t.value === 'protected') ? 'protected' : 'package';
          {
            const beforeEq = eq < 0 ? header : header.slice(0, eq);
            const chunks = []; let depth = 0, chunk = [];
            for (const t of beforeEq) { if (t.value === '<') depth++; if (t.value === '>') depth--; if (t.value === ',' && depth === 0) { chunks.push(chunk); chunk = []; } else chunk.push(t); }
            if (chunk.length) chunks.push(chunk);
            for (const ch of chunks) {
              const ids = ch.filter(t => t.kind === 'id');
              if (ids.length >= 2) {
                const nameToken=ids.at(-1), nameAt=ch.lastIndexOf(nameToken);
                const typeTokens=ch.slice(0,nameAt).filter(t=>!['public','protected','private','static','final','transient','volatile'].includes(t.value));
                result.push({ kind: 'field', owner: owner.qualifiedName, name: nameToken.value, type: pretty(typeTokens), line: nameToken.line, visibility });
              }
            }
          }
        }
        i = j + 1;
      }
    }
  }
  return result;
}

function parseJava(source, rel) {
  const tokens = tokenizeJava(source);
  let packageName = '';
  const imports = [];
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].value === 'package') {
      const parts = []; for (let j=i+1; j<tokens.length && tokens[j].value !== ';'; j++) parts.push(tokens[j].value);
      packageName = parts.join('');
    }
    if (tokens[i].value === 'import') {
      let j=i+1, isStatic=false;
      if (tokens[j]?.value === 'static') { isStatic=true; j++; }
      const parts=[]; for (;j<tokens.length && tokens[j].value !== ';';j++) parts.push(tokens[j].value);
      imports.push({ name: parts.join(''), static: isStatic, line: tokens[i].line });
    }
  }
  const types = typeDefinitions(tokens, packageName);
  const members = memberDefinitions(tokens, types);
  const defs = [...types.map(({open,close,keyword,...x})=>x), ...members].sort((a,b)=>a.line-b.line || a.kind.localeCompare(b.kind) || a.name.localeCompare(b.name));
  const refs = [];
  for (const t of types) refs.push(...t.extends.map(name=>({name,relation:'extends',line:t.line})), ...t.implements.map(name=>({name,relation:'implements',line:t.line})));
  return { path: rel, package: packageName, imports, definitions: defs, typeReferences: refs, tokenIdentifiers: tokens.filter(t=>t.kind==='id').map(t=>t.value) };
}

function classify(file) {
  const ext = path.posix.extname(file).toLowerCase();
  if (ext === '.java') return 'java';
  if (['.gif','.png','.jpg','.jpeg','.icns','.ico','.bmp','.pdf','.zip','.jar','.class','.keystore','.jks'].includes(ext)) return 'binary';
  if (file.endsWith('.gitkeep')) return 'empty-placeholder';
  return 'text-or-unknown';
}

function inventory() {
  const tracked = new Set(trackedFiles());
  const all = new Set([...tracked, ...walkApproved(), ...GENERATED]);
  const rows = [];
  for (const rel of [...all].sort(cmp)) {
    if (isMap(rel)) { rows.push({ path: rel, tracked: tracked.has(rel), generated: true, extension: path.posix.extname(rel)||null, bytes: 0, kind: 'generated-map-metadata-only' }); continue; }
    const full = path.join(ROOT, ...rel.split('/'));
    let buf;
    try { buf = fs.readFileSync(full); } catch { continue; }
    const ext = path.posix.extname(rel).toLowerCase();
    const base = { path: rel, tracked: tracked.has(rel), generated: false, extension: ext || null, bytes: buf.length };
    const obviousBinary = classify(rel) === 'binary' || buf.includes(0);
    if (obviousBinary) { rows.push({ ...base, kind: 'binary' }); continue; }
    let text, encoding='UTF-8';
    try { text = new TextDecoder('utf-8', { fatal: true }).decode(buf); }
    catch {
      if (!TEXT_EXTENSIONS.has(ext)) { rows.push({ ...base, kind: 'binary' }); continue; }
      encoding='legacy-encoding-unresolved';
      if(ext==='.java') text=buf.toString('latin1');
    }
    const lines = text===undefined ? byteLineCount(buf) : textLineCount(text);
    const row = { ...base, kind: classify(rel) === 'java' ? 'source' : buf.length === 0 ? 'empty-text' : encoding==='UTF-8'?'text':'text-non-UTF8', lines, sha256: sha256(buf), encoding };
    if (row.kind === 'source') Object.assign(row, parseJava(text, rel));
    rows.push(row);
  }
  return rows;
}

function graphOf(files) {
  const java = files.filter(f=>f.kind==='source');
  const typeToFile = new Map(), simpleToFiles = new Map();
  for (const f of java) for (const d of f.definitions.filter(x=>['class','interface','enum','record','annotation'].includes(x.kind))) {
    typeToFile.set(d.qualifiedName, f.path);
    if (!simpleToFiles.has(d.name)) simpleToFiles.set(d.name, []);
    simpleToFiles.get(d.name).push(f.path);
  }
  const edges = new Map(), unresolved = [];
  const add = (from,to,kind,reference) => {
    if (!to || from===to) return;
    const key = `${from}\0${to}\0${kind}`;
    const e = edges.get(key) || { from, to, kind, references: [] };
    if (reference && !e.references.includes(reference)) e.references.push(reference);
    edges.set(key,e);
  };
  for (const f of java) {
    for (const imp of f.imports) {
      if (imp.name.endsWith('.*')) {
        const pkg=imp.name.slice(0,-2);
        const targets=java.filter(x=>x.package===pkg && x.path!==f.path);
        for (const target of targets) add(f.path,target.path,'package-import',imp.name);
        if (!targets.length) unresolved.push({from:f.path,name:imp.name,reason:'external-or-unresolved-package-import'});
      } else {
        let target=typeToFile.get(imp.name);
        if(!target && imp.static) {
          const parts=imp.name.split('.');
          while(parts.length>1 && !target) { parts.pop(); target=typeToFile.get(parts.join('.')); }
        }
        if (target) add(f.path,target,'import',imp.name);
        else unresolved.push({from:f.path,name:imp.name,reason:'external-or-unresolved-import'});
      }
    }
    for (const ref of f.typeReferences) {
      const candidates=simpleToFiles.get(ref.name)||[];
      const same=candidates.find(p=>java.find(x=>x.path===p)?.package===f.package);
      const target=same || (candidates.length===1 ? candidates[0] : null);
      if (target) add(f.path,target,`declared-${ref.relation}`,ref.name);
      else if (!['Object','Exception','RuntimeException','Throwable','Error','Comparable','Serializable','Cloneable','Enum','Record'].includes(ref.name)) unresolved.push({from:f.path,name:ref.name,reason:`unresolved-${ref.relation}-type`});
    }
  }
  for (const f of java) {
    const own = new Set(f.definitions.filter(x=>['class','interface','enum','record','annotation'].includes(x.kind)).map(x=>x.name));
    const direct = new Set();
    for (const e of edges.values()) if (e.from===f.path && e.kind!=='ambiguous-identifier') direct.add(e.to);
    const names=[...new Set(f.tokenIdentifiers)].filter(x=>/^[A-Z]/.test(x)&&!own.has(x));
    for (const name of names) for (const target of simpleToFiles.get(name)||[]) {
      if (target!==f.path && !direct.has(target)) add(f.path,target,'ambiguous-identifier',name);
    }
  }
  return { edges:[...edges.values()].map(e=>({...e,references:e.references.sort(cmp)})).sort((a,b)=>cmp(a.from,b.from)||cmp(a.to,b.to)||cmp(a.kind,b.kind)), unresolved:unresolved.sort((a,b)=>cmp(a.from,b.from)||cmp(a.name,b.name)) };
}

function ranks(paths, edges) {
  const ids=[...paths].sort(cmp), n=ids.length, damping=.85;
  const rank=new Map(ids.map(p=>[p,1/Math.max(1,n)]));
  const outgoing=new Map(ids.map(p=>[p,[]]));
  for(const e of edges) {
    const weight=e.kind==='ambiguous-identifier'?.25:e.kind==='package-import'?.75:1;
    outgoing.get(e.from)?.push([e.to,weight]);
  }
  for(let it=0;it<35;it++) {
    const next=new Map(ids.map(p=>[p,(1-damping)/Math.max(1,n)]));
    let dangling=0;
    for(const p of ids) {
      const outs=outgoing.get(p)||[], sum=outs.reduce((s,x)=>s+x[1],0);
      if(!sum) { dangling+=rank.get(p); continue; }
      for(const [target,w] of outs) next.set(target,(next.get(target)||0)+damping*rank.get(p)*w/sum);
    }
    const spread=damping*dangling/Math.max(1,n);
    for(const p of ids) next.set(p,next.get(p)+spread);
    rank.clear(); for(const [p,v] of next) rank.set(p,v);
  }
  return rank;
}

function selectedPaths(files, edges, focus) {
  const java=files.filter(f=>f.kind==='source');
  if(!focus) return java.map(f=>f.path);
  const f=focus.replaceAll('\\','/').replace(/^\.\//,'');
  if(!java.some(x=>x.path===f)) throw new Error(`--focus must name a Java source path in the map: ${f}`);
  const seen=new Set([f]);
  for(const e of edges) if(e.kind!=='ambiguous-identifier' && (e.from===f||e.to===f)) seen.add(e.from===f?e.to:e.from);
  return [...seen];
}

function estimateTokens(s) { return Math.ceil(Buffer.byteLength(s,'utf8')/4); }
function priorityDefinitions(file, edges) {
  const refs=new Map();
  for(const e of edges) if(e.to===file.path) for(const name of e.references) refs.set(name,(refs.get(name)||0)+1);
  const types=file.definitions.filter(d=>['class','interface','enum','record','annotation'].includes(d.kind));
  const members=file.definitions.filter(d=>!['class','interface','enum','record','annotation'].includes(d.kind));
  return [...types,...members].sort((a,b)=> (a.visibility==='private'?1:0)-(b.visibility==='private'?1:0) || (refs.get(b.name)||0)-(refs.get(a.name)||0) || (a.kind==='field'?1:0)-(b.kind==='field'?1:0) || a.line-b.line || a.name.localeCompare(b.name));
}

function compactMarkdown(files, graph, focus, budget) {
  const byPath=new Map(files.map(f=>[f.path,f]));
  const candidates=selectedPaths(files,graph.edges,focus);
  const rank=ranks(candidates,graph.edges.filter(e=>candidates.includes(e.from)&&candidates.includes(e.to)));
  candidates.sort((a,b)=>rank.get(b)-rank.get(a)||cmp(a,b));
  const scope=focus?`Focus: \`${focus}\` and high-confidence one-hop reference neighborhood.`:'Repository-wide ranked source selection.';
  const total=files.length, sourceCount=files.filter(x=>x.kind==='source').length;
  let out=`# Compact repository map\n\n${scope}\n\nPartial ranked context from structural references; ambiguous lexical matches are weaker. Edges are not calls. Estimate: ceil(UTF-8 bytes / 4), not a model tokenizer.\n\nInventory: ${total} files (${sourceCount} Java sources); selection budget ${budget} estimated tokens.\n\n`;
  if(estimateTokens(out)>budget) out=`# Compact repository map\n\n${scope}\n\nEstimate: ceil(UTF-8 bytes / 4), not a model tokenizer.\n\n`;
  if(estimateTokens(out)>budget) throw new Error(`budget too small for compact-map header (${estimateTokens(out)} > ${budget})`);
  let included=0, signatures=0, omitted=[];
  for(const p of candidates) {
    const f=byPath.get(p); if(!f) continue;
    const header=`### ${p}\n`;
    if(estimateTokens(out+header)>budget) { omitted.push(p); continue; }
    out+=header; included++;
    const defs=priorityDefinitions(f,graph.edges);
    let used=0;
    for(const d of defs) {
      let line;
      if(['class','interface','enum','record','annotation'].includes(d.kind)) line=`- ${d.signature} (${d.visibility}, line ${d.line})`;
      else if(d.kind==='field') line=`- ${d.visibility} field ${d.type} ${d.name} (line ${d.line})`;
      else line=`- ${d.signature} (line ${d.line})`;
      if(estimateTokens(out+line+'\n')>budget) continue;
      out+=line+'\n'; signatures++; used++;
    }
    if(!used && f.definitions.length) omitted.push(p);
    if(estimateTokens(out+'\n')<=budget) out+='\n';
  }
  const footer=`Map selection: ${included} Java files and ${signatures} definitions included; ${Math.max(0,candidates.length-included)} Java files were omitted or had no fitting signature.\n`;
  if(estimateTokens(out+footer)<=budget) out+=footer;
  out=out.replace(/\n+$/,'')+'\n';
  if(estimateTokens(out)>budget) throw new Error(`compact map exceeds token estimate (${estimateTokens(out)} > ${budget})`);
  return { text:out, estimatedTokens:estimateTokens(out), includedJavaFiles:included, includedDefinitions:signatures, includedPaths:candidates.slice(0,included), rank:ranks(selectedPaths(files,graph.edges,focus),graph.edges.filter(e=>selectedPaths(files,graph.edges,focus).includes(e.from)&&selectedPaths(files,graph.edges,focus).includes(e.to))), candidates };
}

function fullMarkdown(files, graph) {
  const counts={}; for(const f of files) counts[f.kind]=(counts[f.kind]||0)+1;
  let out='# Full repository map\n\n';
  out+='Generated by `tools/generate_repo_map.mjs` with Node built-ins. Definitions and graph are lexical/structural hints, not compiler-resolved semantics. No application code is executed.\n\n';
  out+=`Inventory: ${files.length} files; ${counts.source||0} Java sources; ${counts.binary||0} binary files represented by metadata only; ${graph.edges.length} reference edges.\n\n`;
  out+='## File inventory\n\n| Path | Kind | State | Bytes | Lines | SHA-256 (text/source only) |\n|---|---|---|---:|---:|---|\n';
  for(const f of files) out+=`| \`${f.path}\` | ${f.kind} | ${f.generated?'generated metadata only':f.tracked?'tracked':'approved task file'} | ${f.bytes} | ${f.lines??'—'} | ${f.sha256||'—'} |\n`;
  out+='\n## Java source definitions\n\n';
  for(const f of files.filter(x=>x.kind==='source')) {
    out+=`### \`${f.path}\`\n\n`;
    out+=`Package: \`${f.package||'(default)'}\`; source hash: \`${f.sha256}\`.\n\n`;
    if(!f.definitions.length) out+='No extracted declarations.\n\n';
    else for(const d of f.definitions) {
      if(['class','interface','enum','record','annotation'].includes(d.kind)) out+=`- **${d.kind}** \`${d.qualifiedName}\` — \`${d.signature}\` (line ${d.line}); extends: ${d.extends.join(', ')||'—'}; implements: ${d.implements.join(', ')||'—'}.\n`;
      else if(d.kind==='field') out+=`- field \`${d.owner}.${d.name}\`: \`${d.type}\` (${d.visibility}, line ${d.line}).\n`;
      else out+=`- ${d.kind} \`${d.owner}.${d.name}\`: \`${d.signature}\` (${d.visibility}, line ${d.line}).\n`;
    }
    if(f.imports.length) out+=`\nImports: ${f.imports.map(x=>`\`${x.name}\``).join(', ')}.\n`;
    out+='\n';
  }
  out+="## Reference edges\n\nEdges are file references, not calls. `import`, `package-import`, and declared inheritance/interface edges are higher-confidence structural references; `ambiguous-identifier` edges are weaker name matches and are excluded from the default rank's strongest weight.\n\n";
  for(const e of graph.edges) out+=`- \`${e.from}\` → \`${e.to}\` (**${e.kind}**; ${e.references.map(x=>`\`${x}\``).join(', ')}).\n`;
  out+='\n## Unresolved imports and types referenced by source\n\nThese entries are repository-map resolution gaps, not compiler diagnostics. JDK and third-party imports appear here when their definitions are outside this repository.\n\n';
  for(const u of graph.unresolved) out+=`- \`${u.from}\`: \`${u.name}\` (${u.reason}).\n`;
  if(!graph.unresolved.length) out+='None recorded by this scanner.\n';
  return out;
}

function makeJson(files,graph,compact) {
  const rank=ranks(files.filter(f=>f.kind==='source').map(f=>f.path),graph.edges);
  return { schemaVersion:VERSION, generator:'tools/generate_repo_map.mjs', generatedMapsMetadataOnly:[...GENERATED].sort(),
    analysis:{method:'Node built-in lexical/structural Java scanner; no tree-sitter/compiler AST', tokenEstimate:'ceil(UTF-8 bytes / 4); approximate, not a model tokenizer', rank:{algorithm:'weighted PageRank', damping:.85, iterations:35, edgeWeights:{'import':1,'declared-extends':1,'declared-implements':1,'package-import':.75,'ambiguous-identifier':.25},edgeDirection:'referencing file -> referenced definition/import file',danglingNodes:'redistribute score uniformly per iteration',ties:'repository-relative path ascending'}, compactSymbolPriority:'non-private members before private; higher inbound reference count first; types before fields, then source line/name', limits:['No method bodies/comments/literal values/field initializers are emitted.','Import/type graph is not a semantic call graph.','Named nested types are qualified under their enclosing type. Anonymous classes, lambda bodies, implicit/generated members, enum constants, and record components are not modeled as declarations.','Multiline and overloaded declarations are scanned structurally, but complex Java grammar, generic resolution, annotations, and ambiguous type names can still yield omissions or imperfect signatures.']},
    inventory:{total:files.length,tracked:files.filter(f=>f.tracked).length,approvedTaskFiles:files.filter(f=>!f.tracked&&!f.generated).length,generatedMapEntries:files.filter(f=>f.generated).length,byKind:Object.fromEntries([...new Set(files.map(f=>f.kind))].sort().map(k=>[k,files.filter(f=>f.kind===k).length]))},
    files:files.map(f=>({...f, tokenIdentifiers:undefined})), graph:{edges:graph.edges,unresolved:graph.unresolved}, ranking:[...rank].sort((a,b)=>b[1]-a[1]||cmp(a[0],b[0])).map(([file,score])=>({file,score:Number(score.toFixed(12))})), compact:{defaultBudget:DEFAULT_BUDGET,estimatedTokens:compact.estimatedTokens,includedJavaFiles:compact.includedJavaFiles,includedDefinitions:compact.includedDefinitions,includedPaths:compact.includedPaths} };
}

function writeOrCheck(rel, content, check) {
  const target=path.join(ROOT,...rel.split('/'));
  if(check) {
    if(!fs.existsSync(target) || fs.readFileSync(target,'utf8')!==content) return false;
    return true;
  }
  fs.mkdirSync(path.dirname(target),{recursive:true});
  fs.writeFileSync(target,content,'utf8');
  return true;
}

function main() {
  const opts=argsOf(process.argv.slice(2));
  if(opts.help) { console.log('Usage: node tools/generate_repo_map.mjs [--focus src/path/File.java] [--max-tokens N] [--stdout] [--check]'); return; }
  const files=inventory(), graph=graphOf(files);
  const compact=compactMarkdown(files,graph,opts.focus,opts.maxTokens);
  if(opts.focus||opts.stdout||opts.maxTokens!==DEFAULT_BUDGET) { process.stdout.write(compact.text); return; }
  const full=fullMarkdown(files,graph);
  const json=JSON.stringify(makeJson(files,graph,compact),null,2)+'\n';
  const outputs=[['docs/repo-map.json',json],['docs/repo-map-full.md',full],['docs/repo-map.md',compact.text]];
  if(opts.check) {
    const stale=outputs.filter(([p,s])=>!writeOrCheck(p,s,true)).map(([p])=>p);
    if(stale.length) { console.error(`Stale or missing generated map: ${stale.join(', ')}`); process.exitCode=1; }
    else console.log(`Repository map is current: ${files.length} files, ${files.filter(f=>f.kind==='source').length} Java files, ${graph.edges.length} edges; compact estimate ${compact.estimatedTokens}/${DEFAULT_BUDGET} tokens.`);
    return;
  }
  for(const [p,s] of outputs) writeOrCheck(p,s,false);
  console.log(`Generated ${outputs.map(([p])=>p).join(', ')}; ${files.length} files, ${files.filter(f=>f.kind==='source').length} Java files, ${graph.edges.length} edges; compact ${compact.estimatedTokens}/${opts.maxTokens} estimated tokens.`);
}

try { main(); } catch (err) { console.error(err?.stack||String(err)); process.exitCode=1; }
