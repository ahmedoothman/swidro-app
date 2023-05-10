// react
import React from 'react';
// react router
import { Outlet } from 'react-router-dom';
// styles
import styles from './index.module.scss';
// layout
import { SideNav } from '../../layouts/sidenav';
import { TopNav } from '../../layouts/topnav';
const DashboardPages = () => {
  // state
  return (
    <div className={styles.bodyContainer}>
      <div className={styles.SideNavContainer}>
        <SideNav />
      </div>
      <div className={styles.mainContainer}>
        <TopNav />
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardPages;
