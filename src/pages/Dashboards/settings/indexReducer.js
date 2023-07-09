import Cookies from 'js-cookie';
// account info reducer
const accountInfoInitialState = {
  pending: false,
  success: false,
  successMessage: '',
  error: false,
  errorMessage: '',
};
const accountInfoReducer = (state, action) => {
  if (action.type === 'UPDATING') {
    return {
      pending: true,
      success: false,
      successMessage: '',
      error: false,
      errorMessage: '',
    };
  }
  if (action.type === 'SUCCESS') {
    return {
      pending: false,
      success: true,
      successMessage: 'Updated successfully',
      error: false,
      errorMessage: '',
    };
  }
  if (action.type === 'ERROR') {
    return {
      pending: false,
      success: false,
      successMessage: '',
      error: true,
      errorMessage: action.errorMessage,
    };
  }
  if ((action.type = 'CLEAR')) {
    return {
      pending: false,
      success: false,
      successMessage: '',
      error: false,
      errorMessage: '',
    };
  }
  return accountInfoInitialState;
};
// password reducer
const passwordInitialState = {
  pending: false,
  success: false,
  successMessage: '',
  error: false,
  errorMessage: '',
};
const passwordReducer = (state, action) => {
  if (action.type === 'UPDATING') {
    return {
      pending: true,
      success: false,
      successMessage: '',
      error: false,
      errorMessage: '',
    };
  }
  if (action.type === 'SUCCESS') {
    return {
      pending: false,
      success: true,
      successMessage: 'Updated successfully',
      error: false,
      errorMessage: '',
    };
  }

  if (action.type === 'ERROR') {
    return {
      pending: false,
      success: false,
      successMessage: '',
      error: true,
      errorMessage: action.errorMessage,
    };
  }
  if (action.type === 'clear') {
    return {
      pending: false,
      success: false,
      successMessage: '',
      error: false,
      errorMessage: '',
    };
  }
  return passwordInitialState;
};

export {
  accountInfoInitialState,
  accountInfoReducer,
  passwordInitialState,
  passwordReducer,
};
