import React from 'react';
// styles
import styles from './index.module.scss';
// React
const WideButton = React.memo(({ text, onPress }) => {
  const clickHandler = async () => {
    if (onPress !== undefined) {
      await onPress();
    }
  };
  return (
    <button onClick={clickHandler} className={styles['btn']}>
      {text}
    </button>
  );
});

export { WideButton };
