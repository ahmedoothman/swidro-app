// react
import React, {
  Fragment,
  useReducer,
  useRef,
  useCallback,
  useState,
  useEffect,
} from 'react';
// router
import { useNavigate } from 'react-router-dom';
// styles
import styles from './index.module.scss';
//components
import { WideButton } from '../../../components/buttons/WideButton';
import { AuthInputField } from '../../../components/inputs/AuthInputField';
import { Seperator } from '../../../components/seperator';
import { LinkCustom } from '../../../components/LinkCustom';
import { SmallSpinner } from '../../../components/spinners/smallSpinner';
// libraries
import Cookies from 'js-cookie';
// reducer
import { signInStatesReducer, signInStatesInitialState } from './indexReducer';
//Services
import { signInService } from '../../../services/userServices';
// MUI
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

/***************************************************************************/
/* Name : SignIn React Component */
/***************************************************************************/
const SignIn = React.memo(() => {
  // Router
  const navigate = useNavigate();
  // Reducer
  const [signInStates, dispatchSignInStates] = useReducer(
    signInStatesReducer,
    signInStatesInitialState
  );
  // States
  const [isRememberMe, setIsRememberMe] = useState(Cookies.get('token'));
  // Refs
  const userNameInputRef = useRef();
  const passwordInputRef = useRef();
  // snackbar state
  const handleCloseSnackbar = () => {
    dispatchSignInStates({ type: 'CLEAR' });
  };
  useEffect(() => {
    const RememberMe = !!isRememberMe;
    // if user is already logged in
    if (RememberMe) {
      navigate('/dashboard/', { replace: true });
    }
  }, []);
  /***************************************************************************/
  /* Name : forwardToSignUp */
  /* Description : forward to sign up page */
  /***************************************************************************/
  const forwardToSignUp = () => {
    navigate('/sign-up');
  };
  /***************************************************************************/
  /* Name : validateInput */
  /* Description : validate the input fields */
  /***************************************************************************/
  const validateInput = useCallback((data) => {
    if (data.userName.trim() === '') {
      userNameInputRef.current.activeError();
      dispatchSignInStates({
        type: 'ERROR',
        errorMessage: 'Please Provide userName',
      });
      return false;
    } else {
      userNameInputRef.current.clearError();
    }
    if (data.password.trim() === '') {
      passwordInputRef.current.activeError();
      dispatchSignInStates({
        type: 'ERROR',
        errorMessage: 'Please Provide Password',
      });
      return false;
    } else {
      passwordInputRef.current.clearError();
    }
    return true;
  }, []);

  /***************************************************************************/
  /* Name : signInHandler */
  /* Description : get the data and make login request */
  /***************************************************************************/
  const signInHandler = async (event) => {
    event.preventDefault();
    // get the data
    const data = {
      userName: userNameInputRef.current.getInputValue(),
      password: passwordInputRef.current.getInputValue(),
    };
    // validate the data
    if (validateInput(data)) {
      dispatchSignInStates({ type: 'PENDING' });
      const response = await signInService(data);
      if (response.status === 'success') {
        dispatchSignInStates({
          type: 'SUCCESS',
          successMessage: 'Logged In Successfully ',
        });
        console.log(response.user.role);
        if (response.user.role !== 'lifeguard') {
          navigate('/dashboard/', { replace: true });
        } else {
          navigate('/lifeguard-monitoring', { replace: true });
        }
      } else {
        // activate error message
        dispatchSignInStates({
          type: 'ERROR',
          errorMessage: response.message,
        });
        // activate error message
        if (signInStates.errorMessage !== 'Your email is not verified') {
          passwordInputRef.current.activeError();
          userNameInputRef.current.activeError();
        }
      }
    }
  };
  return (
    <Fragment>
      <form className={styles.signInForm} onSubmit={signInHandler}>
        <AuthInputField type='USERNAME' ref={userNameInputRef} />
        <AuthInputField type='PASSWORD' ref={passwordInputRef} />
        {signInStates.pending ? (
          <WideButton text={<SmallSpinner />} />
        ) : (
          <WideButton text={'Sign In'} />
        )}
        <LinkCustom path='/forget-password' text='Forget Password?' />
      </form>
      <Seperator word='Or' />
      <WideButton text='Create Space' onPress={forwardToSignUp} />
      {/* ********** ERROR SNACKBAR ********** */}
      <Snackbar
        open={signInStates.error}
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
          {signInStates.errorMessage}!
        </Alert>
      </Snackbar>
      {/* ********** SUCESS SNACKBAR ********** */}
      <Snackbar
        open={signInStates.success}
        autoHideDuration={1000}
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
          {signInStates.successMessage}!
        </Alert>
      </Snackbar>
    </Fragment>
  );
});

export { SignIn };
