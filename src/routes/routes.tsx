import React, { Component, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import homeScreen from '../screens/home';
import loginScreen from '../screens/authentication/login'
import reminderScreen from '../screens/reminders'
import settingScreen from '../screens/settings'
import noteScreen from '../screens/note'
import dateTimePickerScreen from '../screens/dateTimePicker'
import helpScreen from '../screens/help'
import registerScreen from '../screens/authentication/register'
import { navigationRef } from './rootNavigation';
import { createDrawerNavigator } from '@react-navigation/drawer'
import DrawerContent from '../components/drawerContent'
import { INote, IReminder } from '../reducers'

export type RootStackParamList = {
  Login: undefined
  Drawer: undefined,
  Home: undefined,
  Note: {
    note:INote
  },
  DateTimePicker: {
    note:INote,
    reminder:IReminder
  },

  Reminders: undefined,
  Settings: undefined,
  Help: undefined,
  Register: undefined
}

const Stack = createStackNavigator<RootStackParamList>()
const Drawer = createDrawerNavigator();

const routes = () => {

  const home_navigator = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
           <Stack.Screen name="Home" component={homeScreen} />
           <Stack.Screen name="Note" component={noteScreen} />
      </Stack.Navigator>
    )
  }

  const drawer_navigator = () => {
    return (
      <Drawer.Navigator initialRouteName="Home" drawerContent={props => <DrawerContent />}>
        <Drawer.Screen name="HomeNav" component={home_navigator} />
        <Drawer.Screen name="Reminders" component={reminderScreen} />
        <Drawer.Screen name="Settings" component={settingScreen} />
        <Drawer.Screen name="Help" component={helpScreen} />
      </Drawer.Navigator>
    )
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={loginScreen} />
        <Stack.Screen name="Drawer" component={drawer_navigator} />
        <Stack.Screen name="Register" component={registerScreen} />
        <Stack.Screen name="DateTimePicker" component={dateTimePickerScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default routes
