// react
import React, { Fragment, useEffect } from 'react';
// styles
import styles from './index.module.scss';
// components
import { PageHeader } from '../DashPageHeader';
import { DashItem } from '../DashPageItem';
import { SmallSpinner } from '../../spinners/smallSpinner';
/***************************************************************************/
/* Name : Dash Core React Component */
/***************************************************************************/
const DashCore = React.memo(
  ({ pageName, data, pending, deleteItem, editItem, openFormHandler }) => {
    // useEffect
    useEffect(() => {
      (async () => {
        // calling load
      })();
    }, []);

    return (
      <Fragment>
        <div className={styles.dashCoreContainer}>
          <PageHeader pageName={pageName} openFormHandler={openFormHandler} />
          {pending && (
            <div className={styles.spinnerBox}>
              <SmallSpinner />
            </div>
          )}
          {!pending &&
            data.map((item) => {
              return (
                <DashItem
                  key={item._id}
                  pageName={pageName}
                  data={item}
                  onDelete={deleteItem}
                  onEdit={editItem}
                />
              );
            })}
        </div>
      </Fragment>
    );
  }
);

export { DashCore };
