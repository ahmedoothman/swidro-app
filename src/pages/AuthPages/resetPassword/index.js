// react
import React, { useReducer, useRef, Fragment } from 'react';
// react-router-dom
import { useParams, useNavigate } from 'react-router-dom';
// styles
import styles from './index.module.scss';
// components
import { AuthInputField } from '../../../components/inputs/AuthInputField';
import { WideButton } from '../../../components/buttons/WideButton';
import { SmallSpinner } from '../../../components/spinners/smallSpinner';
// libraries
import validator from 'validator';
// services
import { resetPasswordService } from '../../../services/userServices';
// reducer
import {
  resetPasswordStatesReducer,
  resetPasswordStatesInitialState,
} from './indexPasswordReducer';
// MUI
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

/***************************************************************************/
/* Name : ResetPassword React Component */
/***************************************************************************/
const ResetPassword = React.memo(() => {
  // get params from url
  const { token } = useParams();
  // navigate
  const navigate = useNavigate();
  // refs
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  // reducer
  const [resetPasswordStates, dispatchResetPasswordStates] = useReducer(
    resetPasswordStatesReducer,
    resetPasswordStatesInitialState
  );
  // snackbar state
  const handleCloseSnackbar = () => {
    dispatchResetPasswordStates({ type: 'CLEAR' });
  };

  /***************************************************************************/
  /* Name : validateInput */
  /* Description : validate the input fields */
  /***************************************************************************/
  const validateInput = (data) => {
    if (data.password.trim() === '') {
      passwordInputRef.current.activeError();
      dispatchResetPasswordStates({
        type: 'ERROR',
        errorMessage: 'Password is required',
      });
      return false;
    } else {
      passwordInputRef.current.clearError();
    }
    if (data.confirmPassword.trim() === '') {
      confirmPasswordInputRef.current.activeError();
      dispatchResetPasswordStates({
        type: 'ERROR',
        errorMessage: 'Confirm Password is required',
      });
      return false;
    } else {
      confirmPasswordInputRef.current.clearError();
    }

    if (data.password.trim() !== data.confirmPassword.trim()) {
      confirmPasswordInputRef.current.activeError();
      dispatchResetPasswordStates({
        type: 'ERROR',
        errorMessage: 'Password and Confirm Password must be same',
      });
      return false;
    } else {
      confirmPasswordInputRef.current.clearError();
    }
    return true;
  };
  /***************************************************************************/
  /* Name : handleSubmit */
  /* Description : handle the submit of the form */
  /***************************************************************************/
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      password: passwordInputRef.current.getInputValue(),
      confirmPassword: confirmPasswordInputRef.current.getInputValue(),
    };
    if (validateInput(data)) {
      dispatchResetPasswordStates({ type: 'PENDING' });
      const response = await resetPasswordService(data, token);
      if (response.status === 'success') {
        dispatchResetPasswordStates({
          type: 'SUCCESS',
          successMessage:
            'Password Reset Successfully , Redirecting to Login..',
        });

        // redirect to login page
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        dispatchResetPasswordStates({
          type: 'ERROR',
          errorMessage: response.message,
        });
      }
    }
  };
  return (
    <Fragment>
      <form className={styles.ResetPasswordForm} onSubmit={handleSubmit}>
        <AuthInputField type='PASSWORD' ref={passwordInputRef} />
        <AuthInputField type='CONFIRM-PASSWORD' ref={confirmPasswordInputRef} />
        {resetPasswordStates.pending ? (
          <WideButton text={<SmallSpinner />} />
        ) : (
          <WideButton text='Reset Password' />
        )}
      </form>
      {/* ********** ERROR SNACKBAR ********** */}
      <Snackbar
        open={resetPasswordStates.error}
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
          {resetPasswordStates.errorMessage}!
        </Alert>
      </Snackbar>
      {/* ********** SUCESS SNACKBAR ********** */}
      <Snackbar
        open={resetPasswordStates.success}
        autoHideDuration={6000}
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
          {resetPasswordStates.successMessage}!
        </Alert>
      </Snackbar>
    </Fragment>
  );
});

export { ResetPassword };
