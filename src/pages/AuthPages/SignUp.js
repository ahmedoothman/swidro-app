import React from 'react';
// styles
import styles from './SignUp.module.scss';
// components
import { WideButton } from '../../components/buttons/WideButton';
import { AuthInputField } from '../../components/inputs/AuthInputField';
import { Seperator } from '../../components/seperator';
import { Note } from '../../components/note';
const SignUp = React.memo(() => {
  return (
    <form className={styles.signUpForm}>
      <Note
        text='You must be online when 
   creating a space'
      />
      <AuthInputField type='ORG_NAME' />
      <AuthInputField type='LOCATION' />
      <Seperator word='Owner' />
      <AuthInputField type='EMAIL' />
      <AuthInputField type='USERNAME' />
      <AuthInputField type='PASSWORD' />
      <AuthInputField type='CONFIRM-PASSWORD' />
      <WideButton text='Create Space' />
    </form>
  );
});

export { SignUp };
