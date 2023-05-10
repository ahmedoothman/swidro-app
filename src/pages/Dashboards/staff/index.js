// react
import React, { Fragment, useEffect } from 'react';

// styles
import styles from './index.module.scss';

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
      <p>Staff</p>
    </Fragment>
  );
});

export { Staff };
