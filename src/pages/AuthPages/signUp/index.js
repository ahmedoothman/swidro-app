import React, { useRef, useReducer, useCallback, Fragment } from 'react';
// router
import { useNavigate } from 'react-router-dom';
// styles
import styles from './index.module.scss';
// components
import { WideButton } from '../../../components/buttons/WideButton';
import { AuthInputField } from '../../../components/inputs/AuthInputField';
import { Seperator } from '../../../components/seperator';
import { Note } from '../../../components/note';
import { SmallSpinner } from '../../../components/spinners/smallSpinner';
// libraries
import validator from 'validator';
// Reducer
import { signUpStatesReducer, signUpStatesInitialState } from './indexReducer';
// MUI
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
// services
import { signUpService } from '../../../services/userServices';

/***************************************************************************/
/* Name : SignUp React Component */
/***************************************************************************/
const SignUp = React.memo(() => {
  // Router
  const navigate = useNavigate();
  // Refs
  const orgNameInputRef = useRef();
  const locationInputRef = useRef();
  const emailInputRef = useRef();
  const userNameInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  // Reducer
  const [signUpStates, dispatchSignUpStates] = useReducer(
    signUpStatesReducer,
    signUpStatesInitialState
  );
  // snackbar state
  const handleCloseSnackbar = () => {
    dispatchSignUpStates({ type: 'CLEAR' });
  };
  /***************************************************************************/
  /* Name : validateInput */
  /* Description : validate the input fields */
  /***************************************************************************/
  const validateInput = useCallback((data) => {
    if (data.name.trim() === '') {
      orgNameInputRef.current.activeError();
      dispatchSignUpStates({
        type: 'ERROR',
        errorMessage: 'Please Provide orgName',
      });
      return false;
    } else {
      orgNameInputRef.current.clearError();
    }
    if (data.location.trim() === '') {
      locationInputRef.current.activeError();
      dispatchSignUpStates({
        type: 'ERROR',
        errorMessage: 'Please Provide location',
      });
      return false;
    } else {
      locationInputRef.current.clearError();
    }
    if (data.email.trim() === '') {
      emailInputRef.current.activeError();
      dispatchSignUpStates({
        type: 'ERROR',
        errorMessage: 'Please Provide email',
      });
      return false;
    } else {
      emailInputRef.current.clearError();
    }
    if (!validator.isEmail(data.email)) {
      dispatchSignUpStates({
        type: 'ERROR',
        errorMessage: 'Please Provide a Valid Email',
      });
      emailInputRef.current.activeError();
      return false;
    }
    if (data.userName.trim() === '') {
      userNameInputRef.current.activeError();
      dispatchSignUpStates({
        type: 'ERROR',
        errorMessage: 'Please Provide userName',
      });
      return false;
    } else {
      userNameInputRef.current.clearError();
    }
    if (data.password.trim() === '') {
      passwordInputRef.current.activeError();
      dispatchSignUpStates({
        type: 'ERROR',
        errorMessage: 'Please Provide password',
      });
      return false;
    } else {
      passwordInputRef.current.clearError();
    }
    if (data.passwordConfirm.trim() === '') {
      confirmPasswordInputRef.current.activeError();
      dispatchSignUpStates({
        type: 'ERROR',
        errorMessage: 'Please Provide confirmPassword',
      });
      return false;
    } else {
      confirmPasswordInputRef.current.clearError();
    }
    if (data.password.trim().length < 8) {
      passwordInputRef.current.activeError();
      dispatchSignUpStates({
        type: 'ERROR',
        errorMessage: 'Password Should at least be 8 digits',
      });
      return false;
    } else {
      passwordInputRef.current.clearError();
    }
    if (data.password.trim() !== data.passwordConfirm.trim()) {
      confirmPasswordInputRef.current.activeError();
      dispatchSignUpStates({
        type: 'ERROR',
        errorMessage: 'Password and Confirm Password does not match',
      });
      return false;
    } else {
      confirmPasswordInputRef.current.clearError();
    }
    return true;
  }, []);
  /***************************************************************************/
  /* Name : signUpHandler */
  /* Description : handle the sign up process */
  /***************************************************************************/
  const signUpHandler = async (event) => {
    event.preventDefault();
    // get the data from the input fields
    const data = {
      name: orgNameInputRef.current.getInputValue(),
      location: locationInputRef.current.getInputValue(),
      email: emailInputRef.current.getInputValue(),
      userName: userNameInputRef.current.getInputValue(),
      password: passwordInputRef.current.getInputValue(),
      passwordConfirm: confirmPasswordInputRef.current.getInputValue(),
    };
    if (validateInput(data)) {
      // if the input fields are valid
      // send the data to the server
      dispatchSignUpStates({ type: 'PENDING' });
      const response = await signUpService(data);
      if (response.status === 'success') {
        // if the sign up is successful
        // redirect the user to the login page
        dispatchSignUpStates({
          type: 'SUCCESS',
          successMessage: 'Sign Up Successfully , Please Check Your Email',
        });
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        // if the sign up is not successful
        // show the error message
        dispatchSignUpStates({
          type: 'ERROR',
          errorMessage: response.message,
        });
      }
    }
  };
  return (
    <Fragment>
      <form className={styles.signUpForm} onSubmit={signUpHandler}>
        <Note
          text='You must be online when 
   creating a space'
        />
        <AuthInputField type='ORG_NAME' ref={orgNameInputRef} />
        <AuthInputField type='LOCATION' ref={locationInputRef} />
        <Seperator word='Owner' />
        <AuthInputField type='EMAIL' ref={emailInputRef} />
        <AuthInputField type='USERNAME' ref={userNameInputRef} />
        <AuthInputField type='PASSWORD' ref={passwordInputRef} />
        <AuthInputField type='CONFIRM-PASSWORD' ref={confirmPasswordInputRef} />
        {signUpStates.pending ? (
          <WideButton text={<SmallSpinner />} />
        ) : (
          <WideButton text='Create Space' />
        )}
      </form>
      {/* ********** ERROR SNACKBAR ********** */}
      <Snackbar
        open={signUpStates.error}
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
          {signUpStates.errorMessage}!
        </Alert>
      </Snackbar>
      {/* ********** SUCESS SNACKBAR ********** */}
      <Snackbar
        open={signUpStates.success}
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
          {signUpStates.successMessage}!
        </Alert>
      </Snackbar>
    </Fragment>
  );
});

export { SignUp };
