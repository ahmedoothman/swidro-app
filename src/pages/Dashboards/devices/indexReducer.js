export const devicesStatesInitialState = {
  success: false,
  error: false,
  errorMessage: '',
  pending: false,
};
export const devicesStatesReducer = (state, action) => {
  if (action.type === 'SUCCESS') {
    return {
      ...state,
      success: true,
      error: false,
      successMessage: action.successMessage,
      pending: false,
    };
  }
  if (action.type === 'ERROR') {
    return {
      ...state,
      success: false,
      error: true,
      errorMessage: action.errorMessage,
      pending: false,
    };
  }
  if (action.type === 'PENDING') {
    return {
      ...state,
      pending: true,
    };
  }
  if (action.type === 'CLEAR') {
    return {
      ...state,
      success: false,
      error: false,
      errorMessage: state.errorMessage,
      successMessage: state.successMessage,
      pending: false,
    };
  }
  return devicesStatesInitialState;
};
