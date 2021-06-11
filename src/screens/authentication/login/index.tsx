import React, { Component, useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, Alert } from 'react-native'
import { Input } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Ionicons'
import colors from '../../../utils/constants/colors'
import dimens from '../../../utils/constants/dimens'
import { goBack } from '../../../routes/rootNavigation'
import { userLoginWithEmail, login_request } from '../../../actions/userAction'
import { useDispatch } from 'react-redux'

const Login = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handle_login = async () => {
        if (validateEmail(email)) {
            let user:userLoginWithEmail = {
                email: email,
                password: password
            }
            await dispatch(login_request(user, goBack))
        } else {
            Alert.alert("Invalid email")
        }
    }

    const validateEmail = (email:string) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    return (
        <View style={styles.container}>
            <View style={styles.backStyle}>
                <TouchableOpacity onPress={() => goBack()}>
                    <Icon name='chevron-back' size={30} color='black' />
                </TouchableOpacity>
            </View>
            <View style={styles.loginContainer}>
                <Text style={styles.titleStyle}>CEWA FOOD</Text>
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
                    style={styles.loginStyle}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>Forgot Account?</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}

export default Login


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    loginContainer: {
        flex: 1,
        backgroundColor: colors.bg_page,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: dimens.phone_width / 16
    },
    inputStyle: {
        height: 40,
        backgroundColor: 'white',
        paddingHorizontal: 10
    },
    loginStyle: {
        height: 40,
        width: dimens.phone_width * 14 / 16 - 20,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    titleStyle: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: 30,
        marginBottom: 50
    },
    backStyle: {
        height: 80,
        justifyContent: 'flex-end',
        paddingLeft: 10
    }
})