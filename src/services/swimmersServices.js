import axios from 'axios';
import Cookies from 'js-cookie';
import store from '../store';
// import FormData from 'form-data';

let api_url = store.getState().auth.api_url;
let token = Cookies.get('token');

/* ******************************************** */
/* ************* get Swimmers data ****************/
/* ****************************************** */
export const getSwimmersDataServices = async () => {
  try {
    const response = await axios.get(`${api_url}/api/swimmers/`, {
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
/* ************* get Swimmers data today ****************/
/* ****************************************** */
export const getSwimmersTodayDataServices = async (amenity) => {
  try {
    // send amenity in the params
    const response = await axios.get(
      `${api_url}/api/swimmers/getSwimmersToday/${amenity}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
export const addSwimmersDataServices = async (data) => {
  try {
    const response = await axios.post(`${api_url}/api/Swimmers`, data, {
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
/* ************* delete Swimmers data ****************/
/* *************************************************/
export const deleteSwimmersDataServices = async (id) => {
  try {
    const response = await axios.delete(`${api_url}/api/swimmers/${id}`, {
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
/* ************* edit Swimmers data *******************/
/* *************************************************/
export const editSwimmersDataServices = async (id, data) => {
  try {
    const response = await axios.patch(`${api_url}/api/swimmers/${id}`, data, {
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
