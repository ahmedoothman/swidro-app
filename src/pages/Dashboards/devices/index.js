// react
import React, { Fragment, useEffect } from 'react';
// styles
import styles from './index.module.scss';
// components
import { DashCore } from '../../../components/DashElements/DashPageCore';

const DevicesData = [
  {
    id: 1,
    name: 'Swidro',
    code: '1234',
    battery: '100%',
  },
  {
    id: 2,
    name: 'Swidro',
    code: '900',
    battery: '60%',
  },
  {
    id: 3,
    name: 'Swidro',
    code: '12',
    battery: '90%',
  },
];
/***************************************************************************/
/* Name : Devices React Component */
/***************************************************************************/
const Devices = React.memo(() => {
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
      <DashCore pageName='Devices' data={DevicesData} />
    </Fragment>
  );
});

export { Devices };
