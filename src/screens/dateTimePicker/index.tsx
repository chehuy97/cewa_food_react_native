import React, { useState } from 'react'
import { StyleSheet, Text, View, } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Ionicons'
import { goBack } from '../../routes/rootNavigation'
import { IReminder, useSelector } from '../../reducers'
import { useDispatch } from 'react-redux'
import { RouteProp } from '@react-navigation/core'
import { RootStackParamList } from '../../routes/routes'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { add_reminder, update_reminder, remove_reminder } from '../../actions/noteAction'
import { scheduledLocalNotification, updateNotification, deleteNotification } from '../../service/notification'
import colors from '../../utils/constants/colors'

type routeProps = RouteProp<RootStackParamList, 'DateTimePicker'>

type dateTimePickerProp = {
    route: routeProps
}

type annroidMode = 'date' | 'time'

const index = ({ route }: dateTimePickerProp) => {

    const note = route.params.note
    const reminder = route.params.reminder
    let defaultDate = new Date()
    const dispatch = useDispatch()
    const [month, setMonth] = useState(defaultDate.getMonth())
    const [day, setDay] = useState(defaultDate.getDate())
    const [year, setYear] = useState(defaultDate.getFullYear())
    const [hour, setHour] = useState(defaultDate.getHours() + 1)
    const [minute, setMinute] = useState(0)
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [mode, setMode] = useState('date')

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
        if (mode == 'date') {
            setMonth(date.getMonth())
            setDay(date.getDate())
            setYear(date.getFullYear())
        } else {
            setHour(date.getHours())
            setMinute(date.getMinutes())
        }

        hideDatePicker();
    };

    const save_reminder = () => {
        console.log('save reminder');
        let date = new Date(year, month, day, hour, minute)
        if (note != null) {
            let nowDate = new Date()
            let id = nowDate.getDay() * 100000000 + nowDate.getMonth() * 1000000 + nowDate.getHours() * 10000 + nowDate.getMinutes() * 100 + nowDate.getSeconds()
            console.log("ID reminder is " + id);
            let reminder: IReminder = {
                reminder_id: id,
                note: note,
                time: date
            }
            dispatch(add_reminder(reminder))
            scheduledLocalNotification(reminder)
            goBack()
        } else {
            let aReminder: IReminder = {
                reminder_id: reminder.reminder_id,
                note: reminder.note,
                time: date
            }
            dispatch(update_reminder(aReminder))
            updateNotification(aReminder)
            goBack()

        }
    }

    const delete_reminder = () => {
        console.log('delete');
        if (reminder != null ) {
            //delete
            deleteNotification(reminder.reminder_id)
            dispatch(remove_reminder(reminder))
        }      
        goBack()
    }

    const displayMinute = (): string => {
        if (minute < 10) {
            return "0" + minute
        } else {
            return minute + ""
        }
    }

    const displaymonth = () => {
        return month + 1
    }

    const render_header = () => {
        return (
            <View style={styles.headerContainer}>
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
                    <Text>{displaymonth() + '/' + day + "/" + year}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => showTimePicker()}
                    style={styles.pickerContainer}>
                    <Text style={styles.pickeTitlerText}>Time</Text>
                    <Text>{hour + ":" + displayMinute()}</Text>
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
        backgroundColor: colors.app_color,
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