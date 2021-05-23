import { useNavigation } from '@react-navigation/core'
import React, { Component, useEffect } from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Header } from 'react-native-elements'
import SearchBar from '../../components/searchbar/HomeSearchBar'
import StoreItem from '../../components/items/StoreItem'

const Home = () => {

    const navigation = useNavigation()

    return (
        <View>
            <SearchBar/>
            <StoreItem/>
        </View>
    )
}

export default Home