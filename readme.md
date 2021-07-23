To start the emulator use `firebase emulators:start --only hosting`

## How to set up project:
* Run `firebase login`
* Install firebase tools:
  * `npm install -g firebase-tools`
* Run `firebase init`
  * Select realtime database, hosting (not with GitHub actions), and emulators
  * Use an existing firebase project to link realtime DB
  * Pick default security rules
  * Use default public directory (`./public/`)
  * Do not configure as single-page app
  * Only set up the hosting emulator
  * Use the default port for the emulator
* Run `firebase emulators:start --only hosting`
* You are ready to go on localhost!
