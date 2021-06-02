import { RouteProp } from '@react-navigation/core'
import React, { Component, useEffect } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import { Header } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import { RootStackParamList } from '../../routes/Routes'
import { goBack } from '../../routes/rootNavigation'
import dimens from '../../constants/dimens'
import colors from '../../constants/colors'
import { Food } from '../../models/Food'
import { foods } from '../../DummyData'

type StoreRouteProp = RouteProp<RootStackParamList, 'Store'>

type StoreProp = {
    route: StoreRouteProp
}

const Store = ({ route }: StoreProp) => {

    const storeItem = route.params.storeItem
    const store_bar_icon = (imgName: string, iconName: string) => {
        return (
            <TouchableOpacity>
                <View style={styles.storeBarIconView}>
                    <Icon name={imgName} size={23} color="white" />
                    <Text style={styles.storeBarIconText}>{iconName}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const rating_icon = (data: number, name: string) => {
        return (
            <View style={styles.storeBarIconView}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{data}</Text>
                <Text style={{ color: 'gray', fontSize: 15 }}>{name}</Text>
            </View>
        )
    }

    const food_icon = (item: Food) => {
        return (
            <View style={styles.orderItemView}>
                <Image source={require('../../assets/images/foods/tra_sua.png')} style={{ width: 50, height: 50 }} />
                <View style={{ flex: 1, marginHorizontal: 10 }}>
                    <Text style={styles.textWeightOrder} numberOfLines={1}>{item.name}</Text>
                    <Text style={{ fontSize: 17, color: 'gray' }}>{item.price}</Text>
                </View>
                <Icon name="add-circle" size={40} color="#3689DF" />
            </View>
        )
    }

    return (
        <View style={{ backgroundColor: colors.bg_page }}>
            <Header
                statusBarProps={{ backgroundColor: 'red' }}
                containerStyle={styles.header}
                leftComponent={<Icon name="chevron-back-outline" size={25} color="white" onPress={() => goBack()} />}
                centerComponent={{ text: 'Store', style: { color: '#fff', fontSize: 20 } }}
                rightComponent={<Icon name="ellipsis-horizontal-sharp" size={25} color="white" />}
            />
            <View style={styles.storeBar}>
                {store_bar_icon('camera-outline', 'Photo')}
                {store_bar_icon('location-outline', 'Check-in')}
                {store_bar_icon('chatbubble-outline', 'Review')}
                {store_bar_icon('bookmark-outline', 'Saved')}
                {store_bar_icon('share-social-outline', 'Shared')}
            </View>
            <ScrollView style={{ marginBottom: dimens.phone_height*1/9+50}} showsVerticalScrollIndicator={false}>
                <View style={{ backgroundColor: 'white' }}>
                    <Image source={require('../../assets/images/foods/gong_cha.jpeg')} style={styles.imgStore} />
                    <View style={styles.infoView}>
                        <Text style={styles.textTitle}> {storeItem.name}</Text>
                    </View>
                    <View style={styles.infoViewShop}>
                        <View style={styles.iconShopView}>
                            <Icon name="home" size={18} color="gray" />
                        </View>
                        <Text style={{ color: 'gray', fontSize: 18 }}> 2 branches</Text>
                    </View>
                    <View style={styles.ratingView}>
                        {rating_icon(143, "Comment")}
                        {rating_icon(388, "Photos")}
                        {rating_icon(17, "Check-in")}
                        {rating_icon(120, "Saved")}
                        <View style={styles.ratingPointView}>
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>{storeItem.rating}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ backgroundColor: 'white', marginTop: 10 }}>
                    <View style={styles.orderItemView}>
                        <Text style={styles.textWeightOrder}>Top Orders</Text>
                    </View>
                    {/* <FlatList
                        data={foods}
                        renderItem={({ item }) => food_icon(item)}
                        keyExtractor={item => item._id} /> */}
                    <View style={[styles.orderItemView, { paddingVertical: 10, borderBottomWidth: 0 }]}>
                        <TouchableOpacity style={{ backgroundColor: "#D02128", flex: 1, height: 45, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={[styles.textWeightOrder, { color: 'white' }]}>Order</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default Store

const styles = StyleSheet.create({
    header: {
        height: dimens.phone_height*1/9,
        backgroundColor: 'red'
    },
    storeBar: {
        height: 50,
        backgroundColor: '#343434',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
        // position:'absolute',
        // top:100,
    },
    storeBarIconView: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    storeBarIconText: {
        color: 'white',
        fontSize: 13
    },
    imgStore: {
        width: dimens.phone_width,
        height: dimens.phone_height * 0.3
    },
    textTitle: {
        fontWeight: 'bold',
        fontSize: 25,
    },
    infoView: {
        height: 55,
        borderBottomWidth: 0.5,
        justifyContent: 'center',
        paddingLeft: 15
    },
    infoViewShop: {
        height: 55,
        borderBottomWidth: 0.5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15
    },
    iconShopView: {
        width: 25,
        height: 25,
        borderRadius: 12.5,
        backgroundColor: '#E0E0E0',
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ratingView: {
        height: 65,
        borderBottomWidth: 0.5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    ratingPointView: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#08AE25',
        alignItems: 'center',
        justifyContent: 'center'
    },
    orderItemView: {
        height: 65,
        borderBottomWidth: 0.5,
        paddingHorizontal: 10,
        alignItems: 'center',
        flexDirection: 'row'
    },
    textWeightOrder: {
        fontWeight: 'bold',
        fontSize: 20
    }

})
