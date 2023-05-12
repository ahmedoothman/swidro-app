// react
import React, { Fragment, useEffect } from 'react';
// styles
import styles from './index.module.scss';
// components
import { PageHeader } from '../DashPageHeader';
import { DashItem } from '../DashPageItem';
/***************************************************************************/
/* Name : Dash Core React Component */
/***************************************************************************/
const DashCore = React.memo(({ pageName, data }) => {
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
      <div className={styles.dashCoreContainer}>
        <PageHeader pageName={pageName} />
        {data.map((item) => {
          return <DashItem key={item.id} pageName={pageName} data={item} />;
        })}
      </div>
    </Fragment>
  );
});

export { DashCore };
