// react
import React from 'react';
// styles
import styles from './SignIn.module.scss';
//components
import { WideButton } from '../../components/buttons/WideButton';
const SignIn = React.memo(() => {
  return (
    <div className={styles.signIn}>
      <h1>--------------------</h1>
      <h1>SignIn</h1>
      <WideButton text='Sign In'></WideButton>
    </div>
  );
});

export { SignIn };
