// react
import React, {
  Fragment,
  useEffect,
  useReducer,
  useState,
  useRef,
  useCallback,
} from 'react';
// styles
import styles from './index.module.scss';
// components
import { DashCore } from '../../../components/DashElements/DashPageCore';
import { FormPopUp } from '../../../components/formPopUp';
import { WideInputField } from '../../../components/inputs/WideInputField';
import { WideButton } from '../../../components/buttons/WideButton';
// Services
import {
  getDevicesDataServices,
  deleteDevicesDataServices,
  addDevicesDataServices,
  editDevicesDataServices,
} from '../../../services/devicesServices';
// Reducer
import {
  devicesStatesReducer,
  devicesStatesInitialState,
} from './indexReducer';
// MUI
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { SmallSpinner } from '../../../components/spinners/smallSpinner';

/***************************************************************************/
/* Name : Devices React Component */
/***************************************************************************/
const Devices = React.memo(() => {
  // state
  const [openForm, setOpenForm] = useState(false);
  const [editId, setEditId] = useState('');
  const [formMode, setFormMode] = useState('add'); // ['add', 'edit']
  // refs
  const deviceId = useRef();
  // Reducer
  const [devicesStates, dispatchDevicesStates] = useReducer(
    devicesStatesReducer,
    devicesStatesInitialState
  );
  // open form
  const openFormHandler = () => {
    setFormMode('add');
    setOpenForm(true);
  };
  // open form edit
  const openFormEditHandler = () => {
    setFormMode('edit');
    setOpenForm(true);
  };
  // close form
  const closeFormHandler = () => {
    setOpenForm(false);
  };
  // snackbar state
  const handleCloseSnackbar = () => {
    dispatchDevicesStates({ type: 'CLEAR' });
  };

  // state
  const [devicesData, setDevicesData] = useState([]);
  /***************************************************************************/
  /* Name : load Data */
  /* Description : get the staff data */
  /***************************************************************************/
  const loadData = async () => {
    // calling load
    dispatchDevicesStates({ type: 'PENDING' });
    const response = await getDevicesDataServices();
    if (response.status === 'success') {
      setDevicesData(response.dataArray);
      dispatchDevicesStates({ type: 'CLEAR' });
    } else if (response.status === 'error') {
      dispatchDevicesStates({
        type: 'ERROR',
        errorMessage: response.message,
      });
    }
  };
  /***************************************************************************/
  /* Name : validate Input */
  /* Description : validate the input fields */
  /***************************************************************************/
  const validateInput = useCallback((data) => {
    // check if the user name is empty
    if (data.deviceId === '') {
      dispatchDevicesStates({
        type: 'ERROR',
        errorMessage: 'User Name is required',
      });
      deviceId.current.activeError();
      return false;
    } else {
      deviceId.current.clearError();
    }
    return true;
  }, []);
  /***************************************************************************/
  /* Name : Add Devices*/
  /* Description : add the Devices data */
  /***************************************************************************/
  const addDevices = async () => {
    const data = {
      deviceId: deviceId.current.getInputValue(),
    };
    // validata the input
    const valid = validateInput(data);
    if (valid) {
      dispatchDevicesStates({ type: 'PENDING' });
      const response = await addDevicesDataServices(data);
      if (response.status === 'success') {
        dispatchDevicesStates({
          type: 'SUCCESS',
          successMessage: 'Devices Added Successfully',
        });
        // add the new Devices to the state
        const newDevicesData = [...devicesData];
        newDevicesData.push(response.data);
        setDevicesData(newDevicesData);
        closeFormHandler();
      } else {
        dispatchDevicesStates({
          type: 'ERROR',
          errorMessage: response.message,
        });
      }
    }
  };
  /***************************************************************************/
  /* Name : Open Edit Staff*/
  /* Description : Edit the staff data */
  /***************************************************************************/
  const openEditDevices = async (id) => {
    // get the staff data with id and put its info in the form
    const devices = devicesData.find((item) => item._id === id);
    deviceId.current.setInputValue(devices.deviceId);
    setEditId(id);
    // open the form
    openFormEditHandler();
  };
  /***************************************************************************/
  /* Name : Edit Devices*/
  /* Description : Edit the Devices data */
  /***************************************************************************/
  const editDevices = async (id) => {
    const data = {
      deviceId: deviceId.current.getInputValue(),
    };
    // open the form
    dispatchDevicesStates({ type: 'PENDING' });
    const response = await editDevicesDataServices(editId, data);
    if (response.status === 'success') {
      dispatchDevicesStates({
        type: 'SUCCESS',
        successMessage: 'Devices Edited Successfully',
      });
      // edit the Devices from the state
      const newDevicesData = devicesData.map((item) => {
        if (item._id === response.data._id) {
          return response.data;
        } else {
          return item;
        }
      });
      closeFormHandler();
      setDevicesData(newDevicesData);
    } else if (response.status === 'error') {
      dispatchDevicesStates({
        type: 'ERROR',
        errorMessage: response.message,
      });
    }
  };
  /***************************************************************************/
  /* Name : Delete Devices*/
  /* Description : delete the Devices data */
  /***************************************************************************/
  const deleteDevices = async (id) => {
    dispatchDevicesStates({ type: 'PENDING' });
    const response = await deleteDevicesDataServices(id);
    if (response.status === 'success') {
      dispatchDevicesStates({
        type: 'SUCCESS',
        successMessage: 'Devices Deleted Successfully',
      });
      // remove the Devices from the state
      const newDevicesData = devicesData.filter((item) => item._id !== id);
      setDevicesData(newDevicesData);
    } else if (response.status === 'error') {
      dispatchDevicesStates({
        type: 'ERROR',
        errorMessage: response.message,
      });
    }
  };
  /***************************************************************************/
  /* Name : add Battery level to Devices*/
  /* Description : Edit the Devices data */
  /***************************************************************************/
  const addBatteryLevel = async (id, battery) => {
    // from redux array find the battery level of the device based on deviceID and then put it in the battery field of each device
  };
  /***************************************************************************/
  /* Name : useEffect */
  /* Description : first function to load in the component */
  /***************************************************************************/
  useEffect(() => {
    (async () => {
      // calling load
      await loadData();
    })();
  }, []);
  return (
    <Fragment>
      <DashCore
        pageName='Devices'
        data={devicesData}
        openFormHandler={openFormHandler}
        deleteItem={deleteDevices}
        editItem={openEditDevices}
        pending={devicesStates.pending}
      />
      <FormPopUp open={openForm} handleClose={closeFormHandler}>
        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            <h1>{formMode === 'add' ? 'Add' : 'Edit'} Devices</h1>
          </div>
          <div className={styles.formBody}>
            <WideInputField
              type='TEXT'
              placeholder='Device ID'
              label='Device ID'
              ref={deviceId}
            />
            <div className={styles.formBtns}>
              {devicesStates.pending && <WideButton text={<SmallSpinner />} />}
              {!devicesStates.pending && (
                <WideButton
                  text={formMode === 'add' ? 'Add' : 'Edit'}
                  onPress={formMode === 'add' ? addDevices : editDevices}
                />
              )}
            </div>
          </div>
        </div>
      </FormPopUp>
      {/* ********** ERROR SNACKBAR ********** */}
      <Snackbar
        open={devicesStates.error}
        onClose={handleCloseSnackbar}
        autoHideDuration={20000}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Alert
          severity='error'
          onClose={handleCloseSnackbar}
          sx={{
            width: '100%',
            backgroundColor: '#D32F2F',
            color: '#fff',
            fontSize: '1.4rem',
            '& .MuiAlert-icon': {
              color: '#fff',
            },
          }}
        >
          {devicesStates.errorMessage}!
        </Alert>
      </Snackbar>
      {/* ********** SUCESS SNACKBAR ********** */}
      <Snackbar
        open={devicesStates.success}
        autoHideDuration={10000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity='success'
          sx={{
            width: '100%',
            backgroundColor: '#388E3C',
            color: '#fff',
            fontSize: '1.4rem',
            '& .MuiAlert-icon': {
              color: '#fff',
            },
          }}
        >
          {devicesStates.successMessage}!
        </Alert>
      </Snackbar>
    </Fragment>
  );
});

export { Devices };
