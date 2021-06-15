import React, { useEffect } from 'react'
import { Text, View, StyleSheet, Alert, BackHandler, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { Header } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AppHeader from '../../components/appHeader'
import colors from '../../utils/constants/colors'
import { notes, INote } from '../../DummyData'
import { Item } from 'native-base'
import { navigate } from '../../routes/rootNavigation'

const Home = () => {
  //useEffect(() => {
  //   const backHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     backAction
  //   );

  //   return () => backHandler.remove();
  // }, []);

  // const backAction = () => {
  //   console.log("back btn did tapped");

  //   Alert.alert("Hold on!", "Are you sure you want to go back?", [
  //     {
  //       text: "Cancel",
  //       onPress: () => null,
  //       style: "cancel"
  //     },
  //     { text: "YES", onPress: () => BackHandler.exitApp() }
  //   ]);
  //   return true;
  // };

  const render_note_item = (item: INote) => {
    return (
      <TouchableOpacity style={styles.noteView} onPress={() => navigate('Note', {
        note: item
      })}>
        <Text style={styles.textTitle}>{item.title}</Text>
        <Text style={styles.textContent}>{item.content.split("\n")[0]}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <AppHeader title="Home" />
      <View>
        <FlatList
          data={notes}
          renderItem={({ item }) => render_note_item(item)}
          keyExtractor={item => item.note_id}
        />
      </View>
      <View style={styles.btnAddStyle}>
        <TouchableOpacity onPress={() => navigate('Note', {
          note: {
            note_id: '',
            title: '',
            content: ''
          }
        })}>
          <Icon name="add-outline" size={50} color={colors.app_color} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnAddStyle: {
    backgroundColor: '#cccccc',
    width: 50,
    height: 50,
    borderRadius: 25,
    position: 'absolute',
    right: 30,
    bottom: 30
  },
  noteView: {
    height: 100,
    backgroundColor: "#ececec",
    margin: 5,
    borderRadius: 5,
    justifyContent: 'center',
    paddingLeft: 20
  },
  textTitle: {
    fontSize: 22,
  },
  textContent: {
    fontSize: 17,
    color: 'gray'
  },
  titleView: {
    flexDirection: 'row',
  }
})