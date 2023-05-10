// reducer
export const forgetPasswordStatesInitialState = {
  pending: false,
  error: false,
  errorMessage: '',
  success: false,
  successMessage: '',
};
export const forgetPasswordStatesReducer = (state, action) => {
  if (action.type === 'PENDING') {
    return {
      ...state,
      pending: true,
      error: false,
      errorMessage: '',
      success: false,
      successMessage: '',
    };
  }
  if (action.type === 'ERROR') {
    return {
      ...state,
      pending: false,
      error: true,
      errorMessage: action.errorMessage,
      success: false,
      successMessage: '',
    };
  }
  if (action.type === 'SUCCESS') {
    return {
      ...state,
      pending: false,
      error: false,
      errorMessage: '',
      success: true,
      successMessage: action.successMessage,
    };
  }
  if (action.type === 'CLEAR') {
    return {
      ...state,
      pending: false,
      error: false,
      errorMessage: '',
      success: false,
      successMessage: '',
    };
  }
  return forgetPasswordStatesInitialState;
};
