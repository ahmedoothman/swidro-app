// react
import React, { Fragment, useEffect } from 'react';

// styles
import styles from './index.module.scss';

/***************************************************************************/
/* Name : Settings React Component */
/***************************************************************************/
const Settings = React.memo(() => {
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
      <p>Settings</p>
    </Fragment>
  );
});

export { Settings };
