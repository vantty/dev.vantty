import { SEND_EMAIL_HELP_CENTER_SUCCESS } from './types';
import { server } from '../utils/axios';
import setAlert from './alert';

export const sendEmail = problem => async dispatch => {
  try {
    await server.post('/user/help', problem);
    await dispatch({
      type: SEND_EMAIL_HELP_CENTER_SUCCESS,
      payload: true
    });
    await dispatch(setAlert('Email sent successfully', 'success'));
  } catch (error) {
    console.log(error);
  }
};

export const adminEmail = data => async dispatch => {
  try {
    await server.post('/user/admin-email', data);
  } catch (error) {
    console.log(error);
  }
};
