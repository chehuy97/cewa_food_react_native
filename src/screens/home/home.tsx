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

    return (
        <View>
            <SearchBar/>
            <View>
            <FlatList
                data={stores}
                renderItem={({ item }) => <StoreItem data={item}/>}
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