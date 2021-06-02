import React, { Component } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CustomHeader from '../../components/customheader'
import colors from '../../constants/colors'
import dimens from '../../constants/dimens'
import Icon from 'react-native-vector-icons/Ionicons'

const Account = () => {

    const render_avatar = () => {
        return (
            <View style={styles.avatarView}>
                <Image source={require('../../assets/images/avatar.png')} style={styles.avatarImg} />
                <TouchableOpacity>
                    <Text style={styles.avatarFont}>Profile</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const render_item_account = (name: string, iconName: string, iconColor: string) => {
        return (
            <TouchableOpacity>
                <View style={styles.itemView}>
                    <View style={[styles.iconImgView, { backgroundColor: iconColor, }]}>
                        <Icon name={iconName} color='white' size={18} />
                    </View>
                    <Text style={styles.iconNameText}>{name}</Text>
                    <Icon name="chevron-forward-outline" color='black' size={20} />
                </View>
            </TouchableOpacity>
        )
    }

    const render_logout = () => {
        return (
            <TouchableOpacity>
                <View style={[styles.itemView]}>
                    <Text style={styles.logoutText}>Logout</Text>
                </View>
            </TouchableOpacity>
        )
    }


    return (
        <View style={styles.container}>
            <CustomHeader />
            {render_avatar()}
            <View style={styles.blockItemView}>
                {render_item_account("Voucher", "pricetag-outline", colors.account_blue)}
            </View>
            <View style={styles.blockItemView}>
                {render_item_account("Payment", "pricetag-outline", colors.account_blue)}
                {render_item_account("Orders History", "pricetag-outline", colors.account_blue)}
                {render_item_account("Invoice", "pricetag-outline", colors.account_blue)}
                {render_item_account("Reward Credits", "pricetag-outline", colors.account_blue)}
                {render_item_account("For Shop Owners", "pricetag-outline", colors.account_dark_blue)}
            </View>
            <View style={styles.blockItemView}>
                {render_item_account("Invite Friends", "pricetag-outline", colors.account_green)}
                {render_item_account("Feedback", "pricetag-outline", colors.account_green)}
            </View>
            <View style={styles.blockItemView}>
                {render_item_account("User Policy", "pricetag-outline", colors.account_gray)}
                {render_item_account("Settings", "pricetag-outline", colors.account_gray)}
            </View>
            <View style={styles.blockItemView}>
                {render_logout()}
            </View>


        </View>
    )
}

export default Account


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bg_page
    },
    avatarView: {
        height: 60,
        backgroundColor: 'black',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginVertical:5
    },
    avatarImg: {
        width: 38,
        height: 38,
        borderRadius: 19,
        borderWidth: 1,
        borderColor: 'white'
    },
    avatarFont: {
        fontSize: dimens.normal_size,
        color: colors.bg_page
    },
    itemView: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center'
    },
    blockItemView: {
        marginVertical: 5,
        backgroundColor: 'white',
        paddingHorizontal: 12
    },
    iconImgView: {
        width: 26,
        height: 26,
        borderRadius: 13,
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconNameText: {
        flex: 1,
        fontSize: dimens.normal_size,
        marginHorizontal: 15
    },
    logoutText:{
        fontSize:dimens.normal_size,
        color:'red'
    },
})
