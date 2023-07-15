// react
import React, { Fragment, useEffect, useState } from 'react';
// react router
import { useNavigate } from 'react-router-dom';
// libraries
// components
import { ProfileBox } from '../../components/userBox';
// styles
import styles from './index.module.scss';

// images
import CopyIcon from '../../assets/icons/copy-icon.svg';
import NotiIcon from '../../assets/icons/noti-icon.svg';
/***************************************************************************/
/* Name : TopNav React Component */
/***************************************************************************/
const TopNav = React.memo(() => {
  // state
  const [hostUrl, setHostUrl] = useState(null);
  const [ipAddressHolder, setIpAddressHolder] = useState(null);
  const [ipAddress, setIpAddress] = useState('');

  // useNavigate
  const navigate = useNavigate();
  // useEffect
  useEffect(() => {
    const { hostname, port } = window.location;
    setIpAddressHolder(`${hostname}:${port}`);
    setHostUrl(`${hostname}:${port}`);
  }, []);
  /***************************************************************************/
  /* Name : handleCopyClick */
  /* Description : handleCopyClick */
  /***************************************************************************/
  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(hostUrl);
      setHostUrl('Copied !');
      setTimeout(() => {
        setHostUrl(ipAddressHolder);
      }, 500);
    } catch (err) {
      setHostUrl('Failed !');
      setTimeout(() => {
        setHostUrl(ipAddressHolder);
      }, 500);
    }
  };
  /***************************************************************************/
  /* Name : load */
  /* Description : load */
  /***************************************************************************/

  return (
    <Fragment>
      <div className={styles.topNavContainer}>
        <div className={styles.hostUrlBox} onClick={handleCopyClick}>
          <div className={styles.hostUrlTitle}>HOST URL</div>

          <div className={styles.hostUrl}>{hostUrl}</div>
          <div className={styles.hostUrlImg}>
            <img src={CopyIcon} alt='copy-icon' />
          </div>
        </div>
        <div className={styles.rightBox}>
          {false && (
            <div
              className={styles.notificationsBox}
              onClick={() => {
                navigate('/dashboard/notifications');
              }}
            >
              <div className={styles.notificationsIcon}>
                <img src={NotiIcon} alt='noti-icon' />
              </div>
              {true && <span className={styles.notificationsCount}>1</span>}
              <p>Notifications</p>
            </div>
          )}
          {/* pb */}
          <ProfileBox />
        </div>
      </div>
    </Fragment>
  );
});

export { TopNav };
