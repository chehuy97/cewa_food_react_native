import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet, Alert, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AppHeader from '../../components/appHeader';
import colors from '../../utils/constants/colors';
import {navigate} from '../../routes/rootNavigation';
import {INote, IReminder, useSelector} from '../../reducers';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import { remove_appeared_reminder, add_reminder } from '../../actions';
import {scheduledLocalNotification} from '../../service/notification';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';

const index = () => {
  const auth = useSelector(state => state.user.auth);
  const reminders = useSelector(state => state.reminder.reminders);
  const isFocus = useIsFocused();
  const dispatch = useDispatch();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    console.log("reminder are "+reminders);
    
    console.log('REMINDER SCREEN');
    //get_all_notes();
    dispatch(remove_appeared_reminder(reminders));
  }, [reload]);

  // const get_all_notes = async () => {
  //   await dispatch(fetch_all_notes(auth.id, auth.accessToken));
  // };

  const open_local_folder = async () => {
    try {
      const res = await DocumentPicker.pick<'android'>({
        type: ['text/plain'],
      });
      const exportedFileContent = await RNFS.readFile(res.uri);
      console.log('Content are: ' + exportedFileContent);
      save_reminder_from_text(exportedFileContent);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  const save_reminder_from_text = async (chainString: string) => {
    try {
      let listObjects = chainString.split('\n');
      let listReminders = listObjects.filter(e => e != '');
      if (listReminders.length % 3 != 0) {
        throw 'wrong';
      } else {
        for (let i = 0; i < listReminders.length; i++) {
          if (i % 3 == 0) {
            let note: INote = {
              id: i + '',
              title: listReminders[i],
              content: listReminders[i + 1],
              color: colors.yellow_theme,
              account_id: auth.id,
            };
            let reminderDate = new Date(listReminders[i + 2]);
            if (reminderDate.toString() != 'Invalid Date') {
              let rmd_id =
                reminderDate.getDay() * 100000000 +
                reminderDate.getMonth() * 1000000 +
                reminderDate.getHours() * 10000 +
                reminderDate.getMinutes() * 100 +
                reminderDate.getSeconds() +
                i * 123;

              let reminder: IReminder = {
                reminder_id: rmd_id,
                note: note,
                time: reminderDate,
              };
              await dispatch(add_reminder(reminder));
              scheduledLocalNotification(reminder);
            } else {
              throw 'wrong';
            }
          }
        }
        setReload(!reload);
      }
    } catch (err) {
      Alert.alert('Error', 'Cannot parse reminders from text');
    }
  };

  const displayMinute = (minute: number): string => {
    if (minute < 10) {
      return '0' + minute;
    } else {
      return minute + '';
    }
  };

  const displayTime = (date: Date) => {
    let monthDate = date.getMonth() + 1;
    return (
      monthDate +
      '/' +
      date.getDate() +
      '/' +
      date.getFullYear() +
      ', ' +
      date.getHours() +
      ':' +
      displayMinute(date.getMinutes())
    );
  };

  const handle_create_reminder = () => {
    let nowDate = new Date();
    let id =
      nowDate.getDay() * 100000000 +
      nowDate.getMonth() * 1000000 +
      nowDate.getHours() * 10000 +
      nowDate.getMinutes() * 100 +
      nowDate.getSeconds();
    let newNote: INote = {
      id: id + '',
      title: '',
      content: '',
      color: colors.yellow_theme,
      account_id: auth.id,
    };
    navigate('Note', {
      reminder: {
        reminder_id: 123456,
        note: newNote,
        time: nowDate,
      },
    });
  };

  const render_note_item = (reminder: IReminder) => {
    let d: Date | null = null;
    if (typeof reminder.time == 'string') {
      d = new Date(reminder.time);
    }

    return (
      <View style={[styles.noteView, {backgroundColor: reminder.note.color}]}>
        <TouchableOpacity
          onPress={() =>
            navigate('Note', {
              reminder: reminder,
            })
          }>
          <Text style={styles.textTitle}>{reminder.note.title}</Text>
          <Text style={styles.textContent}>
            {reminder.note.content.split('\n')[0]}
          </Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', marginVertical: 10}}>
          <TouchableOpacity
            onPress={() =>
              navigate('DateTimePicker', {
                reminder: reminder,
              })
            }
            style={styles.timeView}>
            <Icon name="notifications-outline" size={18} color="black" />
            <Text style={{marginLeft: 5}}>
              {d != null ? displayTime(d) : displayTime(reminder.time)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <AppHeader
        title="Reminder"
        rightIcon="folder"
        callback={() => open_local_folder()}
      />
      <View style={{flex: 1, marginBottom:5}}>
        <FlatList
          data={reminders}
          renderItem={({item}) => render_note_item(item)}
          keyExtractor={item => item.reminder_id + ''}
        />
      </View>
      <View style={styles.btnAddStyle}>
        <TouchableOpacity onPress={() => handle_create_reminder()}>
          <Icon name="add-outline" size={50} color={colors.app_color} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default index;

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
    bottom: 30,
  },
  noteView: {
    height: 120,
    backgroundColor: '#ececec',
    margin: 5,
    borderRadius: 5,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  textTitle: {
    fontSize: 22,
  },
  textContent: {
    fontSize: 17,
    color: 'gray',
  },
  titleView: {
    flexDirection: 'row',
  },
  timeView: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#cccccc',
    flexDirection: 'row',
  },
});
