import { RouteProp } from '@react-navigation/core'
import Icon from 'react-native-vector-icons/Ionicons'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import NoteHeader from '../../components/noteHeader'
import { INote, notes } from '../../DummyData'
import { RootStackParamList } from '../../routes/routes'
import colors from '../../utils/constants/colors'
import { goBack } from '../../routes/rootNavigation'

type editRouteProp = RouteProp<RootStackParamList, 'EditNote'>

type editNoteProp = {
    route: editRouteProp
}

const editNote = ({ route }: editNoteProp) => {
    const note: INote = route.params.note
    const [noteTheme, setNoteTheme] = useState(colors.yellow_theme)

    const render_button_theme = (color: string) => {
        return (
            <TouchableOpacity
                onPress={() => setNoteTheme(color)}
                style={[styles.themeButtonView, { backgroundColor: color }]}>
                {noteTheme == color ? <Icon name='checkmark' size={25} color='white' />:null}
            </TouchableOpacity>
        )
    }

    return (
        <View style={[styles.container, { backgroundColor: noteTheme }]}>
            <NoteHeader color={noteTheme} />
            <ScrollView style={{ paddingHorizontal: 10, flex: 1 }}>
                <TextInput
                    multiline={true}
                    placeholder='title'
                    defaultValue={note? note.title : ''}
                    style={styles.titleInput} />
                <TextInput
                    multiline={true}
                    placeholder='content'
                    defaultValue={note ? note.content : ''}
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

export default editNote

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
        alignItems:'center',
        justifyContent:'center'
    },
    footerView: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
})
