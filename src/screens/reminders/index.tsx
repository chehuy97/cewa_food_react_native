import React from 'react'
import { View, Text } from 'react-native'
import AppHeader from '../../components/appHeader'

const reminders = () => {
    return (
        <View>
            <AppHeader title="Reminders" />
            <Text>Reminder</Text>
        </View>
    )
}

export default reminders
