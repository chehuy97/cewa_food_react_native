import React from 'react'
import { View, Text } from 'react-native'
import AppHeader from '../../components/appHeader'

const settings = () => {
    return (
        <View>
            <AppHeader title="Settings" rightIcon='settings' callbackItemOne={() => {}} callbackItemTwo={() => {}}/>
            <Text>Settings</Text>
        </View>
    )
}

export default settings
