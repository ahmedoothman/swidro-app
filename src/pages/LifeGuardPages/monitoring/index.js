// react
import React, { Fragment, useEffect, useCallback, useReducer } from 'react';
// styles
import styles from './index.module.scss';
// components
import { SelectComponent } from '../../../components/select';
import { DashPageBoxItem } from '../../../components/DashElements/DashPageBoxItem';
import { TopNavLG } from '../../../layouts/topnavlg';
// services
import { getSwimmersTodayDataServices } from '../../../services/swimmersServices';
import { getAmenitiesDataServices } from '../../../services/amenitiesServices';
// Reducer
import {
  monitoringStatesReducer,
  monitoringStatesInitialState,
} from './indexReducer';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../../store/auth-slice';
/***************************************************************************/
/* Name : LifeguardMonitoring React Component */
/***************************************************************************/
const LifeguardMonitoring = React.memo(() => {
  const dispatch = useDispatch();
  // get swimmers from redux
  let { swimmers } = useSelector((state) => state.auth);
  // get resort id
  const { resortId } = useSelector((state) => state.auth);
  // states
  const [monitoringStates, dispatchMonitoringStates] = useReducer(
    monitoringStatesReducer,
    monitoringStatesInitialState
  );
  /***************************************************************************/
  /* Name : get swimmers for today */
  /* Description : get the staff data */
  /***************************************************************************/
  const getSwimmersToday = useCallback(async () => {
    // calling load
    dispatchMonitoringStates({ type: 'PENDING' });
    const response = await getSwimmersTodayDataServices();
    if (response.status === 'success') {
      // add battery and heart rate to the data
      const swimmersArray = response.dataArray.map((el) => ({
        name: el.name,
        _id: el._id,
        deviceId: el.deviceId,
        age: el.age,
        gender: el.gender,
        amenity: el.amenity,
        status: el.status,
        battery: 'N/A',
        heartRate: 'N/A',
      }));
      // add the new swimmers to the redux
      dispatch(authActions.addArraytoSwimmers(swimmersArray));
      dispatchMonitoringStates({ type: 'CLEAR' });
    } else {
      // set the error
      dispatchMonitoringStates({
        type: 'ERROR',
        errorMessage: response.message,
      });
    }
  }, []);
  // useEffect
  useEffect(() => {
    (async () => {
      // calling load
      await loadData();
    })();
  }, []);
  /***************************************************************************/
  /* Name : load Data */
  /* Description : get the staff data */
  /***************************************************************************/
  const loadData = async () => {
    // calling load
    dispatchMonitoringStates({ type: 'PENDING' });
    // get amenities
    // await getAmenities();
    // get swimmers
    await getSwimmersToday();
    // clear pending
    dispatchMonitoringStates({ type: 'CLEAR' });
  };
  /***************************************************************************/
  /* Name : load */
  /* Description : load */
  /***************************************************************************/

  return (
    <Fragment>
      <TopNavLG />
      <div className={styles.header}></div>
      <div className={styles.mainBody}>
        {swimmers.map((el) => (
          <DashPageBoxItem key={el._id} data={el} admin={false} />
        ))}
      </div>
    </Fragment>
  );
});

export { LifeguardMonitoring };
