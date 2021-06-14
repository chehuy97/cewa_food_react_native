import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AppHeader from '../../components/appHeader'

const addNote = () => {
    return (
        <View>
            <AppHeader title="Add Note"/>
            <Text>Add Notes</Text>
        </View>
    )
}

export default addNote

const styles = StyleSheet.create({})
