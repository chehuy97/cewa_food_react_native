import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import homeScreen from '../screens/home';
import loginScreen from '../screens/authentication/login'
import reminderScreen from '../screens/reminders'
import settingScreen from '../screens/settings'
import helpScreen from '../screens/help'
import {navigationRef} from'./rootNavigation';
import { createDrawerNavigator } from '@react-navigation/drawer'

export type RootStackParamList = {
  Login:undefined
  Drawer: undefined,
  Home: undefined,
  Reminders:undefined,
  Settings:undefined,
  Help:undefined
}

const Stack = createStackNavigator<RootStackParamList>()
const Drawer = createDrawerNavigator();


const routes = () => {

  const drawer_navigator = () => {
    return (
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={homeScreen} />
        <Drawer.Screen name="Reminders" component={reminderScreen}/>
        <Drawer.Screen name="Settings" component={settingScreen}/>
        <Drawer.Screen name="Help" component={helpScreen}/> 
      </Drawer.Navigator>
    )
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
            screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={loginScreen}/>
      <Stack.Screen name="Drawer" component={drawer_navigator} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default routes
