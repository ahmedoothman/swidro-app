import axios from 'axios';
import Cookies from 'js-cookie';
import store from '../store';
// import FormData from 'form-data';

let api_url = store.getState().auth.api_url;
let token = Cookies.get('token');

/* ******************************************** */
/* ************* get devices data ****************/
/* ****************************************** */
export const getDevicesDataServices = async () => {
  token = Cookies.get('token');
  try {
    const response = await axios.get(`${api_url}/api/devices/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { status: 'success', dataArray: response.data.data };
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
/* ******************************************** */
/* *************** add data ********************/
/* ****************************************** */
export const addDevicesDataServices = async (data) => {
  try {
    const response = await axios.post(`${api_url}/api/devices/`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { status: 'success', data: response.data.data };
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
/* *************************************************/
/* ************* delete devices data ****************/
/* *************************************************/
export const deleteDevicesDataServices = async (id) => {
  try {
    const response = await axios.delete(`${api_url}/api/devices/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { status: 'success' };
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
/* *************************************************/
/* ************* edit devices data *****************/
/* *************************************************/
export const editDevicesDataServices = async (id, data) => {
  try {
    const response = await axios.patch(`${api_url}/api/devices/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { status: 'success', data: response.data.data.data };
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
