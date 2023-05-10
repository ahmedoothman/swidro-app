// react router
import { Outlet } from 'react-router-dom';
// styles
import styles from './index.module.scss';
// layout
import { SideNav } from '../../layouts/sidenav';
import { TopNav } from '../../layouts/topnav';
// images
import WideLogo from '../../assets/img/colored-logo-big.png';
const DashboardPages = () => {
  return (
    <div className={styles.dashboardPagesContainer}>
      <div className={styles.logo}>
        <div>
          <img src={WideLogo} alt='WideLogo' />
        </div>
      </div>
      <div className={styles.bodyContainer}>
        <div>
          <SideNav />
        </div>
        <div>
          <TopNav />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardPages;
