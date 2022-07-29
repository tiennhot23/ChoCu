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