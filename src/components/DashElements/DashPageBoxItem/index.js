// react
import React, { Fragment } from 'react';
// styles
import styles from './index.module.scss';
// components
import { EditBtn } from '../../buttons/EditBtn';
import { DeleteBtn } from '../../buttons/DeleteBtn';
// imgs
import DeviceIcon from '../../../assets/icons/device-icon-sm.svg';
import UserIcon from '../../../assets/icons/user-icon-md.svg';
import HeartRateIcon from '../../../assets/icons/heart-rate-icon.svg';
import BatteryIcon from '../../../assets/icons/battery-icon.svg';
/***************************************************************************/
/* Name : DashPageBoxItem React Component */
/***************************************************************************/
const DashPageBoxItem = React.memo(({ data }) => {
  return (
    <Fragment>
      <div className={styles.container}>
        <div className={styles.infoPart}>
          <div className={styles.topActions}>
            <div className={styles.code}>
              <div className={styles.iconContainer}>
                <img src={DeviceIcon} alt='icon' />
              </div>
              {data.code}
            </div>
            <div className={styles.actions}>
              <EditBtn />
              <DeleteBtn />
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles.userImage}>
              <img src={UserIcon} alt='icon' />
            </div>
            <div className={styles.name}>{data.name}</div>
            <div className={styles.otherInfo}>
              <p>{data.gender}</p>
              <p>{data.age}</p>
            </div>
          </div>
        </div>
        <div className={styles.statusPart}>
          <div>
            <img src={HeartRateIcon} alt='icon' />
            {data.heartRate} BPM
          </div>
          <div>
            <img src={BatteryIcon} alt='icon' />
            {data.battery}%
          </div>
        </div>
      </div>
    </Fragment>
  );
});

export { DashPageBoxItem };
