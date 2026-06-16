import { registerRootComponent } from 'expo';

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App)
// and sets up the dev/prod environment appropriately for both Expo Go and
// native (dev-client) builds.
registerRootComponent(App);
