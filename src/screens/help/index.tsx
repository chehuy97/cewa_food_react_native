import React from 'react'
import { View, Text } from 'react-native'
import AppHeader from '../../components/appHeader'

const helps = () => {
    return (
        <View>
            <AppHeader title="Help" rightIcon='settings' callback={() => {}}/>
            <Text>Helps</Text>
        </View>
    )
}

export default helps
