import axios from 'axios';
import Cookies from 'js-cookie';
import store from '../store';
import FormData from 'form-data';

let api_url = store.getState().auth.url_api;
let token = Cookies.get('token');

/* ******************************************** */
/* *********** set Cookies Service *********** */
/* ****************************************** */
const setCookiesService = (token, name, photo, email) => {
  if (token) {
    Cookies.set('token', token, {
      path: '/',
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    });
  }
  if (name) {
    Cookies.set('name', name, {
      path: '/',
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    });
  }
  if (photo) {
    Cookies.set('photo', photo, {
      path: '/',
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    });
  }
  if (email) {
    Cookies.set('email', email, {
      path: '/',
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    });
  }
  Cookies.set('navIsMin', false, {
    path: '/',
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
  });
};
/* ******************************************** */
/* *********** set Cookies Service *********** */
/* ****************************************** */
const updateUserInfoService = async () => {
  token = Cookies.get('token');
  const response = await axios.get(`${api_url}/api/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  setCookiesService(
    token,
    response.data.data.data.name,
    response.data.data.data.photo,
    response.data.data.data.email
  );
};
/* ******************************************** */
/* *********** update User Data*********** */
/* ****************************************** */
const updateUserDataService = async (data) => {
  token = Cookies.get('token');
  // convert data to form data
  let formData = new FormData();
  if (data.name) {
    formData.append('name', data.name);
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
      response.data.data.user.name,
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
const updatePasswordService = async (data) => {
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
const signInService = async (data) => {
  try {
    const response = await axios.post(`${api_url}/api/users/login`, data);
    setCookiesService(
      response.data.token,
      response.data.data.user.name,
      response.data.data.user.photo,
      response.data.data.user.email
    );
    return { status: 'success', dataArray: response.data.data.user };
  } catch (error) {
    return {
      status: 'error',
      statusCode: error.response.statusCode,
      message: error.response.data.message,
    };
  }
};
/***********************************************/
/******************* Sign Up *******************/
/**********************************************/
const signUpService = async (data) => {
  try {
    const response = await axios.post(`${api_url}/api/resort/signup`, data);
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
/****************** Verify Email **************/
/**********************************************/
const verifyEmailService = async (verifyToken) => {
  try {
    const response = await axios.patch(
      `${api_url}/api/users/verifyEmail/${verifyToken}`
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
/*************  forget password ****************/
/***********************************************/
const forgetPasswordService = async (data) => {
  try {
    const response = await axios.post(
      `${api_url}/api/users/forgotPassword`,
      data
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
/*************  reset password ****************/
/***********************************************/
const resetPasswordService = async (data, resetToken) => {
  try {
    const response = await axios.patch(
      `${api_url}/api/users/resetPassword/${resetToken}`,
      data
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

export {
  updateUserInfoService,
  setCookiesService,
  updateUserDataService,
  updatePasswordService,
  signInService,
  signUpService,
  verifyEmailService,
  forgetPasswordService,
  resetPasswordService,
};
