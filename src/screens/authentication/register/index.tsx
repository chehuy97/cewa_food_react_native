import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { useSelector} from '../../../reducers'
import { Input } from 'react-native-elements'
import colors from '../../../utils/constants/colors'
import dimens from '../../../utils/constants/dimens'

const register = () => {
    const theme = useSelector(state => state.theme.themeColor)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')



    return (
        <View style={styles.container}>
            <View style={styles.headerView}>
                <Icon name='chevron-back-outline' size={25} color='black'/>
            </View>
            <View style={styles.registerContainer}>
                <Text style={[styles.titleStyle,{color: theme}]}>Register</Text>
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
                    placeholder='name'
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
                    placeholder='address'
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
                    placeholder='birthday'
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
            </View>    
        </View>
    )
}

export default register

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    headerView: {
        height: 50,
        flexDirection:'row',
        alignItems:'center'
    },
    registerContainer: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal: dimens.phone_width / 16,
    },
    titleStyle: {
        fontWeight: 'bold',
        fontSize: 30,
        marginBottom: 50
    },
    inputStyle: {
        height: 40,
        backgroundColor: 'white',
        paddingHorizontal: 10
    },
})
