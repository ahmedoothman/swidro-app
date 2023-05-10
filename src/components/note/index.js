// react
import React from 'react';
// styles
import styles from './index.module.scss';
// imgs
import InfoIcon from '../../assets/icons/info-icon.png';
const Note = React.memo(({ text }) => {
  return (
    <div className={styles['container']}>
      <div className={styles['side-icon']}>
        <img src={InfoIcon} alt='note' />
      </div>
      <p>{text}</p>
    </div>
  );
});

export { Note };
