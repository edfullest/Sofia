// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  hmr: false,
  firebase: {
    apiKey: "AIzaSyDRejLleE6Z1B8y9vt-RKJpC3MpOXp7n6M",
    authDomain: "sofia-97b65.firebaseapp.com",
    databaseURL: "https://sofia-97b65.firebaseio.com",
    projectId: "sofia-97b65",
    storageBucket: "sofia-97b65.appspot.com",
    messagingSenderId: "749913572579"
  }
};