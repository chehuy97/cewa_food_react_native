import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import colors from '../constants/colors'
import { createStackNavigator } from '@react-navigation/stack';
import Account from '../screens/account/account';
import Home from '../screens/home/home';
import Store from '../screens/store/Store';
import Notificaton from '../screens/notification/notification'
import SearchBar from '../components/searchbar/HomeSearchBar';
import {navigationRef} from'./rootNavigation';

export type RootStackParamList = {
  RootTab: undefined,
  Home: undefined,
  Store: {
    store_id: string
  }

}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<RootStackParamList>()

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: 'red'
        }
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Store" component={Store} />
    </Stack.Navigator>
  );
};

const routes = () => {

  return (
    <NavigationContainer ref={navigationRef}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            var stringName: string = "home"
            if (route.name == "Home") {
              stringName = "home-sharp"
            } else if (route.name == "Account") {
              stringName = "person-sharp"
            } else if (route.name == "Notification") {
              stringName = "notifications-sharp"
            }
            return <Icon name={stringName} size={size} color={color} />;
          },

        })}
        tabBarOptions={{
          activeTintColor: 'red',
          inactiveTintColor: 'gray',
          showLabel: false,
          style: { height: 50, backgroundColor: colors.bottom_bar }
        }}
      >
        <Tab.Screen name="HomeNavigator" component={HomeNavigator} />
        <Tab.Screen name="Notification" component={Notificaton} />
        <Tab.Screen name="Account" component={Account} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default routes
