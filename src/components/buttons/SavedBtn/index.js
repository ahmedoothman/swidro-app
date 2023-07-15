// React
import React from 'react';
// styles
import styles from './index.module.scss';
// imgs
import SavedIcon from '../../../assets/icons/Done.svg';
const SavedBtn = React.memo(({ text, onPress }) => {
  const clickHandler = async () => {
    if (onPress !== undefined) {
      await onPress();
    }
  };
  return (
    <button onClick={clickHandler} className={styles['btn']}>
      <div>
        <img src={SavedIcon} alt='edit' />
      </div>
    </button>
  );
});

export { SavedBtn };
