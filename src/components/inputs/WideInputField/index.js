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

// react component
const WideInputFieldComp = React.forwardRef(
  ({ type, placeholder, label }, ref) => {
    // ref
    const inputRef = useRef();
    //   state
    const [inputStyle, setInputStyle] = useState(`${styles['input-field']}`);
    const [inputType, setInputType] = useState('text');
    // useEffect
    useEffect(() => {
      // select the input field
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
      <div className={styles.container}>
        <label>{label}</label>
        <div className={inputStyle}>
          <input type={inputType} placeholder={placeholder} ref={inputRef} />
        </div>
      </div>
    );
  }
);

const WideInputField = React.memo(WideInputFieldComp);
export { WideInputField };
