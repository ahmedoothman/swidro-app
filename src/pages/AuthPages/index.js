// react router
import { Outlet } from 'react-router-dom';
// styles
import styles from './index.module.scss';
// images
import WideLogo from '../../assets/img/colored-logo-big.png';
const AuthPages = () => {
  return (
    <div className={styles.authPagesContainer}>
      <div className={styles.logo}>
        <div>
          <img src={WideLogo} alt='WideLogo' />
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthPages;
