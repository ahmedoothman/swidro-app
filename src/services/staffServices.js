import axios from 'axios';
import Cookies from 'js-cookie';
import store from '../store';
// import FormData from 'form-data';

let api_url = store.getState().auth.api_url;
let token = Cookies.get('token');

/* ******************************************** */
/* ************* get staff data ****************/
/* ****************************************** */
export const getStaffDataServices = async () => {
  try {
    const response = await axios.get(`${api_url}/api/staff/allStaff`, {
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
export const addStaffDataServices = async (data) => {
  try {
    const response = await axios.post(`${api_url}/api/staff/addStaff`, data, {
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
/* ************* delete staff data ****************/
/* *************************************************/
export const deleteStaffDataServices = async (id) => {
  try {
    const response = await axios.delete(`${api_url}/api/staff/${id}`, {
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
/* ************* edit staff data *******************/
/* *************************************************/
export const editStaffDataServices = async (id, data) => {
  try {
    const response = await axios.patch(`${api_url}/api/staff/${id}`, data, {
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
