// react
import React, { Fragment, useEffect } from 'react';
// styles
import styles from './index.module.scss';
// Components
import { DashCore } from '../../../components/Elements/DashPageCore';

const StaffData = [
  {
    id: 1,
    name: 'John Doe',
    role: 'Admin',
  },
  {
    id: 2,
    name: 'John Doe',
    role: 'Admin',
  },
];
/***************************************************************************/
/* Name : Staff React Component */
/***************************************************************************/
const Staff = React.memo(() => {
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
      <DashCore pageName='Staff' data={StaffData} />
    </Fragment>
  );
});

export { Staff };
