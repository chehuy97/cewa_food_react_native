import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import colors from '../constants/colors'
import { createStackNavigator } from '@react-navigation/stack';
import AccountScreen from '../screens/account';
import HomeScreen from '../screens/home';
import StoreScreen from '../screens/store';
import NotificatonScreen from '../screens/notification'
import {navigationRef} from'./rootNavigation';
import SavedScreen from '../screens/saved';
import { Store } from '../models/Store';
import dimens from '../constants/dimens';

export type RootStackParamList = {
  RootTab: undefined,
  Home: undefined,
  Store: {
    storeItem: Store
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
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Store" component={StoreScreen} />
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
        <Tab.Screen name="Account" component={AccountScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default routes
