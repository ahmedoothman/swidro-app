// react
import React, { Fragment, useEffect } from 'react';
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
const DashPageBoxItem = React.memo(({ data, onDelete, onEdit }) => {
  /***************************************************************************/
  /* Edit Handler */
  /***************************************************************************/
  const editHandler = () => {
    // check if the function is passed
    if (!onEdit) return;
    onEdit(data._id);
  };
  /***************************************************************************/
  /* Delete Handler */
  /***************************************************************************/
  const deleteHandler = () => {
    // check if the function is passed
    if (!onDelete) return;
    onDelete(data._id);
  };
  // useEffect
  useEffect(() => {
    (async () => {
      //calling load
    })();
  }, []);

  return (
    <Fragment>
      <div className={styles.container}>
        <div
          className={styles.infoPart}
          style={{
            backgroundColor: data.status === 'normal' ? '#273c75' : '#d63031',
          }}
        >
          <div className={styles.topActions}>
            <div className={styles.code}>
              <div className={styles.iconContainer}>
                <img src={DeviceIcon} alt='icon' />
              </div>
              {data.deviceId}
            </div>
            <div className={styles.actions}>
              <EditBtn onPress={editHandler} />
              <DeleteBtn onPress={deleteHandler} />
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
