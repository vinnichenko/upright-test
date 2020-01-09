/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import Router from './src/navigation';
import store from './src/store';


const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#ffffff"
      />
      <Router />
    </Provider>
  );
};

export default App;
