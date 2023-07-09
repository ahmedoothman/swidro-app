import axios from 'axios';
import Cookies from 'js-cookie';
import store from '../store';
// import FormData from 'form-data';

let api_url = store.getState().auth.api_url;
let token = Cookies.get('token');

/***********************************************/
/************** update userData ***************/
/**********************************************/

export const updateUserDataService = async (data) => {
  token = Cookies.get('token');
  let formData = new FormData();
  formData.append('userName', data.userName);
  formData.append('email', data.email);
  try {
    const response = await axios.patch(`${api_url}/api/users/updateMe`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { status: 'success', data: response.data.data.user };
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      return {
        status: 'error',
        statusCode: error.code,
        message: error.message + ' Please check your internet connection',
      };
    } else {
      return {
        status: 'error',
        statusCode: error.response.statusCode,
        message: error.response.data.message,
      };
    }
  }
};

/***********************************************/
/************** update user password ***********/
/**********************************************/

export const updateUserPasswordService = async (data) => {
  token = Cookies.get('token');
  try {
    const response = await axios.patch(
      `${api_url}/api/users/updateMyPassword`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { status: 'success', data: response.data };
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      return {
        status: 'error',
        statusCode: error.code,
        message: error.message + ' Please check your internet connection',
      };
    } else {
      return {
        status: 'error',
        statusCode: error.response.statusCode,
        message: error.response.data.message,
      };
    }
  }
};
