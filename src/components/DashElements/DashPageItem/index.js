// react
import React, { Fragment, useEffect } from 'react';
// styles
import styles from './index.module.scss';
// components
import { DeleteBtn } from '../../buttons/DeleteBtn';
import { EditBtn } from '../../buttons/EditBtn';
import { SmallSpinner } from '../../spinners/smallSpinner';
/***************************************************************************/
/* Name : Item React Component */
/***************************************************************************/
const DashItem = React.memo(({ pageName, onDelete, onEdit, data, pending }) => {
  // useEffect
  useEffect(() => {
    (async () => {
      // calling load
      // console.log(pending);
    })();
  }, []);

  /***************************************************************************/
  /* Name : delete item */
  /* Description : delete item */
  /***************************************************************************/
  const deleteItem = async () => {
    onDelete(data._id);
  };
  /***************************************************************************/
  /* Name : edit item */
  /* Description : delete item */
  /***************************************************************************/
  const editItem = async () => {
    onEdit(data._id);
  };
  return (
    <Fragment>
      <div className={styles.dashItemContainer}>
        {pageName === 'Devices' && (
          <Fragment>
            <div
              className={styles.dashItemField}
              style={{
                backgroundColor: data.available ? '#273c75' : '#d63031',
                display: 'flex',
                width: '16%',
                marginRight: '10%',
                padding: '10px',
                borderRadius: '5px',
                color: 'white',
              }}
            >
              {data.name}
            </div>
            <div className={styles.dashItemField}>{data.deviceId}</div>
            <div className={styles.dashItemField}>{data.battery}</div>
          </Fragment>
        )}
        {pageName === 'Staff' && (
          <Fragment>
            <div className={styles.dashItemField}>{data.userName}</div>
            <div className={styles.dashItemField}>{data.role}</div>
          </Fragment>
        )}
        {pageName === 'Amenities' && (
          <Fragment>
            <div className={styles.dashItemField}>{data.name}</div>
          </Fragment>
        )}
        <div className={styles.actionsBox}>
          <DeleteBtn text='Delete' onPress={deleteItem} />
          <EditBtn text='Edit' onPress={editItem} />
        </div>
      </div>
    </Fragment>
  );
});

export { DashItem };
