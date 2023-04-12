// react
import React from 'react';
// react-router-dom
import { useParams } from 'react-router-dom';
// styles
import styles from './ResetPassword.module.scss';
// components
import { AuthInputField } from '../../components/inputs/AuthInputField';
import { WideButton } from '../../components/buttons/WideButton';
const ResetPassword = React.memo(() => {
  // get params from url
  const { token } = useParams();
  return (
    <form className={styles.ResetPasswordForm}>
      <AuthInputField type='PASSWORD' />
      <AuthInputField type='CONFIRM-PASSWORD' />
      <WideButton text='Reset Password' />
    </form>
  );
});

export { ResetPassword };
