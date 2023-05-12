// react
import React, { Fragment, useEffect } from 'react';
// styles
import styles from './index.module.scss';

/***************************************************************************/
/* Name : Notifications React Component */
/***************************************************************************/
const Notifications = React.memo(() => {
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
    <div className={styles.container}>
      <h1>Notifications</h1>
      <p>There is no notifications yet</p>
    </div>
  );
});

export { Notifications };
