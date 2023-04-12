import React from 'react';
// styles
import styles from './WideButton.module.scss';
// React
const WideButton = React.memo(({ text, onPress }) => {
  const clickHandler = async () => {
    await onPress();
  };
  return (
    <button onClick={clickHandler} className={styles['btn']}>
      <p>{text}</p>
    </button>
  );
});

export { WideButton };
