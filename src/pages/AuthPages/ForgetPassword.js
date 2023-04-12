import React from 'react';
// styles
import styles from './ForgetPassword.module.scss';
// components
import { AuthInputField } from '../../components/inputs/AuthInputField';
import { WideButton } from '../../components/buttons/WideButton';
const ForgetPassword = React.memo(() => {
  return (
    <form className={styles.forgetPasswordForm}>
      <AuthInputField type='EMAIL' />
      <WideButton text='Send Email' />
    </form>
  );
});

export { ForgetPassword };
