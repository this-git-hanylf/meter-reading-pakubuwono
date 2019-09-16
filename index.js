/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import Router from './src/Router';
import {name as appName} from './app.json';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Remote debugger']);

AppRegistry.registerComponent(appName, () => Router);