import React, { useEffect } from 'react'
import { Text, View, StyleSheet, Alert, BackHandler } from 'react-native'
import { Header } from 'react-native-elements'
import AppHeader from '../../components/appHeader'

const Home = () => {

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
    
        return () => backHandler.remove();
      }, []);

      const backAction = () => {
        console.log("back btn did tapped");
        
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    return (
        <View>
            <AppHeader/>
            <Text>Home</Text>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})