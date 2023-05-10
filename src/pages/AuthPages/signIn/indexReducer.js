export const signInStatesInitialState = {
  pending: false,
  error: false,
  errorMessage: '',
  success: false,
  successMessage: '',
};

export const signInStatesReducer = (state, action) => {
  if (action.type === 'ERROR') {
    return {
      ...state,
      error: true,
      pending: false,
      errorMessage: action.errorMessage,
    };
  }
  if (action.type === 'PENDING') {
    return {
      ...state,
      pending: true,
    };
  }
  if (action.type === 'SUCCESS') {
    return {
      ...state,
      pending: false,
      success: true,
      successMessage: action.successMessage,
    };
  }
  if (action.type === 'CLEAR') {
    return {
      pending: false,
      success: false,
      error: false,
      errorMessage: state.errorMessage,
      success: false,
      successMessage: state.successMessage,
    };
  }
  return signInStatesInitialState;
};
