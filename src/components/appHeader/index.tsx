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
    title: string,
    rightIcon: string,
    callbackItemOne: () => void,
    callbackItemTwo: () => void
}

const appHeader = ({ title, rightIcon, callbackItemOne, callbackItemTwo }: appHeaderProps) => {
    const theme = colors.app_color

    return (
        <View>
            <Header
                placement="left"
                statusBarProps={{ backgroundColor: theme }}
                containerStyle={{ backgroundColor: theme }}
                leftComponent={
                    <Icon
                        onPress={() => { navigation.dispatch(DrawerActions.openDrawer()) }}
                        name='menu'
                        color='#fff'
                        size={25} />}
                centerComponent={{ text: title, style: { color: '#fff', fontSize: 20 } }}
                rightComponent={
                    <View style={{flexDirection:'row'}}>
                        {rightIcon == 'search' ? <Icon
                        style={{marginRight:10}}
                            onPress={() => { callbackItemOne() }}
                            name='folder'
                            color='#fff'
                            size={25} /> : null}
                        <Icon
                            onPress={() => { callbackItemTwo() }}
                            name={rightIcon}
                            color='#fff'
                            size={25} />
                    </View>
                }
            />
        </View>
    )
}

export default appHeader
