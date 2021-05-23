import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator, BottomTabBarHeightContext } from '@react-navigation/bottom-tabs';
import Home from '../screens/home/home';
import Account from '../screens/account/account';
import Notificaton from '../screens/notification/notification'
import Icon from 'react-native-vector-icons/Ionicons';
//import { HomeOutlined, HomeSharp, AccountCircleOutlined, AccountCircleSharp } from '@material-ui/icons'
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();


const routes = () => {

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            var stringName:string = "home"
            if(route.name == "Home"){
              stringName = "home-sharp"
            } else if(route.name == "Account") {
              stringName = "person-sharp"
            } else if (route.name == "Notification"){
              stringName = "notifications-sharp"
            }
            return <Icon name={stringName} size={28} color={color} />;
          },
          
        })}
        tabBarOptions={{
          activeTintColor: 'red',
          inactiveTintColor: 'gray',
          showLabel: false,
          style:{ height: 55, backgroundColor: '#D3D3D3'}
        }}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Notification" component={Notificaton} />
        <Tab.Screen name="Account" component={Account} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default routes
