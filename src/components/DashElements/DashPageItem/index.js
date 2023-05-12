// react
import React, { Fragment, useEffect } from 'react';
// styles
import styles from './index.module.scss';
// components
import { DeleteBtn } from '../../buttons/DeleteBtn';
import { EditBtn } from '../../buttons/EditBtn';

/***************************************************************************/
/* Name : Item React Component */
/***************************************************************************/
const DashItem = React.memo(({ pageName, onDelete, onEdit, data }) => {
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
      <div className={styles.dashItemContainer}>
        {pageName === 'Devices' && (
          <Fragment>
            <div className={styles.dashItemField}>{data.name}</div>
            <div className={styles.dashItemField}>{data.code}</div>
            <div className={styles.dashItemField}>{data.battery}</div>
          </Fragment>
        )}
        {pageName === 'Staff' && (
          <Fragment>
            <div className={styles.dashItemField}>{data.name}</div>
            <div className={styles.dashItemField}>{data.role}</div>
          </Fragment>
        )}
        {pageName === 'Amenities' && (
          <Fragment>
            <div className={styles.dashItemField}>{data.name}</div>
          </Fragment>
        )}
        <div className={styles.actionsBox}>
          <DeleteBtn text='Delete' onPress={onDelete} />
          <EditBtn text='Edit' onPress={onEdit} />
        </div>
      </div>
    </Fragment>
  );
});

export { DashItem };
