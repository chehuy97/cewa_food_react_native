import { DrawerActions } from '@react-navigation/routers'
import React from 'react'
import { View, Text } from 'react-native'
import { Header } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import { navigation } from '../../routes/rootNavigation'

interface appHeaderProps {
    title:string
}

const appHeader = ({title}:appHeaderProps) => {
    return (
        <View>
            <Header
                placement="left"
                leftComponent={
                <Icon 
                onPress={() => { navigation.dispatch(DrawerActions.openDrawer()) }}
                name='menu' 
                color='#fff' 
                size={25}/>}
                centerComponent={{ text: title, style: { color: '#fff', fontSize: 20 } }}
                rightComponent={{ icon: 'home', color: '#fff' }}
            />
        </View>
    )
}

export default appHeader
