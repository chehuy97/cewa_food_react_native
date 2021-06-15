import { RouteProp } from '@react-navigation/core'
import Icon from 'react-native-vector-icons/Ionicons'
import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native'
import { INote } from '../../DummyData'
import { RootStackParamList } from '../../routes/routes'
import colors from '../../utils/constants/colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getAppTheme, setAppTheme } from '../../utils/storage'
import { appTheme } from '../../utils/constants/storage'
import { goBack } from '../../routes/rootNavigation'


type noteRouteProp = RouteProp<RootStackParamList, 'Note'>

type noteProp = {
    route: noteRouteProp
}

const note = ({ route }: noteProp) => {
    const note: INote = route.params.note
    const [noteTheme, setNoteTheme] = useState(getAppTheme())
    const [title, setTitle] = useState(note.title)
    const [content, setContent] = useState(note.content)

    useEffect(() => {
        get_theme()
    }, [noteTheme])

    const get_theme = async () => {
        let color = await AsyncStorage.getItem(appTheme)
        if (color) {
            setNoteTheme(color)
        }
    }

    const set_theme_color = async (color: string) => {
        setNoteTheme(color)
        await AsyncStorage.setItem(appTheme, color)
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

    const render_button_theme = (color: string) => {
        return (
            <TouchableOpacity
                onPress={() => set_theme_color(color)}
                style={[styles.themeButtonView, { backgroundColor: color }]}>
                {noteTheme == color ? <Icon name='checkmark' size={25} color='white' /> : null}
            </TouchableOpacity>
        )
    }

    const render_header = () => {
        return (
            <View style={[styles.headerContainer, { backgroundColor: noteTheme }]}>
                <TouchableOpacity onPress={() => backAction()}>
                    <Icon name="chevron-back-outline" size={25} color="gray" />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => { }} style={styles.iconTailStyle}>
                        <Icon name="trash-outline" size={25} color="gray" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { }} style={styles.iconTailStyle}>
                        <Icon name="download-outline" size={25} color="gray" />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <View style={[styles.container, { backgroundColor: noteTheme }]}>
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
