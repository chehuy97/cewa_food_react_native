import { useNavigation } from '@react-navigation/core'
import React, { Component, useEffect, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { Header } from 'react-native-elements'
import SearchBar from '../../components/searchbar/HomeSearchBar'
import StoreItem from '../../components/items/StoreItem'
import Store from '../../models/Store'
import { navigate } from '../../routes/rootNavigation'
import dimens from '../../constants/dimens'
import { get_store } from '../../service/Network'

const Home = () => {

    const defaultStores: Store[] = []
    const [stores, setStores]: [Store[], (stores: Store[]) => void] = useState(defaultStores)

    useEffect(() => {
        get_store_data()
    }, [])

    const get_store_data = () => {
        get_store().then(response => {            
            let data: Store[] = response.data.data
            setStores(data)
        }).catch(err => {
            console.log("Error is "+err);
            
        })
    }

    const navigate_to_store_detail = (item: Store) => {
        navigate("Store", {
            storeItem: item
        })
    }

    return (
        <View>
            <SearchBar />
            <View style={{ marginBottom: dimens.phone_height * 1 / 9 }}>
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