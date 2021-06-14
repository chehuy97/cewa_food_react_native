import React, { useEffect } from 'react'
import { Alert, BackHandler, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { goBack } from '../../routes/rootNavigation'

interface noteHeaderProps {
    color: string
}

const noteHeader = ({ color }: noteHeaderProps) => {

    const backAction = () => {
        console.log("back btn did tapped");

        Alert.alert("Alert", "It can be not save.Are you sure you want to go back?", [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            { text: "YES", onPress: () => goBack() }
        ]);
        return true;
    };

    return (
        <View style={[styles.container, { backgroundColor: color }]}>
            <TouchableOpacity onPress={() => backAction()}>
                <Icon name="chevron-back-outline" size={25} color="gray" />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => { }} style={styles.iconTailStyle}>
                    <Icon name="trash-outline" size={25} color="gray" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { }} style={styles.iconTailStyle}>
                    <Icon name="download-outline" size={25} color="gray" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default noteHeader

const styles = StyleSheet.create({
    container: {
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        justifyContent: 'space-between'
    },
    iconTailStyle: {
        marginHorizontal: 10
    }

})
