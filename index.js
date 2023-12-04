/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry,Text, TextInput} from 'react-native';
import { BugsnagUtil, isIos } from '@common';
import { FontDefault } from '@theme/typography';
import App from './src/App';
import './declare';
import {name as appName} from './app.json';
import { ENVConfig } from '@config/env';
import { startNetworkLogging } from 'react-native-network-logger';

//disable auto scale
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
Text.defaultProps.style = { fontFamily: FontDefault.primary };
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;
TextInput.defaultProps.style = { fontFamily: FontDefault.primary };
BugsnagUtil.start();

// network logger start
if (ENVConfig.APP_ENV !== 'Prod') {
  startNetworkLogging({
    ignoredPatterns: [/^HEAD /],
  });
}

AppRegistry.registerComponent(appName, () => App);
