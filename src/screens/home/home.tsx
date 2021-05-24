import { useNavigation } from '@react-navigation/core'
import React, { Component, useEffect } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { Header } from 'react-native-elements'
import SearchBar from '../../components/searchbar/HomeSearchBar'
import StoreItem from '../../components/items/StoreItem'
import { stores } from '../../DummyData'

const Home = () => {

    const navigation = useNavigation()

    const navigate_to_store_detail = () =>{
        navigation.navigate("Store") 
    }

    return (
        <View>
            <SearchBar/>
            <View>
            <FlatList
                data={stores}
                renderItem={({ item }) => <StoreItem data={item} callBack={navigate_to_store_detail}/>}
                numColumns={2}
                keyExtractor={item => item.store_id } />
            </View>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})