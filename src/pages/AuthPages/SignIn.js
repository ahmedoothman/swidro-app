// react
import React, { Fragment } from 'react';
// router
import { useNavigate } from 'react-router-dom';
// styles
import styles from './SignIn.module.scss';
//components
import { WideButton } from '../../components/buttons/WideButton';
import { AuthInputField } from '../../components/inputs/AuthInputField';
import { Seperator } from '../../components/seperator';
import { LinkCustom } from '../../components/LinkCustom';
const SignIn = React.memo(() => {
  // router
  const navigate = useNavigate();
  const forwardToSignUp = () => {
    navigate('/sign-up');
  };
  return (
    <Fragment>
      <form className={styles.signInForm}>
        <AuthInputField type='USERNAME' />
        <AuthInputField type='PASSWORD' />
        <WideButton text='Sign In' />
        <LinkCustom path='/forget-password' text='Forget Password?' />
      </form>
      <Seperator word='Or' />
      <WideButton text='Create Space' onPress={forwardToSignUp} />
    </Fragment>
  );
});

export { SignIn };
