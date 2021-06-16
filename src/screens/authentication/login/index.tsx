import React, { Component, useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, Alert, ActivityIndicator } from 'react-native'
import { Input } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Ionicons'
import colors from '../../../utils/constants/colors'
import dimens from '../../../utils/constants/dimens'
import { userLoginWithEmail, login_request } from '../../../actions/userAction'
import { useDispatch } from 'react-redux'
import { navigate } from '../../../routes/rootNavigation'
import { getAppTheme } from '../../../utils/storage'
import { set_theme } from '../../../actions/themeAction'
import { useSelector } from '../../../reducers'
import { validateEmail } from '../../../utils/validation'
import Spinner from 'react-native-loading-spinner-overlay'

const Login = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const theme = useSelector(state => state.theme.themeColor)

    useEffect(() => {
        set_theme_color()
    })

    const set_theme_color = async () => {
        let color = await getAppTheme()
        if (color) {
            dispatch(set_theme(color))
        }
    }


    const handle_login = async () => {
        if (validateEmail(email)) {
            setLoading(true)
            let user: userLoginWithEmail = {
                email: email,
                password: password
            }
            await dispatch(login_request(user, navigate_to_home))
            setLoading(false)
        } else {
            Alert.alert("Invalid email")
        }
    }

    const navigate_to_home = () => {
        navigate("Drawer")
    }

    const render_indicator = () => {
        return (
            <View style={styles.indicatorView}>
                <ActivityIndicator />
                <Text style={styles.indicatorText}>loading...</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Spinner
                visible={loading}
                textContent={'Loading...'}
                textStyle={{ color: 'gray' }}
            />
            <View style={styles.loginContainer}>
                <Text style={[styles.titleStyle, { color: theme }]}>TODO APP</Text>
                <Input
                    placeholder='email@address.com'
                    onChangeText={text => setEmail(text)}
                    inputContainerStyle={styles.inputStyle}
                    leftIcon={
                        <Icon
                            name='person'
                            size={20}
                            color='gray'
                            style={{ marginRight: 10 }}
                        />
                    }
                />
                <Input
                    placeholder='password'
                    onChangeText={text => setPassword(text)}
                    inputContainerStyle={styles.inputStyle}
                    secureTextEntry={true}
                    leftIcon={
                        <Icon
                            name='lock-closed'
                            size={20}
                            color='gray'
                            style={{ marginRight: 10 }}
                        />
                    }
                />
                <TouchableOpacity
                    onPress={() => handle_login()}
                    style={[styles.loginStyle, { backgroundColor: theme }]}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigate("Register")}>
                    <Text style={{ fontSize: 17 }}>Register</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}

export default Login


const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: colors.bg_page
    },
    loginContainer: {
        flex: 1,
        backgroundColor: colors.bg_page,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: dimens.phone_width / 16,
    },
    inputStyle: {
        height: 40,
        backgroundColor: 'white',
        paddingHorizontal: 10
    },
    loginStyle: {
        height: 40,
        width: dimens.phone_width * 14 / 16 - 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    titleStyle: {
        fontWeight: 'bold',
        fontSize: 30,
        marginBottom: 50
    },
    backStyle: {
        height: 80,
        justifyContent: 'flex-end',
        paddingLeft: 10,
        backgroundColor: colors.bg_page
    },
    indicatorView: {
        height: 40,
        backgroundColor: colors.bg_page,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    indicatorText: {
        color: 'gray',
        fontSize: 17,
        marginLeft: 10
    }
})