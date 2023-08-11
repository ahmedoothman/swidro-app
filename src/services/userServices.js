import axios from 'axios';
import Cookies from 'js-cookie';
import store from '../store';
import FormData from 'form-data';

let api_url = store.getState().auth.api_url;
let token = Cookies.get('token');

/* ******************************************** */
/* *********** set Cookies Service *********** */
/* ****************************************** */

export const setCookiesService = (
  token,
  userName,
  role,
  resortId,
  resortName,
  resortLocation,
  resortOwner
) => {
  if (token) {
    Cookies.set('token', token, {
      path: '/',
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    });
  }
  if (userName) {
    Cookies.set('userName', userName, {
      path: '/',
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    });
  }
  if (role) {
    Cookies.set('role', role, {
      path: '/',
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    });
  }
  if (resortId) {
    Cookies.set('resortId', resortId, {
      path: '/',
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    });
  }
  if (resortName) {
    Cookies.set('resortName', resortName, {
      path: '/',
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    });
  }
  if (resortLocation) {
    Cookies.set('resortLocation', resortLocation, {
      path: '/',
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    });
  }
  if (resortOwner) {
    Cookies.set('resortOwner', resortOwner, {
      path: '/',
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    });
  }
};
/* ******************************************** */
/* *********** set Cookies Service *********** */
/* ****************************************** */
export const updateUserInfoService = async () => {
  token = Cookies.get('token');
  const response = await axios.get(`${api_url}/api/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  setCookiesService(
    token,
    response.data.data.data.userName,
    response.data.data.data.photo,
    response.data.data.data.email
  );
};
/* ******************************************** */
/* *********** update User Data*********** */
/* ****************************************** */
export const updateUserDataService = async (data) => {
  token = Cookies.get('token');
  // convert data to form data
  let formData = new FormData();
  if (data.userName) {
    formData.append('userName', data.userName);
  }
  if (data.email) {
    formData.append('email', data.email);
  }
  if (data.photo) {
    formData.append('photo', data.photo);
  }
  try {
    const response = await axios.patch(
      `${api_url}/api/users/updateMe`,
      formData,
      {
        headers: {
          Accept: '*/*',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setCookiesService(
      null,
      response.data.data.user.userName,
      response.data.data.user.photo,
      response.data.data.user.email
    );
    return { status: 'success', dataArray: response.data.data.user };
  } catch (error) {
    if (error.message === 'Network Error') {
      return {
        status: 'error',
        statusCode: error.response.statusCode,
        message: error.message,
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
/********************************************/
/************ update User Password **********/
/********************************************/
export const updatePasswordService = async (data) => {
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
    return { status: 'success' };
  } catch (error) {
    return {
      status: 'error',
      statusCode: error.response.statusCode,
      message: error.response.data.message,
    };
  }
};
/***********************************************/
/******************* Sign In *******************/
/**********************************************/
export const signInService = async (data) => {
  try {
    const response = await axios.post(`${api_url}/api/users/login`, data);
    setCookiesService(
      response.data.token,
      response.data.data.user.userName,
      response.data.data.user.role,
      response.data.data.resort._id,
      response.data.data.resort.name,
      response.data.data.resort.location,
      response.data.data.resort.owner
    );
    return { status: 'success', user: response.data.data.user };
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
        message: error.response.data.message,
      };
    }
  }
};
/***********************************************/
/******************* Sign Up *******************/
/**********************************************/
export const signUpService = async (data) => {
  try {
    const response = await axios.post(`${api_url}/api/resort/signup`, data);
    return { status: 'success' };
  } catch (error) {
    console.log(error);
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
/******************* logOut *******************/
/**********************************************/
export const logOutService = async () => {
  // clear cookies
  Cookies.remove('token');
  Cookies.remove('userName');
  Cookies.remove('role');
  Cookies.remove('resortId');
  Cookies.remove('resortName');
  Cookies.remove('resortLocation');
  Cookies.remove('resortOwner');
  Cookies.remove('email');
};
/***********************************************/
/****************** Verify Email **************/
/**********************************************/
export const verifyEmailService = async (verifyToken) => {
  try {
    const response = await axios.patch(
      `${api_url}/api/users/verifyEmail/${verifyToken}`
    );
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
/***********************************************/
/*************  forget password ****************/
/***********************************************/
export const forgetPasswordService = async (data) => {
  try {
    const response = await axios.post(
      `${api_url}/api/users/forgotPassword`,
      data
    );
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
/***********************************************/
/*************  reset password ****************/
/***********************************************/
export const resetPasswordService = async (data, resetToken) => {
  try {
    const response = await axios.patch(
      `${api_url}/api/users/resetPassword/${resetToken}`,
      data
    );
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
