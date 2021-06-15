import AsyncStorage from '@react-native-async-storage/async-storage'
import { DrawerActions } from '@react-navigation/routers'
import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { Header } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import { navigation } from '../../routes/rootNavigation'
import { useSelector } from '../../reducers'

interface appHeaderProps {
    title:string
}

const appHeader = ({title}:appHeaderProps) => {
    const theme = useSelector(state => state.theme.themeColor)
    // const [theme,setTheme] = useState(colors.yellow_theme)

    // useEffect(() => {
    //     get_theme()
    // },[theme])

    // const get_theme = async () => {
    //     let color = await AsyncStorage.getItem(appTheme)
    //     if(color){
    //         setTheme(color)
    //     }
    // }

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
                rightComponent={{ icon: 'home', color: '#fff' }}
            />
        </View>
    )
}

export default appHeader
