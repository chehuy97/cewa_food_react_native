import { useNavigation } from '@react-navigation/core'
import React, { Component, useEffect } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { Header } from 'react-native-elements'
import SearchBar from '../../components/searchbar/HomeSearchBar'
import StoreItem from '../../components/items/StoreItem'
import { stores } from '../../DummyData'
import Store from '../../models/Store'
import { navigate } from '../../routes/rootNavigation'
import dimens from '../../constants/dimens'

const Home = () => {

    const navigate_to_store_detail = (item:Store) => {
        navigate("Store", {
            storeItem:item
        })
    }

    return (
        <View>
            <SearchBar/>
            <View style={{marginBottom:dimens.phone_height*1/9}}>
                <FlatList
                    data={stores}
                    renderItem={({ item }) => <StoreItem data={item} callBack={navigate_to_store_detail} />}
                    numColumns={2}
                    keyExtractor={item => item.store_id} />
            </View>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})