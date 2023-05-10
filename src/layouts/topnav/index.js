// react
import React, { Fragment, useEffect } from 'react';

// styles
import styles from './index.module.scss';

/***************************************************************************/
/* Name : TopNav React Component */
/***************************************************************************/
const TopNav = React.memo(() => {
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
      <p>TopNav</p>
    </Fragment>
  );
});

export { TopNav };
