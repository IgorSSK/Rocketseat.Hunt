/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import App from './src/index';
import {name as appName} from './app.json';
import './src/config/statusBarConfig'

AppRegistry.registerComponent(appName, () => App);
