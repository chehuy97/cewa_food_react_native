import * as React from 'react';
import { Text, View, StyleSheet, StatusBar, Platform } from 'react-native';
import { SearchBar } from 'react-native-elements';
import dimens from '../../constants/Dimens'

const HomeSearchBar = () => {
  const [searchValue, setSearchValue] = React.useState('')
  
  const set_platform = () => {
    switch(Platform.OS){
      case "ios":
        return "ios"
      case "android":
        return "android" 
      default:
        return "default"
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="red" />
      <SearchBar
        platform="ios"
        placeholder="Tìm kiếm món ăn, địa chỉ, ..."
        onChangeText={text => { setSearchValue(text) }}
        value={searchValue}
        containerStyle={styles.containerSearchBar}
        inputStyle={styles.inputSearchBar}
      />
      <View style={styles.cityModal}>
        <Text>Đà Nẵng</Text>
      </View>
    </View>
  );
};

export default HomeSearchBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    flexWrap: 'wrap',
    height: 55,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row'
  },
  containerSearchBar: {
    flex: 3,
    height:35,
    justifyContent: 'center',
    borderBottomLeftRadius: 3,
    borderTopLeftRadius: 3,
  },
  inputSearchBar: {
    fontSize: dimens.small_size
  },
  cityModal: {
    flex: 1,
    width: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
  }
});

