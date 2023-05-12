// react
import React, { Fragment, useEffect } from 'react';
// styles
import styles from './index.module.scss';
// components
import { DashCore } from '../../../components/DashElements/DashPageCore';

const amenitiesData = [
  {
    id: 1,
    name: 'Swimming Pool',
  },
  {
    id: 2,
    name: 'Gym',
  },
];

/***************************************************************************/
/* Name : Amenities React Component */
/***************************************************************************/
const Amenities = React.memo(() => {
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
      <DashCore pageName='Amenities' data={amenitiesData} />
    </Fragment>
  );
});

export { Amenities };
