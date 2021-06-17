import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Alert, BackHandler, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AppHeader from '../../components/appHeader'
import colors from '../../utils/constants/colors'
import { navigate } from '../../routes/rootNavigation'
import { fetch_all_notes } from '../../actions/noteAction'
import { useSelector, INote } from '../../reducers'
import { useDispatch } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'
import { SearchBar } from 'react-native-elements'

const Home = () => {
  const auth = useSelector(state => state.user.auth)
  const notes = useSelector(state => state.note.notes)
  var defaultNotes:INote[] = []
  const theme = useSelector(state => state.theme.themeColor)
  const dispatch = useDispatch()
  const isFocus = useIsFocused()
  const [search, setSearch] = useState('')
  const [searchNotes, setSearchNotes] = useState(defaultNotes)
  const [showSearch, setShownSearch] = useState(false)

  useEffect(() => {
    get_all_notes()
  }, [isFocus])

  const get_all_notes = async () => {
    await dispatch(fetch_all_notes(auth.id, auth.accessToken))
  }

  const show_search = () => {
    setShownSearch(!showSearch)
  }

  const handle_search = (searchValue:string) => {
    setSearch(searchValue)
    let tampNotes = notes.filter(item => item.title.includes(searchValue) || item.content.includes(searchValue))
    setSearchNotes(tampNotes)    
  }

  const render_note_item = (item: INote) => {
    return (
      <TouchableOpacity style={[styles.noteView, {backgroundColor:theme}]} onPress={() => navigate('Note', {
        note: item
      })}>
        <Text style={styles.textTitle}>{item.title}</Text>
        <Text style={styles.textContent}>{item.content.split("\n")[0]}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <AppHeader title="Home" callback={show_search} />
      <View>
        {showSearch ? <SearchBar
          platform='android'
          placeholder="Type Here..."
          onChangeText={text => handle_search(text)}
          value={search}
        /> : null}
        <FlatList
          data={showSearch ? searchNotes : notes}
          renderItem={({ item }) => render_note_item(item)}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={styles.btnAddStyle}>
        <TouchableOpacity onPress={() => navigate('Note', {
          note: {
            id: '',
            title: '',
            content: '',
            account_id: ''
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
    marginHorizontal: 5,
    marginTop:10,
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