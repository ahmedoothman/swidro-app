import axios from 'axios';
import Cookies from 'js-cookie';
import store from '../store';
// import FormData from 'form-data';

let api_url = store.getState().auth.api_url;
let token = Cookies.get('token');

/* ******************************************** */
/* ************* get Amenities data ****************/
/* ****************************************** */
export const getAmenitiesDataServices = async () => {
  token = Cookies.get('token');
  try {
    const response = await axios.get(`${api_url}/api/amenities/`, {
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
export const addAmenitiesDataServices = async (data) => {
  try {
    const response = await axios.post(`${api_url}/api/amenities`, data, {
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
/* ************* delete Amenities data ****************/
/* *************************************************/
export const deleteAmenitiesDataServices = async (id) => {
  try {
    const response = await axios.delete(`${api_url}/api/amenities/${id}`, {
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
/* ************* edit Amenities data *******************/
/* *************************************************/
export const editAmenitiesDataServices = async (id, data) => {
  try {
    const response = await axios.patch(`${api_url}/api/amenities/${id}`, data, {
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
