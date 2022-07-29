npx react-native init ChoCu --version 0.68.2

### setup module resolver

-  yarn add --dev --exact babel-plugin-module-resolver
-  add jsconfig.json file
-  update babel.config.js

### debug with flipper

-   enableHermes in app build.grandle
-   clean grandle and rebuild
-   adb reverse tcp:8097 tcp:8097

### config prettier

-   yarn add --dev prettier
-   config file .prettierrc.js, .vscode/settings.json

### setup lib

-   add lib
-   reanimated: add plugin 'react-native-reanimated/plugin', to babel.config.js
-   firebase-service: in project build.grandle add classpath 'com.google.gms:google-services:4.3.12' and in app build.grandle add apply plugin: 'com.google.gms.google-services',implementation platform('com.google.firebase:firebase-bom:30.2.0')implementation 'com.google.firebase:firebase-analytics'
-   add file google-services.json
-   vector-icon: in app build.grandle add apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
-   restart