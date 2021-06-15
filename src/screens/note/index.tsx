import { RouteProp } from '@react-navigation/core'
import Icon from 'react-native-vector-icons/Ionicons'
import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, Platform, Button } from 'react-native'
import { INote } from '../../DummyData'
import { RootStackParamList } from '../../routes/routes'
import colors from '../../utils/constants/colors'
import { useSelector } from '../../reducers'
import { goBack } from '../../routes/rootNavigation'
import { setAppTheme } from '../../utils/storage'
import { useDispatch } from 'react-redux'
import { set_theme } from '../../actions/themeAction'
import DateTimePicker from '@react-native-community/datetimepicker';


type noteRouteProp = RouteProp<RootStackParamList, 'Note'>

type noteProp = {
    route: noteRouteProp
}

type AndroidMode = 'date' | 'time';

const note = ({ route }: noteProp) => {
    const dispatch = useDispatch()
    //const modeDate:AndroidMode = 'date'
    const note: INote = route.params.note
    const theme = useSelector(state => state.theme.themeColor)
    const [title, setTitle] = useState(note.title)
    const [content, setContent] = useState(note.content)
    // const [date, setDate] = useState(new Date(1598051730000));
    // const [mode, setMode]= useState(modeDate);
    // const [show, setShow] = useState(false);

    const fakeDate = new Date(2020, 5, 15, 17, 0, 0, 0);

    // const onChange = (event: Event, selectedDate: Date) => {
    //     const currentDate = selectedDate || date;
    //     setShow(Platform.OS === 'ios');
    //     setDate(currentDate);
    // };

    // const showMode = (currentMode: AndroidMode) => {
    //     setShow(true);
    //     setMode(currentMode);
    // };

    // const showDatepicker = () => {
    //     showMode('date');
    // };

    // const showTimepicker = () => {
    //     showMode('time');
    // };

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

    const set_reminder = () => {
        
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
                    <TouchableOpacity onPress={() => { }} style={styles.iconTailStyle}>
                        <Icon name="trash-outline" size={25} color="gray" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { set_reminder()}} style={styles.iconTailStyle}>
                        <Icon name="notifications-outline" size={25} color="gray" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { }} style={styles.iconTailStyle}>
                        <Icon name="download-outline" size={25} color="gray" />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <View style={[styles.container, { backgroundColor: theme }]}>
            {render_header()}
            {/* <View>
                <View>
                    <Button onPress={showDatepicker} title="Show date picker!" />
                </View>
                <View>
                    <Button onPress={showTimepicker} title="Show time picker!" />
                </View>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={() => onchange}
                    />
                )}
            </View> */}
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
