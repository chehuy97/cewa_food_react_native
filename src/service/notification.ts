import { Platform } from 'react-native';
import PushNotification, { Importance } from 'react-native-push-notification'
import { IReminder } from '../reducers';

PushNotification.configure({
  // (required) Called when a remote or local notification is opened or received
  onNotification: function(notification) {
    console.log('LOCAL NOTIFICATION ==>', notification)
  },

  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios'
})


export const localNotification = () => {
  console.log('haha');
  
  PushNotification.localNotification({
    channelId: 'todo',
    autoCancel: true,
    bigText:
      'todo',
    subText: 'Local Notification',
    title: 'Local Notification Title',
    message: 'Expand me to see more',
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
    // actions: ["Yes", "No"]
  })
}

export const scheduledLocalNotification = (reminder:IReminder) => {
  
  PushNotification.localNotificationSchedule({
    id:reminder.reminder_id,
    autoCancel: true,
    bigText: reminder.note.content,
    subText: reminder.note.content,
    title: reminder.note.title,
    message: reminder.note.content,
    vibrate: true,
    vibration: 500,
    playSound: true,
    soundName: 'default',
    // actions: ["Yes", "No"],
    date: reminder.time
  })
}

export const deleteNotification = (id:number) => {
  PushNotification.cancelLocalNotifications({id: id+''})
}

export const updateNotification = (reminder:IReminder) => {
  PushNotification.cancelLocalNotifications({id: reminder.reminder_id+''})
  scheduledLocalNotification(reminder)
}

export const create_channel_notification = () => {
  PushNotification.createChannel(
    {
      channelId: "todo", // (required)
      channelName: "todo", // (required)
      channelDescription: "todo", // (optional) default: undefined.
      soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
      importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  );
}