// react
import React, { Fragment, useEffect } from 'react';
// styles
import styles from './index.module.scss';
// components
import { SelectComponent } from '../../../components/select';
import { DashPageBoxItem } from '../../../components/DashElements/DashPageBoxItem';
import { TopNavLG } from '../../../layouts/topnavlg';
const AmenitiesData = [
  {
    id: 1,
    name: 'Swimming Pool',
    value: 'swimming_pool_1',
  },
  {
    id: 2,
    name: 'Swimming Pool',
    value: 'swimming_pool_2',
  },
  {
    id: 3,
    name: 'Swimming Pool',
    value: 'swimming_pool_3',
  },
];
const SwimmerData = [
  {
    id: 1,
    name: 'John Doe',
    code: '1234',
    battery: '100',
    age: 22,
    gender: 'Male',
    heartRate: '80',
  },
  {
    id: 2,
    name: 'John Doe',
    code: '900',
    battery: '60',
    age: 22,
    gender: 'Male',
    heartRate: '80',
  },
  {
    id: 3,
    name: 'John Doe',
    code: '12',
    battery: '90',
    age: 22,
    gender: 'Male',
    heartRate: '80',
  },
  {
    id: 4,
    name: 'John Doe',
    code: '12',
    battery: '90',
    age: 22,
    gender: 'Male',
    heartRate: '80',
  },
];
/***************************************************************************/
/* Name : LifeguardMonitoring React Component */
/***************************************************************************/
const LifeguardMonitoring = React.memo(() => {
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
      <TopNavLG />
      <div className={styles.header}>
        <SelectComponent data={AmenitiesData} />
      </div>
      <div className={styles.mainBody}>
        {SwimmerData.map((el) => (
          <DashPageBoxItem key={el.id} data={el} />
        ))}
      </div>
    </Fragment>
  );
});

export { LifeguardMonitoring };
