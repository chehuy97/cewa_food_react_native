import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { Drawer } from 'react-native-paper'
import React, { useEffect, useState } from 'react'
import { Alert, BackHandler, StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { useSelector } from '../../reducers'
import { useDispatch } from 'react-redux'
import { logout_request } from '../../actions/userAction'
import { navigate } from '../../routes/rootNavigation'
const drawerContent = () => {
    const email = useSelector(state => state.user.auth.email)
    const username = email?.split('@')[0]
    const firstLetter = username?.charAt(0).toUpperCase()
    const theme = useSelector(state => state.theme.themeColor)
    const dispatch = useDispatch()

    useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );

    return () => backHandler.remove();
  }, []);

//   const backAction = () => {
//     console.log("back btn did tapped");

//     Alert.alert("Hold on!", "Are you sure you want to go back?", [
//       {
//         text: "Cancel",
//         onPress: () => null,
//         style: "cancel"
//       },
//       { text: "YES", onPress: () => BackHandler.exitApp() }
//     ]);
//     return true;
//   };

    const signout = () => {
        navigate('Login')
        dispatch(logout_request)
    }

    return (
        <View style={styles.container}>
            <DrawerContentScrollView>
                <View style={styles.headerView}>
                    <View style={[styles.avatarView,{backgroundColor: theme}]}>
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
                        onPress={() => { navigate("HomeNav")}}
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
                    onPress={() => { signout() }}
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
        borderRadius: 35,
        alignItems: 'center',
        justifyContent:'center',
        marginHorizontal:10
    },
    avatarText: {
        color: 'white',
        fontSize: 40
    }
})




