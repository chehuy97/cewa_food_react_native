import React, { useEffect } from 'react'
import { Text, View, StyleSheet, Alert, BackHandler, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AppHeader from '../../components/appHeader'
import colors from '../../utils/constants/colors'
import { navigate } from '../../routes/rootNavigation'
import { IReminder, useSelector } from'../../reducers'
import { useIsFocused } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { remove_appeared_reminder } from '../../actions/noteAction'

const index = () => {

    const reminders = useSelector(state => state.note.noteReminders) 
    const isFocus = useIsFocused()
    const dispatch = useDispatch()

    useEffect(() => {
        console.log('triger reminder: '+reminders.length);
        dispatch(remove_appeared_reminder(reminders))
        
    },[isFocus])

    const displayMinute = (minute:number):string => {
        if(minute< 10) {
            return "0"+minute
        } else {
            return minute+""
        }
    }

    const displayTime = (date:Date) => {
        let monthDate = date.getMonth()+1
        return monthDate+'/'+date.getDate()+'/'+date.getFullYear()+', '+date.getHours()+':'+displayMinute(date.getMinutes())
    }

    const render_note_item = (reminder: IReminder) => {
        let d:Date | null = null
        if (typeof(reminder.time) == 'string'){
            d = new Date(reminder.time)
            console.log('d is '+d);
            
        }
        
        return (
            <View style={[styles.noteView, {backgroundColor: reminder.note.color}]}>
                <Text style={styles.textTitle}>{reminder.note.title}</Text>
                <Text style={styles.textContent}>{reminder.note.content.split("\n")[0]}</Text>
                <View style={{ flexDirection: 'row', marginVertical: 10}}>
                    <TouchableOpacity 
                        onPress={() => navigate('DateTimePicker',{
                            reminder: reminder
                        })}
                        style={styles.timeView}>
                        <Icon name='notifications-outline' size={18} color='black' />
                        <Text style={{marginLeft:5}}>{d != null ? displayTime(d): displayTime(reminder.time)}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <AppHeader title="Reminder" callback={() => {}}/>
            <View>
                <FlatList
                    data={reminders}
                    renderItem={({ item }) => render_note_item(item)}
                    keyExtractor={item => item.reminder_id+''}
                />
                {/* {render_note_item(reminders[1])} */}
            </View>
        </View>
    )
}

export default index

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
        height: 120,
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
    },
    timeView: {
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor:'#cccccc',
        flexDirection:'row'
    }
})
