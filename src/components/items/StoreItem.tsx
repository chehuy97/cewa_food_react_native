import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import dimens from '../../constants/Dimens'
import Icon from 'react-native-vector-icons/Ionicons'
import { Food } from '../../DummyData'

export interface StoreProps {
  data: Food,
  callBack: () => any
}

const StoreItem = ({ data, callBack }: StoreProps) => {

  const is_oustanding_store = (rating: Number) => {
    if (rating >= 4.5) {
      return true
    } else {
      return false
    }
  }

  return (
    <TouchableOpacity 
    onPress={() => callBack()}>
      <View style={styles.container}>
        <Image source={require('../../assets/images/foods/mi_quang.jpg')} style={styles.imageFood} />
        <View style={styles.containerInfo}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {is_oustanding_store(data.rating) ? <Icon name='star-sharp' size={20} color="#ECCE00" style={{ marginRight: 5 }} /> : null}
            <Text style={styles.textTitle} numberOfLines={1}>{data.name}</Text>
          </View>
          <Text style={styles.textAddress} numberOfLines={1}>{data.address}</Text>
          <View style={styles.containerTag}>
            <Icon name="pricetag-sharp" size={19} color="red" />
            <Text style={styles.tagName}>{data.type}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default StoreItem;

const styles = StyleSheet.create({
  container: {
    width: dimens.phone_width * 0.46,
    height: dimens.phone_height * 0.3,
    flexDirection: 'column',
    backgroundColor: 'white',
    marginHorizontal: dimens.phone_width * 0.02,
    marginTop: 15,
  },
  imageFood: {
    width: dimens.phone_width * 0.46,
    height: dimens.phone_width * 0.32,
  },
  containerInfo: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 10
  },
  textTitle: {
    width: dimens.phone_width * 0.32,
    fontSize: dimens.medium_size,
    fontWeight: 'bold',
    marginTop: 7,
  },
  textAddress: {
    width: dimens.phone_width * 0.4,
    fontSize: dimens.normal_size,
    marginTop: 7
  },
  containerTag: {
    flexDirection: 'row',
    marginTop: 7,
    alignItems: 'center'
  },
  tagName: {
    marginLeft: 7,
    fontSize: dimens.normal_size,
    color: 'red',
    fontWeight: 'bold'
  }

});
