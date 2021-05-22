/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Text } from 'react-native';
import Routes from './src/routes/routes';


const App = () => {

  console.disableYellowBox = true;

  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  )
}

export default App;
