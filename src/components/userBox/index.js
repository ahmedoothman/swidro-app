//react
import React, { useEffect } from 'react';
// styles
import styles from './index.module.scss';
// readux
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store/auth-slice';
// images
import userIcon from '../../assets/icons/user-icon-rounded.svg';

/***************************************************************************/
/* Name : ProfileBox React Component */
/***************************************************************************/
const ProfileBox = React.memo(({}) => {
  // useDispatch
  const dispatch = useDispatch();
  // useSelector
  const { userName } = useSelector((state) => state.auth);
  const { role } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(authActions.updateInfo());
  }, []);
  return (
    <div className={styles.profileBox}>
      <div className={styles.profileImg}>
        <img src={userIcon} alt='user-icon' />
      </div>
      <div className={styles.profileInfo}>
        <p className={styles.profileName}>@{userName}</p>
        <p className={styles.profileRole}>{role}</p>
      </div>
    </div>
  );
});

export { ProfileBox };
