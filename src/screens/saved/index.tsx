import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import CustomHeader from '../../components/customheader'
import colors from '../../utils/constants/colors'
import dimens from '../../utils/constants/dimens'

const Saved = () => {

    const render_store_save = () => {
        return (
            <View style={styles.itemStoreView}>
                <Image source={require('../../assets/images/foods/gong_cha.jpeg')} style={styles.itemStoreImg} />
                <View style={{justifyContent:'center'}}>
                    <Text style={styles.itemStoreTitle} numberOfLines={1}>Tra sua Gong Cha</Text>
                    <Text style={styles.itemStoreAddress}>132 Nguyen Van Thoai</Text>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <CustomHeader/>
            {render_store_save()}
        </View>
    )
}

export default Saved

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.bg_page
    },
    itemStoreView:{
        height:140,
        flexDirection:'row',
        backgroundColor:'white',
        alignItems:'center',
        borderBottomWidth:0.5
    },
    itemStoreImg:{
        width:120,
        height:120,
        marginHorizontal:10
    },
    itemStoreTitle:{
        fontSize:dimens.medium_size,
        fontWeight:'bold'
    },
    itemStoreAddress:{
        fontSize:dimens.normal_size,
        color:'gray'
    }

})
