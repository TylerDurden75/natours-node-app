/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';

export const signup = async (name, email, password, passwordConfirm) => {
  try {
    await axios({
      method: 'POST',
      url: '/api/v1/users/signup',
      data: {
        name,
        email,
        password,
        passwordConfirm,
      },
    });

    // if (res.data.status === 'success') {
    showAlert(
      'success',
      'Account created successfully! Please check your email to verify it.'
    );
    window.setTimeout(() => {
      location.assign('/');
    }, 1500);
    // }
  } catch (err) {
    showAlert('error', err.response.data.message);
    console.log(err.response.data.message);
  }
};
