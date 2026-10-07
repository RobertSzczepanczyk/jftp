# Review coverage: actions, SSL, resources, help, and images

Static source and asset inventory for the explicitly assigned trees. The manifest covers all 418 pre-existing tracked source/asset files plus 14 scoped guidance files created during this review (432 paths total). Original text files were reviewed in full. Non-text files are inventoried by extension and byte size only. All `.properties` files remain text files even where strict UTF-8 decoding fails; 41 German bundles have that condition, with runtime interpretation covered in [resources-and-help.md](resources-and-help.md). The binary list is not a source-code review and no image was visually inspected.

## Coverage totals

- 418 pre-existing tracked files: 320 text files and 98 binary image files; plus 14 newly created text guidance files, for 432 manifest entries.
- Original text extensions: 41 `.java`, 172 `.properties`, 95 `.html`, 5 `.xml`, 5 `.dtd`, 1 `.css`, 1 `.txt`; plus 14 newly created `.md` scoped guides.
- Binary extensions: 85 `.gif`, 12 `.png`, 1 `.icns`.

## Per-file manifest

| Path | Classification | Type | Size (bytes) |
|---|---|---:|---:|
| `src/main/help/AGENTS.md` | Guide created in review | .md | 1007 |
| `src/main/help/CLAUDE.md` | Guide created in review | .md | 41 |
| `src/main/help/helpset/content/connect/connectionDialog.html` | Text reviewed | .html | 10789 |
| `src/main/help/helpset/content/connect/disconnect.html` | Text reviewed | .html | 858 |
| `src/main/help/helpset/content/connect/favorite.html` | Text reviewed | .html | 1763 |
| `src/main/help/helpset/content/connect/index.html` | Text reviewed | .html | 1054 |
| `src/main/help/helpset/content/connect/reconnect.html` | Text reviewed | .html | 930 |
| `src/main/help/helpset/content/credits.html` | Text reviewed | .html | 705 |
| `src/main/help/helpset/content/default.css` | Text reviewed | .css | 2316 |
| `src/main/help/helpset/content/faq.html` | Text reviewed | .html | 735 |
| `src/main/help/helpset/content/favorites/add.html` | Text reviewed | .html | 10828 |
| `src/main/help/helpset/content/favorites/connect.html` | Text reviewed | .html | 1372 |
| `src/main/help/helpset/content/favorites/delete.html` | Text reviewed | .html | 1465 |
| `src/main/help/helpset/content/favorites/edit.html` | Text reviewed | .html | 1842 |
| `src/main/help/helpset/content/favorites/favoriteManager.html` | Text reviewed | .html | 3102 |
| `src/main/help/helpset/content/favorites/index.html` | Text reviewed | .html | 1149 |
| `src/main/help/helpset/content/feedback.html` | Text reviewed | .html | 671 |
| `src/main/help/helpset/content/images/abort16.gif` | Binary metadata only | .gif | 898 |
| `src/main/help/helpset/content/images/certificate16.gif` | Binary metadata only | .gif | 996 |
| `src/main/help/helpset/content/images/changeLocalDirectory16.gif` | Binary metadata only | .gif | 928 |
| `src/main/help/helpset/content/images/changeRemoteDirectory16.gif` | Binary metadata only | .gif | 337 |
| `src/main/help/helpset/content/images/closedBook16.gif` | Binary metadata only | .gif | 898 |
| `src/main/help/helpset/content/images/connect16.gif` | Binary metadata only | .gif | 988 |
| `src/main/help/helpset/content/images/deleteLocalFile16.gif` | Binary metadata only | .gif | 865 |
| `src/main/help/helpset/content/images/deleteRemoteFile16.gif` | Binary metadata only | .gif | 135 |
| `src/main/help/helpset/content/images/directory16.gif` | Binary metadata only | .gif | 938 |
| `src/main/help/helpset/content/images/directory32.gif` | Binary metadata only | .gif | 1307 |
| `src/main/help/helpset/content/images/disconnect16.gif` | Binary metadata only | .gif | 384 |
| `src/main/help/helpset/content/images/downArrow16.gif` | Binary metadata only | .gif | 67 |
| `src/main/help/helpset/content/images/download16.gif` | Binary metadata only | .gif | 173 |
| `src/main/help/helpset/content/images/favorites16.gif` | Binary metadata only | .gif | 1010 |
| `src/main/help/helpset/content/images/file16.gif` | Binary metadata only | .gif | 1021 |
| `src/main/help/helpset/content/images/file32.gif` | Binary metadata only | .gif | 1492 |
| `src/main/help/helpset/content/images/hardDrive16.gif` | Binary metadata only | .gif | 138 |
| `src/main/help/helpset/content/images/help16.gif` | Binary metadata only | .gif | 1065 |
| `src/main/help/helpset/content/images/host16.gif` | Binary metadata only | .gif | 636 |
| `src/main/help/helpset/content/images/indexIcon.gif` | Binary metadata only | .gif | 120 |
| `src/main/help/helpset/content/images/jftp16.gif` | Binary metadata only | .gif | 372 |
| `src/main/help/helpset/content/images/jftp32.gif` | Binary metadata only | .gif | 871 |
| `src/main/help/helpset/content/images/newLocalDirectory16.gif` | Binary metadata only | .gif | 368 |
| `src/main/help/helpset/content/images/newLocalFile16.gif` | Binary metadata only | .gif | 128 |
| `src/main/help/helpset/content/images/newRemoteDirectory16.gif` | Binary metadata only | .gif | 373 |
| `src/main/help/helpset/content/images/newRemoteFile16.gif` | Binary metadata only | .gif | 166 |
| `src/main/help/helpset/content/images/newSession16.gif` | Binary metadata only | .gif | 121 |
| `src/main/help/helpset/content/images/nextIcon.gif` | Binary metadata only | .gif | 127 |
| `src/main/help/helpset/content/images/note32.gif` | Binary metadata only | .gif | 1028 |
| `src/main/help/helpset/content/images/openBook16.gif` | Binary metadata only | .gif | 924 |
| `src/main/help/helpset/content/images/previousIcon.gif` | Binary metadata only | .gif | 127 |
| `src/main/help/helpset/content/images/reconnect16.gif` | Binary metadata only | .gif | 888 |
| `src/main/help/helpset/content/images/renameLocalFile16.gif` | Binary metadata only | .gif | 924 |
| `src/main/help/helpset/content/images/renameRemoteFile16.gif` | Binary metadata only | .gif | 234 |
| `src/main/help/helpset/content/images/searchIcon.gif` | Binary metadata only | .gif | 118 |
| `src/main/help/helpset/content/images/server16.gif` | Binary metadata only | .gif | 892 |
| `src/main/help/helpset/content/images/splash.gif` | Binary metadata only | .gif | 22032 |
| `src/main/help/helpset/content/images/tip32.gif` | Binary metadata only | .gif | 979 |
| `src/main/help/helpset/content/images/tocIcon.gif` | Binary metadata only | .gif | 120 |
| `src/main/help/helpset/content/images/topic16.gif` | Binary metadata only | .gif | 135 |
| `src/main/help/helpset/content/images/upArrow16.gif` | Binary metadata only | .gif | 69 |
| `src/main/help/helpset/content/images/upDirectory16.gif` | Binary metadata only | .gif | 586 |
| `src/main/help/helpset/content/images/upload16.gif` | Binary metadata only | .gif | 173 |
| `src/main/help/helpset/content/index.html` | Text reviewed | .html | 2329 |
| `src/main/help/helpset/content/introduction/features.html` | Text reviewed | .html | 8389 |
| `src/main/help/helpset/content/introduction/index.html` | Text reviewed | .html | 632 |
| `src/main/help/helpset/content/introduction/uninstall.html` | Text reviewed | .html | 419 |
| `src/main/help/helpset/content/introduction/whatIsJFTP.html` | Text reviewed | .html | 1241 |
| `src/main/help/helpset/content/keyboardShortcuts/index.html` | Text reviewed | .html | 3757 |
| `src/main/help/helpset/content/LICENSE.txt` | Text reviewed | .txt | 11560 |
| `src/main/help/helpset/content/local/browse.html` | Text reviewed | .html | 1873 |
| `src/main/help/helpset/content/local/changeDirectory.html` | Text reviewed | .html | 3080 |
| `src/main/help/helpset/content/local/clearFilter.html` | Text reviewed | .html | 1017 |
| `src/main/help/helpset/content/local/delete.html` | Text reviewed | .html | 1900 |
| `src/main/help/helpset/content/local/edit.html` | Text reviewed | .html | 1286 |
| `src/main/help/helpset/content/local/email.html` | Text reviewed | .html | 1248 |
| `src/main/help/helpset/content/local/filter.html` | Text reviewed | .html | 4958 |
| `src/main/help/helpset/content/local/index.html` | Text reviewed | .html | 1541 |
| `src/main/help/helpset/content/local/newDirectory.html` | Text reviewed | .html | 3489 |
| `src/main/help/helpset/content/local/newFile.html` | Text reviewed | .html | 3371 |
| `src/main/help/helpset/content/local/open.html` | Text reviewed | .html | 1755 |
| `src/main/help/helpset/content/local/print.html` | Text reviewed | .html | 1295 |
| `src/main/help/helpset/content/local/properties.html` | Text reviewed | .html | 2797 |
| `src/main/help/helpset/content/local/refresh.html` | Text reviewed | .html | 1095 |
| `src/main/help/helpset/content/local/rename.html` | Text reviewed | .html | 4436 |
| `src/main/help/helpset/content/local/sort.html` | Text reviewed | .html | 936 |
| `src/main/help/helpset/content/preferences/connectionSettings.advanced.html` | Text reviewed | .html | 3758 |
| `src/main/help/helpset/content/preferences/connectionSettings.general.html` | Text reviewed | .html | 1533 |
| `src/main/help/helpset/content/preferences/connectionSettings.html` | Text reviewed | .html | 728 |
| `src/main/help/helpset/content/preferences/connectionSettings.proxy.html` | Text reviewed | .html | 2212 |
| `src/main/help/helpset/content/preferences/connectionSettings.security.html` | Text reviewed | .html | 2164 |
| `src/main/help/helpset/content/preferences/index.html` | Text reviewed | .html | 1917 |
| `src/main/help/helpset/content/preferences/regionalSettings.html` | Text reviewed | .html | 2450 |
| `src/main/help/helpset/content/preferences/softwareUpdates.html` | Text reviewed | .html | 1152 |
| `src/main/help/helpset/content/preferences/transferModes.html` | Text reviewed | .html | 2199 |
| `src/main/help/helpset/content/preferences/userInterface.html` | Text reviewed | .html | 1677 |
| `src/main/help/helpset/content/remote/browse.html` | Text reviewed | .html | 1153 |
| `src/main/help/helpset/content/remote/changeDirectory.html` | Text reviewed | .html | 2608 |
| `src/main/help/helpset/content/remote/clearFilter.html` | Text reviewed | .html | 1022 |
| `src/main/help/helpset/content/remote/delete.html` | Text reviewed | .html | 1890 |
| `src/main/help/helpset/content/remote/edit.html` | Text reviewed | .html | 1364 |
| `src/main/help/helpset/content/remote/email.html` | Text reviewed | .html | 1328 |
| `src/main/help/helpset/content/remote/executeCommands.html` | Text reviewed | .html | 2128 |
| `src/main/help/helpset/content/remote/filter.html` | Text reviewed | .html | 3581 |
| `src/main/help/helpset/content/remote/index.html` | Text reviewed | .html | 1620 |
| `src/main/help/helpset/content/remote/newDirectory.html` | Text reviewed | .html | 2960 |
| `src/main/help/helpset/content/remote/newFile.html` | Text reviewed | .html | 2922 |
| `src/main/help/helpset/content/remote/open.html` | Text reviewed | .html | 1836 |
| `src/main/help/helpset/content/remote/print.html` | Text reviewed | .html | 1374 |
| `src/main/help/helpset/content/remote/properties.html` | Text reviewed | .html | 3779 |
| `src/main/help/helpset/content/remote/refresh.html` | Text reviewed | .html | 888 |
| `src/main/help/helpset/content/remote/rename.html` | Text reviewed | .html | 4039 |
| `src/main/help/helpset/content/remote/sort.html` | Text reviewed | .html | 936 |
| `src/main/help/helpset/content/screenshots/mainWindowExplanation.gif` | Binary metadata only | .gif | 74796 |
| `src/main/help/helpset/content/screenshots/mainWindowExplanation.png` | Binary metadata only | .png | 672441 |
| `src/main/help/helpset/content/security/certificatesManager.html` | Text reviewed | .html | 2298 |
| `src/main/help/helpset/content/security/deleteCertificates.html` | Text reviewed | .html | 1121 |
| `src/main/help/helpset/content/security/importCertificates.html` | Text reviewed | .html | 1169 |
| `src/main/help/helpset/content/security/index.html` | Text reviewed | .html | 1176 |
| `src/main/help/helpset/content/security/installCertificate.html` | Text reviewed | .html | 1820 |
| `src/main/help/helpset/content/security/introduction.html` | Text reviewed | .html | 3440 |
| `src/main/help/helpset/content/security/sslConnection.html` | Text reviewed | .html | 2097 |
| `src/main/help/helpset/content/security/viewCertificate.html` | Text reviewed | .html | 1166 |
| `src/main/help/helpset/content/sessions/activate.html` | Text reviewed | .html | 633 |
| `src/main/help/helpset/content/sessions/close.html` | Text reviewed | .html | 966 |
| `src/main/help/helpset/content/sessions/images/cascade.gif` | Binary metadata only | .gif | 16619 |
| `src/main/help/helpset/content/sessions/images/tileHorizontal.gif` | Binary metadata only | .gif | 19427 |
| `src/main/help/helpset/content/sessions/images/tileVertical.gif` | Binary metadata only | .gif | 18227 |
| `src/main/help/helpset/content/sessions/index.html` | Text reviewed | .html | 1046 |
| `src/main/help/helpset/content/sessions/open.html` | Text reviewed | .html | 900 |
| `src/main/help/helpset/content/support.html` | Text reviewed | .html | 677 |
| `src/main/help/helpset/content/tips.html` | Text reviewed | .html | 710 |
| `src/main/help/helpset/content/transfer/abort.html` | Text reviewed | .html | 997 |
| `src/main/help/helpset/content/transfer/download.html` | Text reviewed | .html | 2069 |
| `src/main/help/helpset/content/transfer/downloadAndUnzip.html` | Text reviewed | .html | 4195 |
| `src/main/help/helpset/content/transfer/downloadAs.html` | Text reviewed | .html | 2193 |
| `src/main/help/helpset/content/transfer/index.html` | Text reviewed | .html | 1037 |
| `src/main/help/helpset/content/transfer/transferModes.html` | Text reviewed | .html | 2256 |
| `src/main/help/helpset/content/transfer/upload.html` | Text reviewed | .html | 1824 |
| `src/main/help/helpset/content/transfer/uploadAs.html` | Text reviewed | .html | 2233 |
| `src/main/help/helpset/content/transfer/zipAndUpload.html` | Text reviewed | .html | 3573 |
| `src/main/help/helpset/content/userInterface/index.html` | Text reviewed | .html | 953 |
| `src/main/help/helpset/content/userInterface/localPane.html` | Text reviewed | .html | 2195 |
| `src/main/help/helpset/content/userInterface/logPane.html` | Text reviewed | .html | 1728 |
| `src/main/help/helpset/content/userInterface/mainWindow.html` | Text reviewed | .html | 1112 |
| `src/main/help/helpset/content/userInterface/menuBar.html` | Text reviewed | .html | 11443 |
| `src/main/help/helpset/content/userInterface/remotePane.html` | Text reviewed | .html | 1704 |
| `src/main/help/helpset/content/userInterface/sessionTabs.html` | Text reviewed | .html | 1283 |
| `src/main/help/helpset/content/userInterface/statusBar.html` | Text reviewed | .html | 1062 |
| `src/main/help/helpset/content/userInterface/toolBar.html` | Text reviewed | .html | 4308 |
| `src/main/help/helpset/favorites_2_0.dtd` | Text reviewed | .dtd | 652 |
| `src/main/help/helpset/glossary.xml` | Text reviewed | .xml | 446 |
| `src/main/help/helpset/helpSet.xml` | Text reviewed | .xml | 1346 |
| `src/main/help/helpset/helpset_2_0.dtd` | Text reviewed | .dtd | 2771 |
| `src/main/help/helpset/index.xml` | Text reviewed | .xml | 345 |
| `src/main/help/helpset/index_2_0.dtd` | Text reviewed | .dtd | 912 |
| `src/main/help/helpset/map.xml` | Text reviewed | .xml | 7887 |
| `src/main/help/helpset/map_2_0.dtd` | Text reviewed | .dtd | 606 |
| `src/main/help/helpset/toc.xml` | Text reviewed | .xml | 7067 |
| `src/main/help/helpset/toc_2_0.dtd` | Text reviewed | .dtd | 1060 |
| `src/main/images/AGENTS.md` | Guide created in review | .md | 1085 |
| `src/main/images/CLAUDE.md` | Guide created in review | .md | 41 |
| `src/main/images/com/myjavaworld/jftp/abort16.gif` | Binary metadata only | .gif | 898 |
| `src/main/images/com/myjavaworld/jftp/certificate16.gif` | Binary metadata only | .gif | 996 |
| `src/main/images/com/myjavaworld/jftp/changeLocalDirectory16.gif` | Binary metadata only | .gif | 928 |
| `src/main/images/com/myjavaworld/jftp/changeRemoteDirectory16.gif` | Binary metadata only | .gif | 337 |
| `src/main/images/com/myjavaworld/jftp/changeRemoteDirectory16.png` | Binary metadata only | .png | 27184 |
| `src/main/images/com/myjavaworld/jftp/connect16.gif` | Binary metadata only | .gif | 988 |
| `src/main/images/com/myjavaworld/jftp/deleteLocalFile16.gif` | Binary metadata only | .gif | 865 |
| `src/main/images/com/myjavaworld/jftp/deleteRemoteFile16.gif` | Binary metadata only | .gif | 135 |
| `src/main/images/com/myjavaworld/jftp/deleteRemoteFile16.png` | Binary metadata only | .png | 26812 |
| `src/main/images/com/myjavaworld/jftp/directory16.gif` | Binary metadata only | .gif | 938 |
| `src/main/images/com/myjavaworld/jftp/directory32.gif` | Binary metadata only | .gif | 1307 |
| `src/main/images/com/myjavaworld/jftp/disconnect16.gif` | Binary metadata only | .gif | 384 |
| `src/main/images/com/myjavaworld/jftp/downArrow16.gif` | Binary metadata only | .gif | 67 |
| `src/main/images/com/myjavaworld/jftp/download16.gif` | Binary metadata only | .gif | 173 |
| `src/main/images/com/myjavaworld/jftp/favorites16.gif` | Binary metadata only | .gif | 1010 |
| `src/main/images/com/myjavaworld/jftp/file16.gif` | Binary metadata only | .gif | 1021 |
| `src/main/images/com/myjavaworld/jftp/file32.gif` | Binary metadata only | .gif | 1492 |
| `src/main/images/com/myjavaworld/jftp/hardDrive16.gif` | Binary metadata only | .gif | 138 |
| `src/main/images/com/myjavaworld/jftp/help16.gif` | Binary metadata only | .gif | 1065 |
| `src/main/images/com/myjavaworld/jftp/host16.gif` | Binary metadata only | .gif | 636 |
| `src/main/images/com/myjavaworld/jftp/jftp.icns` | Binary metadata only | .icns | 34990 |
| `src/main/images/com/myjavaworld/jftp/jftp128.gif` | Binary metadata only | .gif | 3239 |
| `src/main/images/com/myjavaworld/jftp/jftp128.png` | Binary metadata only | .png | 45204 |
| `src/main/images/com/myjavaworld/jftp/jftp16.gif` | Binary metadata only | .gif | 372 |
| `src/main/images/com/myjavaworld/jftp/jftp16.png` | Binary metadata only | .png | 28194 |
| `src/main/images/com/myjavaworld/jftp/jftp32.gif` | Binary metadata only | .gif | 871 |
| `src/main/images/com/myjavaworld/jftp/jftp32.png` | Binary metadata only | .png | 30031 |
| `src/main/images/com/myjavaworld/jftp/jftp48.gif` | Binary metadata only | .gif | 1215 |
| `src/main/images/com/myjavaworld/jftp/jftp48.png` | Binary metadata only | .png | 32019 |
| `src/main/images/com/myjavaworld/jftp/jftp60.png` | Binary metadata only | .png | 3297 |
| `src/main/images/com/myjavaworld/jftp/key16.gif` | Binary metadata only | .gif | 985 |
| `src/main/images/com/myjavaworld/jftp/launch.gif` | Binary metadata only | .gif | 2221 |
| `src/main/images/com/myjavaworld/jftp/lock16.gif` | Binary metadata only | .gif | 961 |
| `src/main/images/com/myjavaworld/jftp/newLocalDirectory16.gif` | Binary metadata only | .gif | 368 |
| `src/main/images/com/myjavaworld/jftp/newLocalFile16.gif` | Binary metadata only | .gif | 128 |
| `src/main/images/com/myjavaworld/jftp/newRemoteDirectory16.gif` | Binary metadata only | .gif | 373 |
| `src/main/images/com/myjavaworld/jftp/newRemoteDirectory16.png` | Binary metadata only | .png | 27619 |
| `src/main/images/com/myjavaworld/jftp/newRemoteFile16.gif` | Binary metadata only | .gif | 166 |
| `src/main/images/com/myjavaworld/jftp/newRemoteFile16.png` | Binary metadata only | .png | 26870 |
| `src/main/images/com/myjavaworld/jftp/newSession16.gif` | Binary metadata only | .gif | 121 |
| `src/main/images/com/myjavaworld/jftp/reconnect16.gif` | Binary metadata only | .gif | 888 |
| `src/main/images/com/myjavaworld/jftp/renameLocalFile16.gif` | Binary metadata only | .gif | 924 |
| `src/main/images/com/myjavaworld/jftp/renameRemoteFile16.gif` | Binary metadata only | .gif | 234 |
| `src/main/images/com/myjavaworld/jftp/renameRemoteFile16.png` | Binary metadata only | .png | 27094 |
| `src/main/images/com/myjavaworld/jftp/server16.gif` | Binary metadata only | .gif | 892 |
| `src/main/images/com/myjavaworld/jftp/splash.gif` | Binary metadata only | .gif | 10899 |
| `src/main/images/com/myjavaworld/jftp/splash.png` | Binary metadata only | .png | 88686 |
| `src/main/images/com/myjavaworld/jftp/upArrow16.gif` | Binary metadata only | .gif | 69 |
| `src/main/images/com/myjavaworld/jftp/upDirectory16.gif` | Binary metadata only | .gif | 586 |
| `src/main/images/com/myjavaworld/jftp/upload16.gif` | Binary metadata only | .gif | 173 |
| `src/main/java/com/myjavaworld/jftp/actions/AbortAction.java` | Text reviewed | .java | 2206 |
| `src/main/java/com/myjavaworld/jftp/actions/AGENTS.md` | Guide created in review | .md | 1220 |
| `src/main/java/com/myjavaworld/jftp/actions/ChangeLocalDirectoryAction.java` | Text reviewed | .java | 1929 |
| `src/main/java/com/myjavaworld/jftp/actions/ChangeRemoteDirectoryAction.java` | Text reviewed | .java | 1947 |
| `src/main/java/com/myjavaworld/jftp/actions/CLAUDE.md` | Guide created in review | .md | 41 |
| `src/main/java/com/myjavaworld/jftp/actions/ConnectAction.java` | Text reviewed | .java | 2330 |
| `src/main/java/com/myjavaworld/jftp/actions/DeleteLocalFileAction.java` | Text reviewed | .java | 1603 |
| `src/main/java/com/myjavaworld/jftp/actions/DeleteRemoteFileAction.java` | Text reviewed | .java | 1649 |
| `src/main/java/com/myjavaworld/jftp/actions/DisconnectAction.java` | Text reviewed | .java | 1565 |
| `src/main/java/com/myjavaworld/jftp/actions/DownloadAction.java` | Text reviewed | .java | 1532 |
| `src/main/java/com/myjavaworld/jftp/actions/DownloadAndUnzipAction.java` | Text reviewed | .java | 3281 |
| `src/main/java/com/myjavaworld/jftp/actions/DownloadAsAction.java` | Text reviewed | .java | 2496 |
| `src/main/java/com/myjavaworld/jftp/actions/EditLocalFileAction.java` | Text reviewed | .java | 1992 |
| `src/main/java/com/myjavaworld/jftp/actions/EditRemoteFileAction.java` | Text reviewed | .java | 2488 |
| `src/main/java/com/myjavaworld/jftp/actions/EmailLocalFileAction.java` | Text reviewed | .java | 1984 |
| `src/main/java/com/myjavaworld/jftp/actions/EmailRemoteFileAction.java` | Text reviewed | .java | 2415 |
| `src/main/java/com/myjavaworld/jftp/actions/ManageCertificatesAction.java` | Text reviewed | .java | 1636 |
| `src/main/java/com/myjavaworld/jftp/actions/ManageFavoritesAction.java` | Text reviewed | .java | 1590 |
| `src/main/java/com/myjavaworld/jftp/actions/NewLocalDirectoryAction.java` | Text reviewed | .java | 1895 |
| `src/main/java/com/myjavaworld/jftp/actions/NewLocalFileAction.java` | Text reviewed | .java | 1872 |
| `src/main/java/com/myjavaworld/jftp/actions/NewRemoteDirectoryAction.java` | Text reviewed | .java | 1964 |
| `src/main/java/com/myjavaworld/jftp/actions/NewRemoteFileAction.java` | Text reviewed | .java | 1894 |
| `src/main/java/com/myjavaworld/jftp/actions/NewSessionAction.java` | Text reviewed | .java | 1455 |
| `src/main/java/com/myjavaworld/jftp/actions/OpenLocalFileAction.java` | Text reviewed | .java | 2079 |
| `src/main/java/com/myjavaworld/jftp/actions/OpenRemoteFileAction.java` | Text reviewed | .java | 2565 |
| `src/main/java/com/myjavaworld/jftp/actions/PrintLocalFileAction.java` | Text reviewed | .java | 1998 |
| `src/main/java/com/myjavaworld/jftp/actions/PrintRemoteFileAction.java` | Text reviewed | .java | 2494 |
| `src/main/java/com/myjavaworld/jftp/actions/ReconnectAction.java` | Text reviewed | .java | 1591 |
| `src/main/java/com/myjavaworld/jftp/actions/RenameLocalFileAction.java` | Text reviewed | .java | 2176 |
| `src/main/java/com/myjavaworld/jftp/actions/RenameRemoteFileAction.java` | Text reviewed | .java | 2167 |
| `src/main/java/com/myjavaworld/jftp/actions/UploadAction.java` | Text reviewed | .java | 1621 |
| `src/main/java/com/myjavaworld/jftp/actions/UploadAsAction.java` | Text reviewed | .java | 2466 |
| `src/main/java/com/myjavaworld/jftp/actions/ZipAndUploadAction.java` | Text reviewed | .java | 3531 |
| `src/main/java/com/myjavaworld/jftp/ssl/AGENTS.md` | Guide created in review | .md | 1244 |
| `src/main/java/com/myjavaworld/jftp/ssl/CertificateDlg.java` | Text reviewed | .java | 4255 |
| `src/main/java/com/myjavaworld/jftp/ssl/CertificateManagerDlg.java` | Text reviewed | .java | 17247 |
| `src/main/java/com/myjavaworld/jftp/ssl/CertificatePane.java` | Text reviewed | .java | 12057 |
| `src/main/java/com/myjavaworld/jftp/ssl/CertificateTableModel.java` | Text reviewed | .java | 3766 |
| `src/main/java/com/myjavaworld/jftp/ssl/CLAUDE.md` | Guide created in review | .md | 41 |
| `src/main/java/com/myjavaworld/jftp/ssl/DNParser.java` | Text reviewed | .java | 2887 |
| `src/main/java/com/myjavaworld/jftp/ssl/JFTPKeyManager.java` | Text reviewed | .java | 2505 |
| `src/main/java/com/myjavaworld/jftp/ssl/JFTPSSLContext.java` | Text reviewed | .java | 1631 |
| `src/main/java/com/myjavaworld/jftp/ssl/JFTPTrustManager.java` | Text reviewed | .java | 4909 |
| `src/main/java/com/myjavaworld/jftp/ssl/KeyStoreManager.java` | Text reviewed | .java | 9020 |
| `src/main/java/com/myjavaworld/jftp/ssl/SecurityWarningDlg.java` | Text reviewed | .java | 7841 |
| `src/main/resources/AGENTS.md` | Guide created in review | .md | 1093 |
| `src/main/resources/CLAUDE.md` | Guide created in review | .md | 41 |
| `src/main/resources/com/myjavaworld/gui/EditPopupMenu.properties` | Text reviewed | .properties | 126 |
| `src/main/resources/com/myjavaworld/gui/LicenseAgreementDlg.properties` | Text reviewed | .properties | 80 |
| `src/main/resources/com/myjavaworld/gui/ProgressDialog.properties` | Text reviewed | .properties | 87 |
| `src/main/resources/com/myjavaworld/jftp/AboutDlg.properties` | Text reviewed | .properties | 430 |
| `src/main/resources/com/myjavaworld/jftp/AdvancedConnectionPrefsPanel.properties` | Text reviewed | .properties | 429 |
| `src/main/resources/com/myjavaworld/jftp/AutoUpdater.properties` | Text reviewed | .properties | 398 |
| `src/main/resources/com/myjavaworld/jftp/CertificatePrefsPanel.properties` | Text reviewed | .properties | 348 |
| `src/main/resources/com/myjavaworld/jftp/ChangeLocalDirectoryDlg.properties` | Text reviewed | .properties | 152 |
| `src/main/resources/com/myjavaworld/jftp/ChangeRemoteDirectoryDlg.properties` | Text reviewed | .properties | 153 |
| `src/main/resources/com/myjavaworld/jftp/ConnectionDlg.properties` | Text reviewed | .properties | 1141 |
| `src/main/resources/com/myjavaworld/jftp/DownloadAndUnzipDlg.properties` | Text reviewed | .properties | 692 |
| `src/main/resources/com/myjavaworld/jftp/DownloadAsDlg.properties` | Text reviewed | .properties | 136 |
| `src/main/resources/com/myjavaworld/jftp/ExecuteCommandDlg.properties` | Text reviewed | .properties | 164 |
| `src/main/resources/com/myjavaworld/jftp/FavoritePropertiesDlg.properties` | Text reviewed | .properties | 1248 |
| `src/main/resources/com/myjavaworld/jftp/FavoritesDlg.properties` | Text reviewed | .properties | 294 |
| `src/main/resources/com/myjavaworld/jftp/FTPMenu.properties` | Text reviewed | .properties | 1055 |
| `src/main/resources/com/myjavaworld/jftp/FTPSession.properties` | Text reviewed | .properties | 1353 |
| `src/main/resources/com/myjavaworld/jftp/GeneralConnectionPrefsPanel.properties` | Text reviewed | .properties | 244 |
| `src/main/resources/com/myjavaworld/jftp/HelpMenu.properties` | Text reviewed | .properties | 653 |
| `src/main/resources/com/myjavaworld/jftp/JFTP.properties` | Text reviewed | .properties | 160 |
| `src/main/resources/com/myjavaworld/jftp/JFTPApplet.properties` | Text reviewed | .properties | 16 |
| `src/main/resources/com/myjavaworld/jftp/JFTPToolBar.properties` | Text reviewed | .properties | 1019 |
| `src/main/resources/com/myjavaworld/jftp/LocalePrefsPanel.properties` | Text reviewed | .properties | 136 |
| `src/main/resources/com/myjavaworld/jftp/LocalFileFilterDlg.properties` | Text reviewed | .properties | 1409 |
| `src/main/resources/com/myjavaworld/jftp/LocalFilePropertiesDlg.properties` | Text reviewed | .properties | 322 |
| `src/main/resources/com/myjavaworld/jftp/LocalFileTableModel.properties` | Text reviewed | .properties | 79 |
| `src/main/resources/com/myjavaworld/jftp/LocalPane.properties` | Text reviewed | .properties | 277 |
| `src/main/resources/com/myjavaworld/jftp/LocalSystemMenu.properties` | Text reviewed | .properties | 1228 |
| `src/main/resources/com/myjavaworld/jftp/NewLocalDirectoryDlg.properties` | Text reviewed | .properties | 148 |
| `src/main/resources/com/myjavaworld/jftp/NewLocalFileDlg.properties` | Text reviewed | .properties | 123 |
| `src/main/resources/com/myjavaworld/jftp/NewRemoteDirectoryDlg.properties` | Text reviewed | .properties | 149 |
| `src/main/resources/com/myjavaworld/jftp/NewRemoteFileDlg.properties` | Text reviewed | .properties | 124 |
| `src/main/resources/com/myjavaworld/jftp/PreferencesDlg.properties` | Text reviewed | .properties | 583 |
| `src/main/resources/com/myjavaworld/jftp/ProxyPrefsPanel.properties` | Text reviewed | .properties | 433 |
| `src/main/resources/com/myjavaworld/jftp/RemoteFileFilterDlg.properties` | Text reviewed | .properties | 1309 |
| `src/main/resources/com/myjavaworld/jftp/RemoteFilePropertiesDlg.properties` | Text reviewed | .properties | 476 |
| `src/main/resources/com/myjavaworld/jftp/RemoteFileTableModel.properties` | Text reviewed | .properties | 107 |
| `src/main/resources/com/myjavaworld/jftp/RemotePane.properties` | Text reviewed | .properties | 258 |
| `src/main/resources/com/myjavaworld/jftp/RemoteSystemMenu.properties` | Text reviewed | .properties | 1608 |
| `src/main/resources/com/myjavaworld/jftp/RenameLocalFileDlg.properties` | Text reviewed | .properties | 197 |
| `src/main/resources/com/myjavaworld/jftp/RenameRemoteFileDlg.properties` | Text reviewed | .properties | 198 |
| `src/main/resources/com/myjavaworld/jftp/SecurityPrefsPanel.properties` | Text reviewed | .properties | 196 |
| `src/main/resources/com/myjavaworld/jftp/SoftwareUpdatePrefsPanel.properties` | Text reviewed | .properties | 85 |
| `src/main/resources/com/myjavaworld/jftp/ssl/CertificateDlg.properties` | Text reviewed | .properties | 58 |
| `src/main/resources/com/myjavaworld/jftp/ssl/CertificateManagerDlg.properties` | Text reviewed | .properties | 430 |
| `src/main/resources/com/myjavaworld/jftp/ssl/CertificatePane.properties` | Text reviewed | .properties | 405 |
| `src/main/resources/com/myjavaworld/jftp/ssl/CertificateTableModel.properties` | Text reviewed | .properties | 90 |
| `src/main/resources/com/myjavaworld/jftp/ssl/SecurityWarningDlg.properties` | Text reviewed | .properties | 1044 |
| `src/main/resources/com/myjavaworld/jftp/StatusBar.properties` | Text reviewed | .properties | 68 |
| `src/main/resources/com/myjavaworld/jftp/StatusWindow.properties` | Text reviewed | .properties | 590 |
| `src/main/resources/com/myjavaworld/jftp/ToolsMenu.properties` | Text reviewed | .properties | 465 |
| `src/main/resources/com/myjavaworld/jftp/TransferModeMenu.properties` | Text reviewed | .properties | 298 |
| `src/main/resources/com/myjavaworld/jftp/TransferModesPrefsPanel.properties` | Text reviewed | .properties | 104 |
| `src/main/resources/com/myjavaworld/jftp/UIPrefsPanel.properties` | Text reviewed | .properties | 30 |
| `src/main/resources/com/myjavaworld/jftp/UploadAsDlg.properties` | Text reviewed | .properties | 128 |
| `src/main/resources/com/myjavaworld/jftp/ZipAndUploadDlg.properties` | Text reviewed | .properties | 544 |
| `src/main/resources/com/myjavaworld/util/CommonResources.properties` | Text reviewed | .properties | 561 |
| `src/main/resources_de/AGENTS.md` | Guide created in review | .md | 987 |
| `src/main/resources_de/CLAUDE.md` | Guide created in review | .md | 41 |
| `src/main/resources_de/com/myjavaworld/gui/EditPopupMenu_de.properties` | Text reviewed | .properties | 165 |
| `src/main/resources_de/com/myjavaworld/gui/LicenseAgreementDlg_de.properties` | Text reviewed | .properties | 92 |
| `src/main/resources_de/com/myjavaworld/gui/ProgressDialog_de.properties` | Text reviewed | .properties | 87 |
| `src/main/resources_de/com/myjavaworld/jftp/AboutDlg_de.properties` | Text reviewed | .properties | 464 |
| `src/main/resources_de/com/myjavaworld/jftp/AdvancedConnectionPrefsPanel_de.properties` | Text reviewed | .properties | 456 |
| `src/main/resources_de/com/myjavaworld/jftp/AutoUpdater_de.properties` | Text reviewed | .properties | 418 |
| `src/main/resources_de/com/myjavaworld/jftp/CertificatePrefsPanel_de.properties` | Text reviewed | .properties | 384 |
| `src/main/resources_de/com/myjavaworld/jftp/ChangeLocalDirectoryDlg_de.properties` | Text reviewed | .properties | 166 |
| `src/main/resources_de/com/myjavaworld/jftp/ChangeRemoteDirectoryDlg_de.properties` | Text reviewed | .properties | 169 |
| `src/main/resources_de/com/myjavaworld/jftp/ConnectionDlg_de.properties` | Text reviewed | .properties | 1206 |
| `src/main/resources_de/com/myjavaworld/jftp/DownloadAndUnzipDlg_de.properties` | Text reviewed | .properties | 807 |
| `src/main/resources_de/com/myjavaworld/jftp/DownloadAsDlg_de.properties` | Text reviewed | .properties | 162 |
| `src/main/resources_de/com/myjavaworld/jftp/ExecuteCommandDlg_de.properties` | Text reviewed | .properties | 193 |
| `src/main/resources_de/com/myjavaworld/jftp/FavoritePropertiesDlg_de.properties` | Text reviewed | .properties | 1376 |
| `src/main/resources_de/com/myjavaworld/jftp/FavoritesDlg_de.properties` | Text reviewed | .properties | 317 |
| `src/main/resources_de/com/myjavaworld/jftp/FTPMenu_de.properties` | Text reviewed | .properties | 1130 |
| `src/main/resources_de/com/myjavaworld/jftp/FTPSession_de.properties` | Text reviewed | .properties | 1549 |
| `src/main/resources_de/com/myjavaworld/jftp/GeneralConnectionPrefsPanel_de.properties` | Text reviewed | .properties | 260 |
| `src/main/resources_de/com/myjavaworld/jftp/HelpMenu_de.properties` | Text reviewed | .properties | 665 |
| `src/main/resources_de/com/myjavaworld/jftp/JFTP_de.properties` | Text reviewed | .properties | 193 |
| `src/main/resources_de/com/myjavaworld/jftp/JFTPApplet_de.properties` | Text reviewed | .properties | 18 |
| `src/main/resources_de/com/myjavaworld/jftp/JFTPToolBar_de.properties` | Text reviewed | .properties | 1204 |
| `src/main/resources_de/com/myjavaworld/jftp/LocalePrefsPanel_de.properties` | Text reviewed | .properties | 147 |
| `src/main/resources_de/com/myjavaworld/jftp/LocalFileFilterDlg_de.properties` | Text reviewed | .properties | 1563 |
| `src/main/resources_de/com/myjavaworld/jftp/LocalFilePropertiesDlg_de.properties` | Text reviewed | .properties | 346 |
| `src/main/resources_de/com/myjavaworld/jftp/LocalFileTableModel_de.properties` | Text reviewed | .properties | 82 |
| `src/main/resources_de/com/myjavaworld/jftp/LocalPane_de.properties` | Text reviewed | .properties | 303 |
| `src/main/resources_de/com/myjavaworld/jftp/LocalSystemMenu_de.properties` | Text reviewed | .properties | 1273 |
| `src/main/resources_de/com/myjavaworld/jftp/NewLocalDirectoryDlg_de.properties` | Text reviewed | .properties | 164 |
| `src/main/resources_de/com/myjavaworld/jftp/NewLocalFileDlg_de.properties` | Text reviewed | .properties | 134 |
| `src/main/resources_de/com/myjavaworld/jftp/NewRemoteDirectoryDlg_de.properties` | Text reviewed | .properties | 167 |
| `src/main/resources_de/com/myjavaworld/jftp/NewRemoteFileDlg_de.properties` | Text reviewed | .properties | 137 |
| `src/main/resources_de/com/myjavaworld/jftp/PreferencesDlg_de.properties` | Text reviewed | .properties | 666 |
| `src/main/resources_de/com/myjavaworld/jftp/ProxyPrefsPanel_de.properties` | Text reviewed | .properties | 492 |
| `src/main/resources_de/com/myjavaworld/jftp/RemoteFileFilterDlg_de.properties` | Text reviewed | .properties | 1449 |
| `src/main/resources_de/com/myjavaworld/jftp/RemoteFilePropertiesDlg_de.properties` | Text reviewed | .properties | 529 |
| `src/main/resources_de/com/myjavaworld/jftp/RemoteFileTableModel_de.properties` | Text reviewed | .properties | 109 |
| `src/main/resources_de/com/myjavaworld/jftp/RemotePane_de.properties` | Text reviewed | .properties | 261 |
| `src/main/resources_de/com/myjavaworld/jftp/RemoteSystemMenu_de.properties` | Text reviewed | .properties | 1673 |
| `src/main/resources_de/com/myjavaworld/jftp/RenameLocalFileDlg_de.properties` | Text reviewed | .properties | 229 |
| `src/main/resources_de/com/myjavaworld/jftp/RenameRemoteFileDlg_de.properties` | Text reviewed | .properties | 232 |
| `src/main/resources_de/com/myjavaworld/jftp/SecurityPrefsPanel_de.properties` | Text reviewed | .properties | 216 |
| `src/main/resources_de/com/myjavaworld/jftp/SoftwareUpdatePrefsPanel_de.properties` | Text reviewed | .properties | 100 |
| `src/main/resources_de/com/myjavaworld/jftp/ssl/CertificateDlg_de.properties` | Text reviewed | .properties | 62 |
| `src/main/resources_de/com/myjavaworld/jftp/ssl/CertificateManagerDlg_de.properties` | Text reviewed | .properties | 474 |
| `src/main/resources_de/com/myjavaworld/jftp/ssl/CertificatePane_de.properties` | Text reviewed | .properties | 447 |
| `src/main/resources_de/com/myjavaworld/jftp/ssl/CertificateTableModel_de.properties` | Text reviewed | .properties | 97 |
| `src/main/resources_de/com/myjavaworld/jftp/ssl/SecurityWarningDlg_de.properties` | Text reviewed | .properties | 1201 |
| `src/main/resources_de/com/myjavaworld/jftp/StatusBar_de.properties` | Text reviewed | .properties | 73 |
| `src/main/resources_de/com/myjavaworld/jftp/StatusWindow_de.properties` | Text reviewed | .properties | 617 |
| `src/main/resources_de/com/myjavaworld/jftp/ToolsMenu_de.properties` | Text reviewed | .properties | 484 |
| `src/main/resources_de/com/myjavaworld/jftp/TransferModeMenu_de.properties` | Text reviewed | .properties | 311 |
| `src/main/resources_de/com/myjavaworld/jftp/TransferModesPrefsPanel_de.properties` | Text reviewed | .properties | 112 |
| `src/main/resources_de/com/myjavaworld/jftp/UIPrefsPanel_de.properties` | Text reviewed | .properties | 30 |
| `src/main/resources_de/com/myjavaworld/jftp/UploadAsDlg_de.properties` | Text reviewed | .properties | 149 |
| `src/main/resources_de/com/myjavaworld/jftp/ZipAndUploadDlg_de.properties` | Text reviewed | .properties | 629 |
| `src/main/resources_de/com/myjavaworld/util/CommonResources_de.properties` | Text reviewed | .properties | 647 |
| `src/main/resources_zh_TW/AGENTS.md` | Guide created in review | .md | 1040 |
| `src/main/resources_zh_TW/CLAUDE.md` | Guide created in review | .md | 41 |
| `src/main/resources_zh_TW/com/myjavaworld/gui/EditPopupMenu_zh_TW.properties` | Text reviewed | .properties | 244 |
| `src/main/resources_zh_TW/com/myjavaworld/gui/LicenseAgreementDlg_zh_TW.properties` | Text reviewed | .properties | 136 |
| `src/main/resources_zh_TW/com/myjavaworld/gui/ProgressDialog_zh_TW.properties` | Text reviewed | .properties | 152 |
| `src/main/resources_zh_TW/com/myjavaworld/jftp/AboutDlg_zh_TW.properties` | Text reviewed | .properties | 595 |
| `src/main/resources_zh_TW/com/myjavaworld/jftp/AdvancedConnectionPrefsPanel_zh_TW.properties` | Text reviewed | .properties | 639 |
| `src/main/resources_zh_TW/com/myjavaworld/jftp/AutoUpdater_zh_TW.properties` | Text reviewed | .properties | 534 |
| `src/main/resources_zh_TW/com/myjavaworld/jftp/CertificatePrefsPanel_zh_TW.properties` | Text reviewed | .properties | 496 |
| `src/main/resources_zh_TW/com/myjavaworld/jftp/ChangeLocalDirectoryDlg_zh_TW.properties` | Text reviewed | .properties | 225 |
| `src/main/resources_zh_TW/com/myjavaworld/jftp/ChangeRemoteDirectoryDlg_zh_TW.properties` | Text reviewed | .properties | 225 |
| `src/main/resources_zh_TW/com/myjavaworld/jftp/ConnectionDlg_zh_TW.properties` | Text reviewed | .properties | 1617 |
| `src/main/resources_zh_TW/com/myjavaworld/jftp/DownloadAndUnzipDlg_zh_TW.properties` | Text reviewed | .properties | 953 |
| `src/main/resources_zh_TW/com/myjavaworld/jftp/DownloadAsDlg_zh_TW.properties` | Text reviewed | .properties | 211 |
| `src/main/resources_zh_TW/com/myjavaworld/jftp/ExecuteCommandDlg_zh_TW.properties` | Text reviewed | .properties | 265 |
| `src/main/resources_zh_TW/com/myjavaworld/jftp/FavoritePropertiesDlg_zh_TW.properties` | Text reviewed | .properties | 1790 |
| `src/main/resources_zh_TW/com/myjavaworld/jftp/FavoritesDlg_zh_TW.properties` | Text reviewed | .properties | 423 |
| `src/main/resources_zh_TW/com/myjavaworld/jftp/FTPMenu_zh_TW.properties` | Text reviewed | .properties | 1279 |
| `src/main/resources_zh_TW/com/myjavaworld/jftp/FTPSession_zh_TW.properties` | Text reviewed | .properties | 1859 |
| `src/main/resources_zh_TW/com/myjavaworld/jftp/GeneralConnectionPrefsPanel_zh_TW.properties` | Text reviewed | .properties | 361 |
| `src/main/resources_zh_TW/com/myjavaworld/jftp/HelpMenu_zh_TW.properties` | Text reviewed | .properties | 796 |
| `src/main/resources_zh_TW/com/myjavaworld/jftp/InstallLicenseDlg_zh_TW.properties` | Text reviewed | .properties | 565 |
| `src/main/resources_zh_TW/com/myjavaworld/jftp/JFTP_zh_TW.properties` | Text reviewed | .properties | 229 |
| `src/main/resources_zh_TW/com/myjavaworld/jftp/JFTPApplet_zh_TW.properties` | Text reviewed | .properties | 51 |
| `src/main/resources_zh_TW/com/myjavaworld/jftp/JFTPToolBar_zh_TW.properties` | Text reviewed | .properties | 1561 |
| `src/main/resources_zh_TW/com/myjavaworld/jftp/LocalePrefsPanel_zh_TW.properties` | Text reviewed | .properties | 214 |
| `src/main/resources_zh_TW/com/myjavaworld/jftp/LocalFileFilterDlg_zh_TW.properties` | Text reviewed | .properties | 1939 |
| `src/main/resources_zh_TW/com/myjavaworld/jftp/LocalFilePropertiesDlg_zh_TW.properties` | Text reviewed | .properties | 447 |
| `src/main/resources_zh_TW/com/myjavaworld/jftp/LocalFileTableModel_zh_TW.properties` | Text reviewed | .properties | 154 |
| `src/main/resources_zh_TW/com/myjavaworld/jftp/LocalPane_zh_TW.properties` | Text reviewed | .properties | 408 |
| `src/main/resources_zh_TW/com/myjavaworld/jftp/LocalSystemMenu_zh_TW.properties` | Text reviewed | .properties | 1489 |
| `src/main/resources_zh_TW/com/myjavaworld/jftp/NewLocalDirectoryDlg_zh_TW.properties` | Text reviewed | .properties | 225 |
| `src/main/resources_zh_TW/com/myjavaworld/jftp/NewLocalFileDlg_zh_TW.properties` | Text reviewed | .properties | 215 |
| `src/main/resources_zh_TW/com/myjavaworld/jftp/NewRemoteDirectoryDlg_zh_TW.properties` | Text reviewed | .properties | 225 |
| `src/main/resources_zh_TW/com/myjavaworld/jftp/NewRemoteFileDlg_zh_TW.properties` | Text reviewed | .properties | 215 |
| `src/main/resources_zh_TW/com/myjavaworld/jftp/PreferencesDlg_zh_TW.properties` | Text reviewed | .properties | 755 |
| `src/main/resources_zh_TW/com/myjavaworld/jftp/ProxyPrefsPanel_zh_TW.properties` | Text reviewed | .properties | 729 |
| `src/main/resources_zh_TW/com/myjavaworld/jftp/RemoteFileFilterDlg_zh_TW.properties` | Text reviewed | .properties | 1811 |
| `src/main/resources_zh_TW/com/myjavaworld/jftp/RemoteFilePropertiesDlg_zh_TW.properties` | Text reviewed | .properties | 692 |
| `src/main/resources_zh_TW/com/myjavaworld/jftp/RemoteFileTableModel_zh_TW.properties` | Text reviewed | .properties | 184 |
| `src/main/resources_zh_TW/com/myjavaworld/jftp/RemotePane_zh_TW.properties` | Text reviewed | .properties | 348 |
| `src/main/resources_zh_TW/com/myjavaworld/jftp/RemoteSystemMenu_zh_TW.properties` | Text reviewed | .properties | 1935 |
| `src/main/resources_zh_TW/com/myjavaworld/jftp/RenameLocalFileDlg_zh_TW.properties` | Text reviewed | .properties | 329 |
| `src/main/resources_zh_TW/com/myjavaworld/jftp/RenameRemoteFileDlg_zh_TW.properties` | Text reviewed | .properties | 329 |
| `src/main/resources_zh_TW/com/myjavaworld/jftp/SecurityPrefsPanel_zh_TW.properties` | Text reviewed | .properties | 309 |
| `src/main/resources_zh_TW/com/myjavaworld/jftp/SoftwareUpdatePrefsPanel_zh_TW.properties` | Text reviewed | .properties | 137 |
| `src/main/resources_zh_TW/com/myjavaworld/jftp/ssl/CertificateDlg_zh_TW.properties` | Text reviewed | .properties | 92 |
| `src/main/resources_zh_TW/com/myjavaworld/jftp/ssl/CertificateManagerDlg_zh_TW.properties` | Text reviewed | .properties | 570 |
| `src/main/resources_zh_TW/com/myjavaworld/jftp/ssl/CertificatePane_zh_TW.properties` | Text reviewed | .properties | 480 |
| `src/main/resources_zh_TW/com/myjavaworld/jftp/ssl/CertificateTableModel_zh_TW.properties` | Text reviewed | .properties | 165 |
| `src/main/resources_zh_TW/com/myjavaworld/jftp/ssl/SecurityWarningDlg_zh_TW.properties` | Text reviewed | .properties | 1395 |
| `src/main/resources_zh_TW/com/myjavaworld/jftp/StatusBar_zh_TW.properties` | Text reviewed | .properties | 126 |
| `src/main/resources_zh_TW/com/myjavaworld/jftp/StatusWindow_zh_TW.properties` | Text reviewed | .properties | 721 |
| `src/main/resources_zh_TW/com/myjavaworld/jftp/ToolsMenu_zh_TW.properties` | Text reviewed | .properties | 563 |
| `src/main/resources_zh_TW/com/myjavaworld/jftp/TransferModeMenu_zh_TW.properties` | Text reviewed | .properties | 362 |
| `src/main/resources_zh_TW/com/myjavaworld/jftp/TransferModesPrefsPanel_zh_TW.properties` | Text reviewed | .properties | 173 |
| `src/main/resources_zh_TW/com/myjavaworld/jftp/UIPrefsPanel_zh_TW.properties` | Text reviewed | .properties | 75 |
| `src/main/resources_zh_TW/com/myjavaworld/jftp/UploadAsDlg_zh_TW.properties` | Text reviewed | .properties | 209 |
| `src/main/resources_zh_TW/com/myjavaworld/jftp/ZipAndUploadDlg_zh_TW.properties` | Text reviewed | .properties | 759 |
| `src/main/resources_zh_TW/com/myjavaworld/util/CommonResources_zh_TW.properties` | Text reviewed | .properties | 792 |
