import React, { Component, useEffect, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { Header } from 'react-native-elements'
import SearchBar from '../../components/homesearchbar'
import StoreItem from '../../components/storeitem'
import { IStore } from '../../models/store'
import { navigate } from '../../routes/rootNavigation'
import dimens from '../../utils/constants/dimens'
import { useSelector } from '../../reducers'
import { useDispatch } from 'react-redux'
import { fetch_store } from '../../actions/storeAction'

const Home = () => {

    const stores = useSelector(state => state.store.stores)
    const dispatch = useDispatch()
    const [searchValue,setSearchValue] = useState(" ")

    useEffect(() => {
        fetch_all_store()
    }, [searchValue])

    const fetch_all_store = async () => {
        await dispatch(fetch_store(searchValue))
    }


    const navigate_to_store_detail = (item: IStore) => {
        navigate("Store", {
            store_id: item.id
        })
    }

    const filter_store = (value:string) => {
        console.log("Search touch");
        
        setSearchValue(value)
    }

    return (
        <View>
            <SearchBar callBack={filter_store} />
            <View style={{ marginBottom: dimens.phone_height * 1 / 9 }}>
                <FlatList
                    data={stores}
                    renderItem={({ item }) => <StoreItem data={item} callBack={navigate_to_store_detail} />}
                    numColumns={2}
                    keyExtractor={item => item.id} />
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