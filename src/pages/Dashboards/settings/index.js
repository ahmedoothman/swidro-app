// react
import React, { Fragment, useEffect, useRef, useReducer } from 'react';
// styles
import styles from './index.module.scss';
// components
import { WideInputField } from '../../../components/inputs/WideInputField';
import { WideButton } from '../../../components/buttons/WideButton';
import { SmallSpinner } from '../../../components/spinners/smallSpinner';
// material ui
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
// react redux
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../../store/auth-slice';
// import reducer
import {
  accountInfoInitialState,
  accountInfoReducer,
  passwordInitialState,
  passwordReducer,
} from './indexReducer';
// services
import {
  updateUserDataService,
  updateUserPasswordService,
} from '../../../services/settingsServices';
import { setCookiesService } from '../../../services/userServices';
/***************************************************************************/
/* Name : Settings React Component */
/***************************************************************************/
const Settings = React.memo(() => {
  // snackbar state
  const handleCloseSnackbar = () => {
    dispatchAccountInfo({ type: 'CLEAR' });
    dispatchPassword({ type: 'CLEAR' });
  };
  // dispatch
  const dispatch = useDispatch();
  /*  ********************************************
   * NAME : useSelector
   * DESC : get data from redux store
   * ******************************************** */
  const { userName, email } = useSelector((state) => state.auth);
  /*  ********************************************
   * NAME : Input Refs
   * DESC : refs to collect data and send it to the server
   ******************************************** */
  const userNameRef = useRef();
  const EmailRef = useRef();
  const currentPasswordRef = useRef();
  const newPasswordRef = useRef();
  const confirmPasswordRef = useRef();
  /* ******************************************** */
  /* *********** Account Info Reducer *********** */
  /* ****************************************** */
  const [accountInfoState, dispatchAccountInfo] = useReducer(
    accountInfoReducer,
    accountInfoInitialState
  );
  /* ******************************************** */
  /* *********** password Info Reducer *********** */
  /* ****************************************** */
  const [passwordState, dispatchPassword] = useReducer(
    passwordReducer,
    passwordInitialState
  );
  // useEffect
  useEffect(() => {
    (async () => {
      // calling load
    })();
  }, []);
  /* ******************************************** */
  /* update user info */
  /* ****************************************** */
  const updateAccountInfo = async (data) => {
    dispatchAccountInfo({ type: 'UPDATING' });
    // send data to server
    const response = await updateUserDataService(data);
    if (response.status === 'success') {
      dispatchAccountInfo({ type: 'SUCCESS' });
      const { userName, email } = response.data;
      // update cookies
      setCookiesService(null, userName);
      // update store
      dispatch(authActions.updateUser({ userName, email }));
    } else {
      dispatchAccountInfo({ type: 'ERROR', errorMessage: response.message });
    }
  };
  /* ******************************************** */
  /* UserInfo Handler */
  /* ****************************************** */
  const userInfoHandler = async (e) => {
    e.preventDefault();
    // get data from refs
    const data = {};
    if (userNameRef.current.getInputValue() !== '') {
      data.userName = userNameRef.current.getInputValue();
    }
    if (EmailRef.current.getInputValue() !== '') {
      data.email = EmailRef.current.getInputValue();
    }
    // send data to update account info
    await updateAccountInfo(data);
  };

  /* ******************************************** */
  /* validate password */
  /* ****************************************** */
  const validatePassword = (data) => {
    // check user provided current password
    if (data.passwordCurrent.trim() === '') {
      currentPasswordRef.current.activeError();
      dispatchPassword({
        type: 'ERROR',
        errorMessage: 'Please Provide current password',
      });
      return false;
    } else {
      currentPasswordRef.current.clearError();
    }
    // check user provided new password
    if (data.password.trim() === '') {
      newPasswordRef.current.activeError();
      dispatchPassword({
        type: 'ERROR',
        errorMessage: 'Please Provide new password',
      });
      return false;
    } else {
      newPasswordRef.current.clearError();
    }
    // check user provided confirm password
    if (data.passwordConfirm.trim() === '') {
      confirmPasswordRef.current.activeError();
      dispatchPassword({
        type: 'ERROR',
        errorMessage: 'Please Provide confirm password',
      });
      return false;
    } else {
      confirmPasswordRef.current.clearError();
    }
    // check password at least 8 characters
    if (data.password.trim().length < 8) {
      newPasswordRef.current.activeError();
      dispatchPassword({
        type: 'ERROR',
        errorMessage: 'Password must be at least 8 characters',
      });
      return false;
    } else {
      newPasswordRef.current.clearError();
    }
    // check password and confirm password match
    if (data.password.trim() !== data.passwordConfirm.trim()) {
      confirmPasswordRef.current.activeError();
      dispatchPassword({
        type: 'ERROR',
        errorMessage: 'Password and confirm password does not match',
      });
      return false;
    } else {
      confirmPasswordRef.current.clearError();
    }
    return true;
  };
  /* ******************************************** */
  /* update password */
  /* ****************************************** */
  const updatePassword = async (data) => {
    dispatchPassword({ type: 'UPDATING' });
    // send data to server
    const response = await updateUserPasswordService(data);
    if (response.status === 'success') {
      // update tokken in cookies
      setCookiesService(response.data.token, null);
      dispatchPassword({ type: 'SUCCESS' });
    } else {
      dispatchPassword({ type: 'ERROR', errorMessage: response.message });
    }
  };
  /* ******************************************** */
  /* Password Handler */
  /* ****************************************** */
  const passwordHandler = async (e) => {
    e.preventDefault();
    dispatchPassword({ type: 'UPDATING' });
    // get data from refs
    const data = {
      passwordCurrent: currentPasswordRef.current.getInputValue(),
      password: newPasswordRef.current.getInputValue(),
      passwordConfirm: confirmPasswordRef.current.getInputValue(),
    };

    // validate
    const isValid = validatePassword(data);
    if (!isValid) {
      return;
    }
    await updatePassword(data);
    // send data to update account info
  };

  return (
    <Fragment>
      <div className={styles.settingsContainer}>
        <div className={styles.settingsTitle}>
          <h1>Settings</h1>
        </div>
        <div className={styles.settingsContent}>
          <div className={styles.settingsItem}>
            <div className={styles.settingsItemTitle}>
              <h2>Account Info</h2>
            </div>
            <form
              className={styles.settingsItemContent}
              onSubmit={userInfoHandler}
            >
              <WideInputField
                label='User Name'
                placeholder={userName}
                type='Text'
                ref={userNameRef}
              />
              <WideInputField
                label='Email'
                placeholder={email}
                type='Text'
                ref={EmailRef}
              />
              {accountInfoState.pending && (
                <WideButton text={<SmallSpinner />} />
              )}
              {!accountInfoState.pending && <WideButton text={'Save'} />}
            </form>
          </div>
          <div className={styles.settingsItem}>
            <div className={styles.settingsItemTitle}>
              <h2>Change Password</h2>
            </div>
            <form
              className={styles.settingsItemContent}
              onSubmit={passwordHandler}
            >
              <WideInputField
                label='Current Password'
                placeholder='Enter your Current password'
                type='PASSWORD'
                ref={currentPasswordRef}
              />
              <WideInputField
                label='New Password'
                placeholder='Enter your new password'
                type='PASSWORD'
                ref={newPasswordRef}
              />
              <WideInputField
                label='Confirm Password'
                placeholder='Confirm your new password'
                type='PASSWORD'
                ref={confirmPasswordRef}
              />
              <WideButton text='Save' />
            </form>
          </div>
        </div>
      </div>
      {/* ********** ERROR SNACKBAR ********** */}
      <Snackbar
        open={accountInfoState.error}
        onClose={handleCloseSnackbar}
        autoHideDuration={20000}
        anchorOrigin={{
          vertical: 'top',
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
          {accountInfoState.errorMessage}!
        </Alert>
      </Snackbar>
      {/* ********** SUCESS SNACKBAR ********** */}
      <Snackbar
        open={accountInfoState.success}
        autoHideDuration={10000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{
          vertical: 'top',
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
          {accountInfoState.successMessage}!
        </Alert>
      </Snackbar>
      {/* ********** ERROR SNACKBAR ********** */}
      <Snackbar
        open={passwordState.error}
        onClose={handleCloseSnackbar}
        autoHideDuration={20000}
        anchorOrigin={{
          vertical: 'top',
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
          {passwordState.errorMessage}!
        </Alert>
      </Snackbar>
      {/* ********** SUCESS SNACKBAR ********** */}
      <Snackbar
        open={passwordState.success}
        autoHideDuration={10000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{
          vertical: 'top',
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
          {passwordState.successMessage}!
        </Alert>
      </Snackbar>
    </Fragment>
  );
});

export { Settings };
