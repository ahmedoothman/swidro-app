// react
import React, { useState, Fragment } from 'react';
// react-router-dom
import { useParams } from 'react-router-dom';
// styles
import styles from './VerifyEmail.module.scss';
// img
import SuccessImg from '../../assets/icons/success-icon.png';
import ErrorImg from '../../assets/icons/error-icon.png';
import { LinkCustom } from '../../components/LinkCustom';
// react component
const VerifyEmail = React.memo(() => {
  // state
  const [status, setStatus] = useState('idle'); // idle, success, error
  const [errorMessage, setErrorMessage] = useState('Error!');
  // get params from url
  const { token } = useParams();
  return (
    <Fragment>
      {status === 'idle' && <p> Loading..</p>}
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
