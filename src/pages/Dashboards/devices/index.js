// react
import React, { Fragment, useEffect } from 'react';

// styles
import styles from './index.module.scss';

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
      <p>Devices</p>
    </Fragment>
  );
});

export { Devices };
