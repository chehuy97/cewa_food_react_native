import * as React from 'react';
import { Text, View, StyleSheet, StatusBar, Platform } from 'react-native';
import { SearchBar } from 'react-native-elements';
import dimens from '../../utils/constants/dimens'

export interface HomeSearchBarProps {
  callBack: (value:string) => void
}

const HomeSearchBar = ({callBack}:HomeSearchBarProps) => {
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
      <View style={styles.searchView}>
      <SearchBar
        platform="ios"
        placeholder="Find places, item, address..."
        onChangeText={text => { 
          setSearchValue(text) 
          callBack(text) }}
        value={searchValue}
        containerStyle={styles.containerSearchBar}
        inputStyle={styles.inputSearchBar}
      />
      <View style={styles.cityModal}>
        <Text>Đà Nẵng</Text>
      </View>
      </View>
    </View>
  );
};

export default HomeSearchBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    flexWrap: 'wrap',
    height: dimens.phone_height*1/9,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'column',
    justifyContent:'flex-end'
  },
  containerSearchBar: {
    flex: 3.5,
    height:35,
    backgroundColor:'red',
    justifyContent: 'center',
    borderBottomLeftRadius: 3,
    borderTopLeftRadius: 3,
  },
  inputSearchBar: {
    fontSize: dimens.small_size,

  },
  cityModal: {
    flex: 1,
    width: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
  },
  searchView:{
    flexDirection:'row'
  }
});

