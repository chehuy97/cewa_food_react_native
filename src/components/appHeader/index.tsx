import AsyncStorage from '@react-native-async-storage/async-storage'
import { DrawerActions } from '@react-navigation/routers'
import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { Header } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import { navigation } from '../../routes/rootNavigation'
import { useSelector } from '../../reducers'
import colors from '../../utils/constants/colors'

interface appHeaderProps {
    title:string,
    rightIcon: string
    callback: () => void
}

const appHeader = ({title, rightIcon, callback }:appHeaderProps) => {
    const theme = colors.app_color

    return (
        <View>
            <Header
                placement="left"
                statusBarProps={{backgroundColor:theme}}
                containerStyle={{backgroundColor:theme}}
                leftComponent={
                <Icon 
                onPress={() => { navigation.dispatch(DrawerActions.openDrawer()) }}
                name='menu' 
                color='#fff' 
                size={25}/>}
                centerComponent={{ text: title, style: { color: '#fff', fontSize: 20 } }}
                rightComponent={
                    <Icon 
                    onPress={() => { callback() }}
                    name={rightIcon}
                    color='#fff' 
                    size={25}/>}
            />
        </View>
    )
}

export default appHeader
