/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import { Text } from 'react-native';
import Routes from './src/routes/Routes';


const App = () => {

  console.disableYellowBox = true;

  return (
      <Routes/>
  )
}

export default App;
