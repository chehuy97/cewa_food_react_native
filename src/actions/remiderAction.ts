import {reminderAction} from './../reducers/reminderReducer';
import {
  reminderActionTypes,
  IReminder,
  ActionReminderSuccess,
  reminderDetail,
  reminderList,
} from '../reducers/reminderReducer';
// import {ThunkAction, ThunkDispatch} from 'redux-thunk';

// export const test_add_reminder = (
//   reminder: IReminder,
// ): ThunkAction<void, {}, {}, reminderAction> => {
//   return (dispatch: ThunkDispatch<{}, {}, reminderAction>) => {
//     return {
//       type: reminderActionTypes.ADD_REMINDER,
//       payload: {
//         reminder: reminder,
//       },
//     };
//   };
// };

export const add_reminder = (reminder:IReminder): ActionReminderSuccess<reminderDetail> => {
    return {
        type: reminderActionTypes.ADD_REMINDER,
        payload: {
            reminder: reminder
        }
    }
}

export const remove_appeared_reminder = (
  reminders: IReminder[],
): ActionReminderSuccess<reminderList> => {
  let now = new Date();
  let newReminders = reminders.filter(
    r => new Date(r.time).getTime() >= now.getTime(),
  );
  return {
    type: reminderActionTypes.REMOVE_APPEARED_REMINDER,
    payload: {
      reminders: newReminders,
    },
  };
};

export const remove_reminder = (
  reminder: IReminder,
): ActionReminderSuccess<reminderDetail> => {
  return {
    type: reminderActionTypes.REMOVE_REMINDER,
    payload: {
      reminder: reminder,
    },
  };
};
export const update_reminder = (
  reminder: IReminder,
): ActionReminderSuccess<reminderDetail> => {
  return {
    type: reminderActionTypes.UPDATE_REMINDER,
    payload: {
      reminder: reminder,
    },
  };
};

export const remove_all_notes = (): ActionReminderSuccess<string> => {
  return {
    type: reminderActionTypes.REMINDER_REMOVE_ALL,
    payload: 'remove all',
  };
};
