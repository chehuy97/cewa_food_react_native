import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import colors from '../utils/constants/colors'
import { createStackNavigator } from '@react-navigation/stack';
import AccountScreen from '../screens/account';
import HomeScreen from '../screens/home';
import StoreScreen from '../screens/store';
import LoginScreen from '../screens/authentication/login'
import {navigationRef} from'./rootNavigation';
import SavedScreen from '../screens/saved';
import dimens from '../utils/constants/dimens';
import { createDrawerNavigator } from '@react-navigation/drawer'

export type RootStackParamList = {
  RootTab: undefined,
  Login:undefined
  Home: undefined,
  Store: {
    store_id: string
  },
  Account:undefined
}

const Stack = createStackNavigator<RootStackParamList>()
const Drawer = createDrawerNavigator()


const routes = () => {

  return (
    <NavigationContainer ref={navigationRef}>
      {/* <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            var stringName: string = "home"
            if (route.name == "Home") {
              stringName = "home-sharp"
            } else if (route.name == "Account") {
              stringName = "person-sharp"
            } else if (route.name == "Notification") {
              stringName = "notifications-sharp"
            } else if (route.name == "Saved") {
              stringName = "bookmark-sharp"
            }
            return <Icon name={stringName} size={size} color={color} />;
          },

        })}
        tabBarOptions={{
          activeTintColor: 'red',
          inactiveTintColor: 'gray',
          showLabel: false,
          style: { height: dimens.phone_height*1/12, backgroundColor: colors.bottom_bar }
        }}
      >
        <Tab.Screen name="HomeNavigator" component={HomeNavigator} />
        <Tab.Screen name="Saved" component={SavedScreen}/>
        <Tab.Screen name="Notification" component={NotificatonScreen} />
        <Tab.Screen name="AccountNavigator" component={AccountNavigator} />
      </Tab.Navigator> */}
      <Stack.Navigator
            screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={LoginScreen}/>
      <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default routes
