import { RouteProp } from '@react-navigation/core'
import Icon from 'react-native-vector-icons/Ionicons'
import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, Platform, Button } from 'react-native'
import { RootStackParamList } from '../../routes/routes'
import colors from '../../utils/constants/colors'
import { useSelector, INote } from '../../reducers'
import { goBack } from '../../routes/rootNavigation'
import { setAppTheme } from '../../utils/storage'
import { useDispatch } from 'react-redux'
import { set_theme } from '../../actions/themeAction'
import { edit_one_note, add_note, remove_one_note } from '../../actions/noteAction'


type noteRouteProp = RouteProp<RootStackParamList, 'Note'>

type noteProp = {
    route: noteRouteProp
}

const note = ({ route }: noteProp) => {

    const dispatch = useDispatch()
    const note: INote = route.params.note
    const theme = useSelector(state => state.theme.themeColor)
    const auth = useSelector(state => state.user.auth)
    const [title, setTitle] = useState(note.title)
    const [content, setContent] = useState(note.content)

    const set_theme_color = async (color: string) => {
        await setAppTheme(color)
        dispatch(set_theme(color))
    }

    const backAction = () => {
        if (title != note.title || content != note.content) {
            Alert.alert("Alert", "It can be not save.Are you sure you want to go back?", [
                {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "YES", onPress: () => goBack() }
            ]);
        } else {
            goBack()
        }
    };

    const handle_save_note = async () => {
        if (title == note.title && content == note.content) {
            goBack()
        } else {
            let aNote:INote ={ 
                id:note.id,
                title:title,
                content:content,
                account_id:auth.id
            }
            if(note.title == '' && note.content == ''){
                //add new note
                console.log('add note');
                await dispatch(add_note(aNote,auth.accessToken))
                goBack()
            } else {
                //edit note
                console.log('edit note');
                await dispatch(edit_one_note(aNote, auth.accessToken))
                goBack()
                
            }
        }
    }

    const handle_remove_note = async () => {
        await dispatch(remove_one_note(note.id, auth.accessToken))
        goBack()
    }

    const set_reminder = () => {
        console.log('set reminder');

    }

    const render_button_theme = (color: string) => {
        return (
            <TouchableOpacity
                onPress={() => set_theme_color(color)}
                style={[styles.themeButtonView, { backgroundColor: color }]}>
                {theme == color ? <Icon name='checkmark' size={25} color='white' /> : null}
            </TouchableOpacity>
        )
    }

    const render_header = () => {
        return (
            <View style={[styles.headerContainer, { backgroundColor: theme }]}>
                <TouchableOpacity onPress={() => backAction()}>
                    <Icon name="chevron-back-outline" size={25} color="gray" />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => { handle_remove_note() }} style={styles.iconTailStyle}>
                        <Icon name="trash-outline" size={25} color="gray" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { set_reminder() }} style={styles.iconTailStyle}>
                        <Icon name="notifications-outline" size={25} color="gray" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { handle_save_note() }} style={styles.iconTailStyle}>
                        <Icon name="download-outline" size={25} color="gray" />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <View style={[styles.container, { backgroundColor: theme }]}>
            {render_header()}
            <ScrollView style={{ paddingHorizontal: 10, flex: 1 }}>
                <TextInput
                    multiline={true}
                    placeholder='title'
                    defaultValue={note ? note.title : ''}
                    onChangeText={text => setTitle(text)}
                    style={styles.titleInput} />
                <TextInput
                    multiline={true}
                    placeholder='content'
                    defaultValue={note ? note.content : ''}
                    onChangeText={text => setContent(text)}
                    style={styles.contentInput} />
            </ScrollView>
            <View style={styles.footerView}>
                {render_button_theme(colors.yellow_theme)}
                {render_button_theme(colors.red_theme)}
                {render_button_theme(colors.gray_theme)}
                {render_button_theme(colors.green_theme)}
                {render_button_theme(colors.blue_theme)}
                {render_button_theme(colors.purple_theme)}
                {render_button_theme(colors.pink_theme)}
                {render_button_theme(colors.brown_theme)}
            </View>
        </View>
    )
}

export default note

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    titleInput: {
        fontSize: 22,
    },
    contentInput: {
        fontSize: 17
    },
    themeButtonView: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    footerView: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    headerContainer: {
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        justifyContent: 'space-between'
    },
    iconTailStyle: {
        marginHorizontal: 10
    }
})
