// react
import React, { useState, Fragment, useEffect } from 'react';
// react-router-dom
import { useParams } from 'react-router-dom';
// styles
import styles from './index.module.scss';
// img
import SuccessImg from '../../../assets/icons/success-icon.svg';
import ErrorImg from '../../../assets/icons/error-icon.svg';
import { LinkCustom } from '../../../components/LinkCustom';
// services
import { verifyEmailService } from '../../../services/userServices';
// MUI
import CircularProgress from '@mui/material/CircularProgress';

/***************************************************************************/
/* Name : VerifyEmail React Component */
/***************************************************************************/
const VerifyEmail = React.memo(() => {
  // state
  const [status, setStatus] = useState('idle'); // idle, success, error
  const [errorMessage, setErrorMessage] = useState('Error!');
  // get params from url
  const { token } = useParams();

  // useEffect
  useEffect(() => {
    (async () => {
      await verifyEmail();
    })();
  }, []);

  /***************************************************************************/
  /* Name : verifyEmail */
  /* Description : verify the email */
  /***************************************************************************/
  const verifyEmail = async () => {
    setStatus('loading');
    const response = await verifyEmailService(token);
    if (response.status === 'success') {
      setStatus('success');
    } else {
      setStatus('error');
      setErrorMessage(response.message);
    }
  };
  return (
    <Fragment>
      {status === 'idle' && <CircularProgress />}
      {status === 'error' && (
        <div className={styles.ErrorMessage}>
          <div>
            <img src={ErrorImg}></img>
          </div>

          <h1>Error!</h1>
          <p>{errorMessage}</p>
        </div>
      )}
      {status === 'success' && (
        <div className={styles.SuccessMessage}>
          <div>
            <img src={SuccessImg}></img>
          </div>
          <h1>Success!</h1>
          <p> Your email has been verified. </p>
          <LinkCustom path='/login' text='Login' />
        </div>
      )}
    </Fragment>
  );
});

export { VerifyEmail };
