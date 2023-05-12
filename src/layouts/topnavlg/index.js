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
import Logo from '../../assets/img/logo-blue-md.svg';
import LogOutIcon from '../../assets/icons/logout-icon-blue.svg';
import { logOutService } from '../../services/userServices';
/***************************************************************************/
/* Name : TopNav React Component */
/***************************************************************************/
const TopNavLG = React.memo(() => {
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
  const logOutHandler = async () => {
    // calling logOutService
    await logOutService();
    // navigate to sign in page
    navigate('/');
  };
  return (
    <Fragment>
      <div className={styles.topNavContainer}>
        <div className={styles.logo}>
          <img src={Logo} alt='logo' />
        </div>
        <div className={styles.rightBox}>
          <div className={styles.hostUrlBox} onClick={handleCopyClick}>
            <div className={styles.hostUrlTitle}>HOST URL</div>
            <div className={styles.hostUrl}>{hostUrl}</div>
            <div className={styles.hostUrlImg}>
              <img src={CopyIcon} alt='copy-icon' />
            </div>
          </div>
          <ProfileBox />
          <div className={styles.logOut} onClick={logOutHandler}>
            <img src={LogOutIcon} alt='logo' />
            log Out
          </div>
        </div>
      </div>
    </Fragment>
  );
});

export { TopNavLG };
