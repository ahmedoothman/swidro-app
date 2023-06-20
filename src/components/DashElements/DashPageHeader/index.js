// react
import React, { Fragment, useEffect } from 'react';
// styles
import styles from './index.module.scss';
// components
import { AddBtn } from '../../buttons/AddBtn';
const DevicesLabel = {
  1: `Name`,
  2: 'Code',
  3: 'Battery',
  4: 'Actions',
};
const StaffLabel = {
  1: `Name`,
  2: 'Role',
  4: 'Actions',
};
const Amenities = {
  1: `Name`,
  2: 'Actions',
};

/***************************************************************************/
/* Name : PageHeader React Component */
/***************************************************************************/
const PageHeader = React.memo(({ pageName, openFormHandler }) => {
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
      <div className={styles.pageHeaderContainer}>
        <div className={styles.pageHeaderTop}>
          <h1>{pageName}</h1>
          <AddBtn text='Add' onPress={openFormHandler} />
        </div>
        <div className={styles.pageHeaderBottom}>
          {pageName === 'Devices' &&
            Object.keys(DevicesLabel).map((key) => {
              return <p key={key}>{DevicesLabel[key]}</p>;
            })}
          {pageName === 'Staff' &&
            Object.keys(StaffLabel).map((key) => {
              return <p key={key}>{StaffLabel[key]}</p>;
            })}
          {pageName === 'Amenities' &&
            Object.keys(Amenities).map((key) => {
              return <p key={key}>{Amenities[key]}</p>;
            })}
        </div>
      </div>
    </Fragment>
  );
});

export { PageHeader };
