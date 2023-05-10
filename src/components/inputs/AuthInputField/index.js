// react
import React, {
  useReducer,
  useEffect,
  useRef,
  useImperativeHandle,
  useState,
} from 'react';
// styles
import styles from './index.module.scss';
// imgs
import PersonIcon from '../../../assets/icons/person-icon.png';
import EmailIcon from '../../../assets/icons/email-icon.png';
import PasswordIcon from '../../../assets/icons/lock-icon.png';
import OrgNameIcon from '../../../assets/icons/org-name-icon.png';
import LocationIcon from '../../../assets/icons/location-icon.png';
// reducer
const inputFieldStatesIntialState = {
  placeholder: 'Username',
  icon: PersonIcon,
};
const inputFieldStatesReducer = (state, action) => {
  if (action.type === 'USERNAME') {
    return {
      placeholder: 'Username',
      icon: PersonIcon,
    };
  }
  if (action.type === 'EMAIL') {
    return {
      placeholder: 'Email',
      icon: EmailIcon,
    };
  }
  if (action.type === 'PASSWORD') {
    return {
      placeholder: 'Password',
      icon: PasswordIcon,
    };
  }
  if (action.type === 'CONFIRM-PASSWORD') {
    return {
      placeholder: 'Confirm Password',
      icon: PasswordIcon,
    };
  }
  if (action.type === 'ORG_NAME') {
    return {
      placeholder: 'Organization Name',
      icon: OrgNameIcon,
    };
  }
  if (action.type === 'LOCATION') {
    return {
      placeholder: 'Location',
      icon: LocationIcon,
    };
  }
  return inputFieldStatesIntialState;
};
// react component
const AuthInputFieldComp = React.forwardRef(({ type }, ref) => {
  // ref
  const inputRef = useRef();
  //   state
  const [inputStyle, setInputStyle] = useState(`${styles['input-field']}`);
  const [inputType, setInputType] = useState('text');
  // reducer
  const [inputFieldStates, dispatchInputFieldStates] = useReducer(
    inputFieldStatesReducer,
    inputFieldStatesIntialState
  );
  // useEffect
  useEffect(() => {
    // select the input field
    dispatchInputFieldStates({ type });
    if (type.includes('PASSWORD')) {
      setInputType('password');
    }
  }, [type]);

  // forward ref
  useImperativeHandle(ref, () => {
    return {
      activeError,
      clearError,
      getInputValue: () => inputRef.current.value,
    };
  });
  // active error function
  const activeError = () => {
    const className = `${styles['input-field']} ${styles['error']}`;
    setInputStyle(className);
  };
  // clear error function
  const clearError = () => {
    const className = `${styles['input-field']}`;
    setInputStyle(className);
  };
  return (
    <div className={inputStyle}>
      <div className={styles['side-icon']}>
        <img src={inputFieldStates.icon} alt='Person-Icon' />
      </div>
      <input
        type={inputType}
        placeholder={inputFieldStates.placeholder}
        ref={inputRef}
      />
    </div>
  );
});

const AuthInputField = React.memo(AuthInputFieldComp);
export { AuthInputField };
