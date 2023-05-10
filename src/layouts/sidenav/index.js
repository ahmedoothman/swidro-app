// react
import React, { Fragment, useEffect } from 'react';

// styles
import styles from './index.module.scss';

/***************************************************************************/
/* Name : SideNav React Component */
/***************************************************************************/
const SideNav = React.memo(() => {
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
      <p>SideNav</p>
    </Fragment>
  );
});

export { SideNav };
