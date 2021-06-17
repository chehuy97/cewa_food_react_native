import React, { useState } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Ionicons'
import { goBack } from '../../routes/rootNavigation'
import { useSelector } from '../../reducers'
import { useDispatch } from 'react-redux'
import { RouteProp } from '@react-navigation/core'
import { RootStackParamList } from '../../routes/routes'
import DateTimePickerModal from "react-native-modal-datetime-picker";

type routeProps = RouteProp<RootStackParamList, 'DateTimePicker'>

type dateTimePickerProp = {
    route: routeProps
}

type annroidMode = 'date' | 'time'

const index = ({ route }: dateTimePickerProp) => {

    const note_id = route.params.note_id
    let defaultDate = new Date()
    const theme = useSelector(state => state.theme.themeColor)
    const dispatch = useDispatch()
    const [month, setMonth] = useState(defaultDate.getMonth()+1)
    const [day, setDay] = useState(defaultDate.getDate())
    const [year, setYear] = useState(defaultDate.getFullYear())
    const [hour, setHour] = useState(defaultDate.getHours()+1)
    const [minute, setMinute] = useState("00")

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [mode,setMode] = useState('date')

    const showDatePicker = () => {
        setDatePickerVisibility(true);
        setMode('date')
    };

    const showTimePicker = () => {
        setDatePickerVisibility(true);
        setMode('time')
    }

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: Date) => {
        if(mode == 'date') {
            let realMonth = date.getMonth()+1
            setMonth(realMonth)
            setDay(date.getDate())
            setYear(date.getFullYear())
        } else {       
            setHour(date.getHours())
            setMinute(date.getMinutes()+'')
        }
        
        hideDatePicker();
    };

    const save_reminder = () => {
        console.log('save reminder');

    }

    const delete_reminder = () => {
        console.log('delete');

    }

    const render_header = () => {
        return (
            <View style={[styles.headerContainer, { backgroundColor: theme }]}>
                <TouchableOpacity onPress={() => goBack()}>
                    <Icon name='close' size={25} color='black' />
                </TouchableOpacity>
                <Text style={{ fontSize: 17 }}>Date Time Picker</Text>
                <TouchableOpacity onPress={() => save_reminder()}>
                    <Icon name='checkmark' size={25} color='black' />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {render_header()}
            <View style={{ flex: 1 }}>
                <TouchableOpacity
                    onPress={() => showDatePicker()}
                    style={styles.pickerContainer}>
                    <Text style={styles.pickeTitlerText}>Date</Text>
                    <Text>{month+'/'+day+"/"+year}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => showTimePicker()}
                    style={styles.pickerContainer}>
                    <Text style={styles.pickeTitlerText}>Time</Text>
                    <Text>{hour+":"+minute}</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode={mode as annroidMode}
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
            </View>
            <View
                style={styles.deleteContainer}>
                <TouchableOpacity onPress={() => delete_reminder()}>
                    <Text style={styles.deleteText}>DELETE</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        height: 60,
        marginBottom: 10
    },
    pickerContainer: {
        height: 70,
        backgroundColor: 'white',
        marginTop: 5,
        paddingLeft: 20,
        justifyContent: 'center'
    },
    pickeTitlerText: {
        fontSize: 17
    },
    deleteContainer: {
        height: 70,
        justifyContent: 'center',
        alignItems: 'center'
    },
    deleteText: {
        fontSize: 17,
        color: 'red'
    },
})
