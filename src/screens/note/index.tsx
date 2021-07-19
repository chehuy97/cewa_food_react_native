import {RouteProp} from '@react-navigation/core';
import Icon from 'react-native-vector-icons/Ionicons';
import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  Platform,
  Button,
} from 'react-native';
import {RootStackParamList} from '../../routes/routes';
import colors from '../../utils/constants/colors';
import {useSelector, INote, IReminder} from '../../reducers';
import {goBack, navigate} from '../../routes/rootNavigation';
import {setAppTheme} from '../../utils/storage';
import {useDispatch} from 'react-redux';
import {set_theme} from '../../actions/themeAction';
import {
  edit_one_note,
  add_note,
  remove_one_note,
  add_new_email_in_note,
  update_reminder,
} from '../../actions';
import Modal from 'react-native-modal';
import {Input} from 'react-native-elements';

type noteRouteProp = RouteProp<RootStackParamList, 'Note'>;

type noteProp = {
  route: noteRouteProp;
};

const note = ({route}: noteProp) => {
  const dispatch = useDispatch();
  const note: INote =
    route.params.note == null ? route.params.reminder.note : route.params.note;
  const reminder: IReminder = route.params.reminder;
  const [theme, setTheme] = useState(note.color);
  const auth = useSelector(state => state.user.auth);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [modalVisible, setModalVisible] = useState(false);
  const [addEmail, setAddEmail] = useState('');

  const set_theme_color = (color: string) => {
    setTheme(color);
  };

  const backAction = () => {
    if (title != note.title || content != note.content || theme != note.color) {
      Alert.alert(
        'Alert',
        'It can be not save.Are you sure you want to go back?',
        [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'YES', onPress: () => goBack()},
        ],
      );
    } else {
      goBack();
    }
  };

  const handle_save_note = async (is_set_reminder = false) => {
    if (title == note.title && content == note.content && theme == note.color) {
      if (is_set_reminder == false) {
        goBack();
      }
    } else {
      let aNote: INote = {
        id: note.id,
        title: title,
        content: content,
        color: theme,
        account_id: auth.id,
      };
      if (note.title == '' && note.content == '') {
        //add new note
        if (reminder == null) {
          await dispatch(add_note(aNote, auth.accessToken));
          goBack();
        } else {
          set_reminder_time();
        }
      } else {
        //edit note
        if (reminder == null) {
          await dispatch(edit_one_note(aNote, auth.accessToken));
        } else {
          let aReminder: IReminder = {
            reminder_id: reminder.reminder_id,
            note: aNote,
            time: reminder.time,
          };
          dispatch(update_reminder(aReminder));
        }
        goBack();
      }
    }
  };

  const handle_remove_note = async () => {
    await dispatch(remove_one_note(note.id, auth.accessToken));
    goBack();
  };

  const set_reminder_time = () => {
    let aNote: INote = {
      id: note.id,
      title: title,
      content: content,
      color: theme,
      account_id: note.account_id,
    };

    if (reminder == null) {
      handle_save_note(true);
    }

    navigate('DateTimePicker', {
      note: aNote,
    });
  };

  const handle_add_email = async () => {
    let noteId = note.id;
    let token = auth.accessToken;
    await dispatch(
      add_new_email_in_note(
        addEmail,
        noteId,
        token,
        handle_add_new_user_success
      ),
    );
  };

  const handle_add_new_user_success = () => {
    setModalVisible(false)
    goBack()
  };

  const render_button_theme = (color: string) => {
    return (
      <TouchableOpacity
        onPress={() => set_theme_color(color)}
        style={[styles.themeButtonView, {backgroundColor: color}]}>
        {theme == color ? (
          <Icon name="checkmark" size={25} color="white" />
        ) : null}
      </TouchableOpacity>
    );
  };

  const render_header = () => {
    return (
      <View style={[styles.headerContainer, {backgroundColor: theme}]}>
        <TouchableOpacity onPress={() => backAction()}>
          <Icon name="chevron-back-outline" size={25} color="gray" />
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          {reminder == null ? (
            <TouchableOpacity
              onPress={() => {
                handle_remove_note();
              }}
              style={styles.iconTailStyle}>
              <Icon name="trash-outline" size={25} color="gray" />
            </TouchableOpacity>
          ) : null}
          {reminder == null ? (
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={styles.iconTailStyle}>
              <Icon name="add-circle-outline" size={25} color="gray" />
            </TouchableOpacity>
          ) : null}
          {reminder == null ? (
            <TouchableOpacity
              onPress={() => {
                set_reminder_time();
              }}
              style={styles.iconTailStyle}>
              <Icon name="notifications-outline" size={25} color="gray" />
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            onPress={() => {
              handle_save_note();
            }}
            style={styles.iconTailStyle}>
            <Icon name="download-outline" size={25} color="gray" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, {backgroundColor: theme}]}>
      <Modal isVisible={modalVisible}>
        <View style={styles.modalView}>
          <View style={styles.modalViewContent}>
            <Text style={styles.modalTitle}>Type email you want to add: </Text>
            <Input
              onChangeText={text => setAddEmail(text)}
              placeholder="Email"
            />
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <TouchableOpacity onPress={() => handle_add_email()}>
                <Text style={styles.modalBtn}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.modalBtn}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {render_header()}
      <ScrollView style={{paddingHorizontal: 10, flex: 1}}>
        <TextInput
          multiline={true}
          placeholder="title"
          defaultValue={note ? note.title : ''}
          onChangeText={text => setTitle(text)}
          style={styles.titleInput}
        />
        <TextInput
          multiline={true}
          placeholder="content"
          defaultValue={note ? note.content : ''}
          onChangeText={text => setContent(text)}
          style={styles.contentInput}
        />
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
  );
};

export default note;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  titleInput: {
    fontSize: 22,
  },
  contentInput: {
    fontSize: 17,
  },
  themeButtonView: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerView: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  headerContainer: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  iconTailStyle: {
    marginHorizontal: 10,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  modalViewContent: {
    flex: 1,
    marginHorizontal: 30,
    marginBottom: 50,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  modalTitle: {
    fontSize: 17,
    margin: 10,
  },
  modalBtn: {
    margin: 10,
    fontWeight: 'bold',
    fontSize: 17,
  },
});
