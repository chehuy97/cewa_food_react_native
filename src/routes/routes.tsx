import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/home/home';
import Account from '../screens/account/account';
import { HomeOutlined, HomeSharp, AccountCircleOutlined, AccountCircleSharp  } from '@material-ui/icons'
import Icon from 'react-native-vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();


const routes = () => {

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          // var iconName:string="";

          if (route.name === 'Home') {
            if(focused){
              return <HomeOutlined/>
            } else {
              return <HomeSharp/>
            }
          } else if (route.name === 'Account') {
            if(focused){
              return <AccountCircleOutlined/>
            } else {
              return <AccountCircleSharp/>
            }
          }
          // console.log("Focus is "+focused+" and "+iconName+" color "+color+" size "+size);
          
          // // You can return any component that you like here!
          // return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  )
}

export default routes
