import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import homeScreen from '../screens/home';
import loginScreen from '../screens/authentication/login'
import reminderScreen from '../screens/reminders'
import settingScreen from '../screens/settings'
import editNoteScreen from '../screens/notes/editNote'
import helpScreen from '../screens/help'
import { navigationRef } from './rootNavigation';
import { createDrawerNavigator } from '@react-navigation/drawer'
import DrawerContent from '../components/drawerContent'
import { INote } from '../DummyData';

export type RootStackParamList = {
  Login: undefined
  Drawer: undefined,
  Home: undefined,
  EditNote: {
    note:INote
  },
  Reminders: undefined,
  Settings: undefined,
  Help: undefined
}

const Stack = createStackNavigator<RootStackParamList>()
const Drawer = createDrawerNavigator();


const routes = () => {

  const home_navigator = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
           <Stack.Screen name="Home" component={homeScreen} />
           <Stack.Screen name="EditNote" component={editNoteScreen} />
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
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default routes
