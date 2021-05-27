import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Header } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import dimens from '../../constants/dimens'
import HomeSearchBar from '../searchbar/HomeSearchBar'

const CustomHeader = () => {
    const [isSearchSelected, setIsSearchSelected] = useState(false)
    const custom_header = () => {
        return (
            <Header
            statusBarProps={{ backgroundColor: 'red' }}
            containerStyle={{height: dimens.phone_height*1/9,backgroundColor:'red'}}
            centerComponent={{ text: 'More', style: { color: '#fff', fontSize: 20 } }}
            rightComponent={<Icon name="search" size={25} color="white" onPress={() => {
                let selected = !isSearchSelected
                setIsSearchSelected(selected)}}/>}
        />
        )
    }

    const show_app_bar = () => {
        if(isSearchSelected){
            return <HomeSearchBar callBack={() => {}}/>
        } else {
            return custom_header()
        }
    }

    return (
       <View>
           {show_app_bar()}
       </View>
    )
}

export default CustomHeader

const styles = StyleSheet.create({
    
})
