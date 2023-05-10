import React, { useRef, useReducer, useEffect, Fragment } from 'react';
// styles
import styles from './index.module.scss';
// components
import { AuthInputField } from '../../../components/inputs/AuthInputField';
import { WideButton } from '../../../components/buttons/WideButton';
import { SmallSpinner } from '../../../components/spinners/smallSpinner';
// libraries
import validator from 'validator';
// services
import { forgetPasswordService } from '../../../services/userServices';
// reducer
import {
  forgetPasswordStatesReducer,
  forgetPasswordStatesInitialState,
} from './indexReducer';
// MUI
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

/***************************************************************************/
/* Name : SignIn React Component */
/***************************************************************************/
const ForgetPassword = React.memo(() => {
  // refs
  const emailInputRef = useRef();
  // reducer
  const [forgetPasswordStates, dispatchForgetPasswordStates] = useReducer(
    forgetPasswordStatesReducer,
    forgetPasswordStatesInitialState
  );

  // snackbar state
  const handleCloseSnackbar = () => {
    dispatchForgetPasswordStates({ type: 'CLEAR' });
  };
  /***************************************************************************/
  /* Name : validateInput */
  /* Description : validate the input fields */
  /***************************************************************************/
  const validateInput = (data) => {
    if (data.email.trim() === '') {
      emailInputRef.current.activeError();
      dispatchForgetPasswordStates({
        type: 'ERROR',
        errorMessage: 'Email is required',
      });
      return false;
    } else {
      emailInputRef.current.clearError();
    }
    if (!validator.isEmail(data.email)) {
      emailInputRef.current.activeError();
      dispatchForgetPasswordStates({
        type: 'ERROR',
        errorMessage: 'Please Provide Valid Email',
      });
      return false;
    } else {
      emailInputRef.current.clearError();
    }
    return true;
  };
  /***************************************************************************/
  /* Name : handleSubmit */
  /* Description : Get Email and Send Reset Password Req */
  /***************************************************************************/
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailInputRef.current.getInputValue();
    if (validateInput({ email })) {
      dispatchForgetPasswordStates({ type: 'PENDING' });
      const response = await forgetPasswordService({ email });
      if (response.status === 'success') {
        dispatchForgetPasswordStates({
          type: 'SUCCESS',
          successMessage: 'Email Sent Successfully',
        });
      } else {
        dispatchForgetPasswordStates({
          type: 'ERROR',
          errorMessage: response.message,
        });
      }
    }
  };
  return (
    <Fragment>
      <form className={styles.forgetPasswordForm} onSubmit={handleSubmit}>
        <AuthInputField type='EMAIL' ref={emailInputRef} />
        {forgetPasswordStates.pending ? (
          <WideButton text={<SmallSpinner />} />
        ) : (
          <WideButton text='Send Email' />
        )}
      </form>
      {/* ********** ERROR SNACKBAR ********** */}
      <Snackbar
        open={forgetPasswordStates.error}
        onClose={handleCloseSnackbar}
        autoHideDuration={20000}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Alert
          severity='error'
          onClose={handleCloseSnackbar}
          sx={{
            width: '100%',
            backgroundColor: '#D32F2F',
            color: '#fff',
            fontSize: '1.4rem',
            '& .MuiAlert-icon': {
              color: '#fff',
            },
          }}
        >
          {forgetPasswordStates.errorMessage}!
        </Alert>
      </Snackbar>
      {/* ********** SUCESS SNACKBAR ********** */}
      <Snackbar
        open={forgetPasswordStates.success}
        autoHideDuration={10000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity='success'
          sx={{
            width: '100%',
            backgroundColor: '#388E3C',
            color: '#fff',
            fontSize: '1.4rem',
            '& .MuiAlert-icon': {
              color: '#fff',
            },
          }}
        >
          {forgetPasswordStates.successMessage}!
        </Alert>
      </Snackbar>
    </Fragment>
  );
});

export { ForgetPassword };
