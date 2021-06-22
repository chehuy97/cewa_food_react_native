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
import DocumentPicker from 'react-native-document-picker'
import RNFS from 'react-native-fs'
import { add_note } from '../../actions/noteAction'

const Home = () => {
  const auth = useSelector(state => state.user.auth)
  const notes = useSelector(state => state.note.notes)
  const [reload, setReload] = useState(false)
  var defaultNotes:INote[] = []
  const theme = colors.app_color
  const dispatch = useDispatch()
  const isFocus = useIsFocused()
  const [search, setSearch] = useState('')
  const [searchNotes, setSearchNotes] = useState(defaultNotes)
  const [showSearch, setShownSearch] = useState(false)

  useEffect(() => {
    get_all_notes()
  }, [isFocus, reload])

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

  const open_local_folder = async () => {
    console.log('kaka');
    
    try {
        const res = await DocumentPicker.pick<'android'>({
          type: ['text/plain'],
        });
        const exportedFileContent = await RNFS.readFile(res.uri)
        console.log('Content are: '+exportedFileContent);
        save_note_from_text(exportedFileContent)
        

      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          // User cancelled the picker, exit any dialogs or menus and move on
        } else {
          throw err;
        }
      }
}

    const save_note_from_text = (chainString:string) => {
        try{
           let listObjects = chainString.split('\n')
            let listContents = listObjects.filter(e => e != '')
           var listNotes:INote[] = []
           if (listContents.length %2 != 0) {
             throw 'wrong';           
           } else {
             for(let i=0;i<listContents.length;i++){
                if(i%2 == 0){
                  let note:INote = {
                    id:i+'',
                    title: listContents[i],
                    content:listContents[i+1],
                    color: colors.yellow_theme,
                    account_id:auth.id
                  }
                  dispatch(add_note(note, auth.accessToken))
                }
             }
             setReload(!reload)
           }
        } catch(err){
          Alert.alert('Error','Cannot parse notes from text')
        }
    }

  const render_note_item = (item: INote) => {
    return (
      <TouchableOpacity style={[styles.noteView, {backgroundColor:item.color}]} onPress={() => navigate('Note', {
        note: item
      })}>
        <Text style={styles.textTitle}>{item.title}</Text>
        <Text style={styles.textContent}>{item.content.split("\n")[0]}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <AppHeader title="Home" rightIcon='search'  callbackItemOne={open_local_folder} callbackItemTwo={show_search} />
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
        <TouchableOpacity>
          <Text></Text>
        </TouchableOpacity>
      </View>
      <View style={styles.btnAddStyle}>
        <TouchableOpacity onPress={() => navigate('Note', {
          note: {
            id: '',
            title: '',
            content: '',
            color: colors.yellow_theme,
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