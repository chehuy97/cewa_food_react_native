import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { Drawer } from 'react-native-paper'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { useSelector } from '../../reducers'
import { useDispatch } from 'react-redux'
import { logout_request } from '../../actions/userAction'
import { navigate, goBack } from '../../routes/rootNavigation'
const drawerContent = () => {
    const email = useSelector(state => state.user.email)
    let username = email?.split('@')[0]
    let firstLetter = username?.charAt(0).toUpperCase()
    let dispatch = useDispatch()

    const signout = () => {
        dispatch(logout_request)
        goBack()
    }

    return (
        <View style={styles.container}>
            <DrawerContentScrollView>
                <View style={styles.headerView}>
                    <View style={styles.avatarView}>
                        <Text style={styles.avatarText}>{firstLetter}</Text>
                    </View>
                    <View>
                        <Text style={{fontSize: 27}}>{username}</Text>
                        <Text style={{fontStyle:'italic'}}>{email}</Text>
                    </View>
                </View>
                <Drawer.Section >
                    <Drawer.Item
                        icon={({ color, size }) => <Icon name="bulb-outline" size={20} color={color} />}
                        label="Notes"
                        onPress={() => { navigate("Home")}}
                    />
                    <Drawer.Item
                        icon={({ color, size }) => <Icon name="notifications-outline" size={20} color={color} />}
                        label="Remiders"
                        onPress={() => { navigate("Reminders") }}
                    />
                </Drawer.Section>
                <Drawer.Section>
                    <Drawer.Item
                        icon={({ color, size }) => <Icon name="settings-outline" size={20} color={color} />}
                        label="Settings"
                        onPress={() => { navigate("Settings") }}
                    />
                    <Drawer.Item
                        icon={({ color, size }) => <Icon name="help-circle-outline" size={20} color={color} />}
                        label="Helps"
                        onPress={() => { navigate("Help") }}
                    />
                </Drawer.Section>
            </DrawerContentScrollView>
            <Drawer.Section>
                <Drawer.Item
                    icon={({ color, size }) => <Icon name="log-out-outline" size={20} color={color} />}
                    label="Signout"
                    onPress={() => { }}
                />
            </Drawer.Section>
        </View>
    )
}

export default drawerContent

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerView: {
        height: 100,
        backgroundColor: '#bebebe',
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarView: {
        width: 70,
        height: 70,
        backgroundColor: '#1868ae',
        borderRadius: 35,
        alignItems: 'center',
        justifyContent:'center',
        marginLeft: 20,
        marginRight: 20
    },
    avatarText: {
        color: 'white',
        fontSize: 40
    }
})




