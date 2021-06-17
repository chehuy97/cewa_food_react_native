/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { useEffect } from 'react';
import Routes from './src/routes/routes';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';
import { persistor, store } from './src/store'
import { set_theme } from './src/actions/themeAction'
import { getAppTheme } from './src/utils/storage'
import { create_channel_notification } from './src/service/notification'


const App = () => {

  useEffect(() => {
    console.disableYellowBox = true;
    create_channel_notification()
  })

  return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes/>
        </PersistGate>
      </Provider>
  )
}

export default App;
