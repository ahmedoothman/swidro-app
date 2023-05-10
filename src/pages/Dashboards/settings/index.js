// react
import React, { Fragment, useEffect } from 'react';
// styles
import styles from './index.module.scss';
// react redux
import { useSelector } from 'react-redux';
// components
import { WideInputField } from '../../../components/inputs/WideInputField';
import { WideButton } from '../../../components/buttons/WideButton';
/***************************************************************************/
/* Name : Settings React Component */
/***************************************************************************/
const Settings = React.memo(() => {
  const { userName, email } = useSelector((state) => state.auth);
  // useEffect
  useEffect(() => {
    (async () => {
      // calling load
    })();
  }, []);

  /***************************************************************************/
  /* Name : load */
  /* Description : load */
  /***************************************************************************/
  return (
    <Fragment>
      <div className={styles.settingsContainer}>
        <div className={styles.settingsTitle}>
          <h1>Settings</h1>
        </div>
        <div className={styles.settingsContent}>
          <div className={styles.settingsItem}>
            <div className={styles.settingsItemTitle}>
              <h2>Account Info</h2>
            </div>
            <form className={styles.settingsItemContent}>
              <WideInputField
                label='User Name'
                placeholder={userName}
                type='Text'
              />
              <WideInputField label='Email' placeholder={email} type='Text' />
              <WideButton text='Save' />
            </form>
          </div>
          <div className={styles.settingsItem}>
            <div className={styles.settingsItemTitle}>
              <h2>Change Password</h2>
            </div>
            <form className={styles.settingsItemContent}>
              <WideInputField
                label='Old Password'
                placeholder='Enter your old password'
                type='PASSWORD'
              />
              <WideInputField
                label='New Password'
                placeholder='Enter your new password'
                type='PASSWORD'
              />
              <WideInputField
                label='Confirm Password'
                placeholder='Confirm your new password'
                type='PASSWORD'
              />
              <WideButton text='Save' />
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
});

export { Settings };
