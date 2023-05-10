// react
import React, { Fragment, useEffect } from 'react';
// react router
import { useNavigate, useMatch } from 'react-router-dom';
// styles
import styles from './index.module.scss';
// services
import { logOutService } from '../../services/userServices';
// images
import SideNavLogo from '../../assets/img/side-nav-logo.svg';
import PulseIcon from '../../assets/icons/pulse-icon.svg';
import DevicesIcon from '../../assets/icons/swidro-icon.svg';
import AmenitiesIcon from '../../assets/icons/amenities-icon.svg';
import StaffIcon from '../../assets/icons/staff-icon.svg';
import SettingsIcon from '../../assets/icons/settings-icon.svg';
import logoutIcon from '../../assets/icons/logout-icon.svg';
/***************************************************************************/
/* Name : SideNav React Component */
/***************************************************************************/
const SideNav = React.memo(() => {
  // useNavigate
  const navigate = useNavigate();
  // useEffect
  useEffect(() => {
    (async () => {
      // calling load
    })();
  }, []);
  /***************************************************************************/
  /* Name : Menu Item */
  /* Description : Side nav list items */
  /***************************************************************************/
  const menuItems = [
    { label: 'Monitoring', icon: PulseIcon, path: '/dashboard/' },
    { label: 'Devices', icon: DevicesIcon, path: '/dashboard/devices' },
    { label: 'Amenities', icon: AmenitiesIcon, path: '/dashboard/amenities' },
    { label: 'Staff', icon: StaffIcon, path: '/dashboard/staff' },
    { label: 'Settings', icon: SettingsIcon, path: '/dashboard/settings' },
  ];
  /***************************************************************************/
  /* Name : logOutHandler */
  /* Description : logOutHandler */
  /***************************************************************************/
  const logOutHandler = async () => {
    // calling logOutService
    await logOutService();
    // navigate to sign in page
    navigate('/');
  };

  return (
    <Fragment>
      <div className={styles.sideNavContainer}>
        {/* Logo */}
        <div className={styles.logoContainer}>
          <img src={SideNavLogo} alt='logo' />
        </div>
        {/* Menu */}
        <div className={styles.sideNavMenu}>
          {menuItems.map((item) => {
            return (
              <div
                key={item.label}
                className={
                  useMatch(item.path)
                    ? styles.sideNavMenuItemActive
                    : styles.sideNavMenuItem
                }
                onClick={() => {
                  navigate(item.path);
                }}
              >
                <img src={item.icon} alt='icon' />
                <p>{item.label}</p>
              </div>
            );
          })}
        </div>
        {/* LogOut */}
        <div className={styles.sideNavLogOut} onClick={logOutHandler}>
          <img src={logoutIcon} alt='icon' />
          <p>Logout</p>
        </div>
      </div>
    </Fragment>
  );
});

export { SideNav };
