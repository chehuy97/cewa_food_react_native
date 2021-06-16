import React, { useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { IUser, useSelector } from '../../../reducers'
import { Input } from 'react-native-elements'
import colors from '../../../utils/constants/colors'
import dimens from '../../../utils/constants/dimens'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { validateEmail, validatePassword, validateBirthday } from '../../../utils/validation'
import { useDispatch } from 'react-redux'
import { register_request } from '../../../actions/userAction'
import { register } from '../../../service/network'

const index = () => {
    const theme = useSelector(state => state.theme.themeColor)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('')
    const [birthday, setBirthday] = useState('')
    const [gender, setGender] = useState('male')
    const [address, setAddress] = useState('')
    const dispatch = useDispatch()
    

    const handle_register = async () => {
        if(validateEmail(email) && name != '' && address != '' && validateBirthday(birthday) && validatePassword(password) && confirmPassword == password){
            //register
            let user:IUser = {
                id:'',
                email:email,
                password:password,
                name:name,
                address: address,
                gender:gender,
                birthday:birthday
            }
               await dispatch(register_request(user))
        } else{
            Alert.alert('Alert', 'Please validate all field')
        }
    }

    const render_right_icon = (name: string, color: string) => {
        return (
            <Icon
                name={name}
                size={20}
                color={color}
                style={{ marginRight: 10 }}
            />
        )
    }

    const render_check = (check:boolean) => {
        if(check){
            return render_right_icon('checkmark', 'green')
        } else {
            return render_right_icon('close', 'red')
        }
    }

    return (
        <View style={styles.container}>
            {/* <View style={styles.headerView}>
                <Icon name='chevron-back-outline' size={25} color='black'/>
            </View> */}
            <View style={styles.registerContainer}>
                <Text style={[styles.titleStyle, { color: theme }]}>Register</Text>
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
                    rightIcon={email == '' ? null : render_check(validateEmail(email))}
                />
                <Input
                    placeholder='name'
                    onChangeText={text => setName(text)}
                    inputContainerStyle={styles.inputStyle}
                    leftIcon={
                        <Icon
                            name='person'
                            size={20}
                            color='gray'
                            style={{ marginRight: 10 }}
                        />
                    } />
                <View style={styles.genderView}>
                    <Text style={{ fontSize: 18 }}>Gender: </Text>
                    <View style={styles.radioBtnView}>
                        <TouchableOpacity
                            onPress={() => setGender('male')}
                            style={styles.radioBtn}>
                            {gender == 'male' ? <View style={[{ backgroundColor: theme }, styles.radioBtnViewInside]} /> : null}
                        </TouchableOpacity>
                        <Text style={{ fontSize: 18 }}>male</Text>
                    </View>
                    <View style={styles.radioBtnView}>
                        <TouchableOpacity
                            onPress={() => setGender('female')}
                            style={styles.radioBtn}>
                            {gender == 'female' ? <View style={[{ backgroundColor: theme }, styles.radioBtnViewInside]} /> : null}
                        </TouchableOpacity>
                        <Text style={{ fontSize: 18 }}>female</Text>
                    </View>
                    <View>

                    </View>
                </View>
                <Input
                    placeholder='address'
                    onChangeText={text => setAddress(text)}
                    inputContainerStyle={styles.inputStyle}
                    leftIcon={
                        <Icon
                            name='home'
                            size={20}
                            color='gray'
                            style={{ marginRight: 10 }}
                        />
                    }
                />
                <Input
                    placeholder='mm/dd/yyyy'
                    onChangeText={text => setBirthday(text)}
                    inputContainerStyle={styles.inputStyle}
                    leftIcon={
                        <Icon
                            name='calendar'
                            size={20}
                            color='gray'
                            style={{ marginRight: 10 }}
                        />
                    }
                    rightIcon={birthday == '' ? null : render_check(validateBirthday(birthday))}
                />
                <Input
                    placeholder='password'
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}
                    inputContainerStyle={styles.inputStyle}
                    leftIcon={
                        <Icon
                            name='lock-closed'
                            size={20}
                            color='gray'
                            style={{ marginRight: 10 }}
                        />
                    }
                    rightIcon={password == '' ? null : render_check(validatePassword(password))}
                />
                <Input
                    placeholder='confirm password'
                    secureTextEntry={true}
                    onChangeText={text => setConfirmPassword(text)}
                    inputContainerStyle={styles.inputStyle}
                    leftIcon={
                        <Icon
                            name='lock-closed'
                            size={20}
                            color='gray'
                            style={{ marginRight: 10 }}
                        />
                    }
                    rightIcon={confirmPassword == '' ? null : render_check(password != '' && password == confirmPassword)}
                />
                <TouchableOpacity
                    onPress={() => handle_register()}
                    style={[styles.registerStyle, { backgroundColor: theme }]}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Register</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default index

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerView: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center'
    },
    registerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: dimens.phone_width / 16,
    },
    titleStyle: {
        fontWeight: 'bold',
        fontSize: 30,
        marginBottom: 30
    },
    inputStyle: {
        height: 40,
        backgroundColor: 'white',
        paddingHorizontal: 10
    },
    genderView: {
        flexDirection: 'row',
        width: dimens.phone_width * 14 / 16 - 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 30
    },
    radioBtnView: {
        flexDirection: 'row',
    },
    radioBtn: {
        width: 20,
        height: 20,
        marginRight: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'black',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    radioBtnViewInside: {
        width: 12,
        height: 12,
        borderRadius: 6
    },
    registerStyle: {
        height: 40,
        width: dimens.phone_width * 14 / 16 - 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },

})
