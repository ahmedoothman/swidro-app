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
import { AddBtn } from '../../../components/buttons/AddBtn';
import { DashPageBoxItem } from '../../../components/DashElements/DashPageBoxItem';
import { SmallSpinner } from '../../../components/spinners/smallSpinner';
// Services
import { getAmenitiesDataServices } from '../../../services/amenitiesServices';
import {
  getSwimmersTodayDataServices,
  addSwimmersDataServices,
  deleteSwimmersDataServices,
  editSwimmersDataServices,
} from '../../../services/swimmersServices';
// Reducer
import {
  monitoringStatesReducer,
  monitoringStatesInitialState,
} from './indexReducer';

// MUI
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../../store/auth-slice';
/***************************************************************************/
/* Name : Monitoring React Component */
/***************************************************************************/
const Monitoring = React.memo(() => {
  const [monitoringStates, dispatchMonitoringStates] = useReducer(
    monitoringStatesReducer,
    monitoringStatesInitialState
  );
  // state
  const [openForm, setOpenForm] = useState(false);
  const [editId, setEditId] = useState('');
  const [formMode, setFormMode] = useState('add'); // ['add', 'edit']
  const [amenitiesSelected, setAmenitiesSelected] = useState('pool 232');
  const [amenitiesForm, setAmenitiesForm] = useState('pool 232');
  const [amenitiesData, setAmenitiesData] = useState([]);
  // useState for gender select
  const [gender, setGender] = useState('male');
  // get swimmers from redux
  let { swimmers } = useSelector((state) => state.auth);
  // get resort id
  const { resortId } = useSelector((state) => state.auth);
  // dispatch
  const dispatch = useDispatch();
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
    dispatchMonitoringStates({ type: 'CLEAR' });
  };
  // refs
  const customerName = useRef();
  const customerAge = useRef();
  const customerDeviceId = useRef();
  /***************************************************************************/
  /* Name : Open Edit Staff*/
  /* Description : Edit the staff data */
  /***************************************************************************/
  const openEditFormWithData = async (id) => {
    // get the staff data with id and put its info in the form
    // const devices = devicesData.find((item) => item._id === id);
    // deviceId.current.setInputValue(devices.deviceId);
    setEditId(id);
    // edit the data from redux
    const swimmer = swimmers.find((item) => item._id === id);
    customerName.current.setInputValue(swimmer.name);
    customerAge.current.setInputValue(swimmer.age);
    customerDeviceId.current.setInputValue(swimmer.deviceId);
    setGender(swimmer.gender);
    setAmenitiesForm(swimmer.amenity);
    openFormEditHandler();
  };
  /***************************************************************************/
  /* Name : get Amenities */
  /* Description : get the staff data */
  /***************************************************************************/
  const getAmenities = useCallback(async () => {
    // calling load
    dispatchMonitoringStates({ type: 'PENDING' });
    const response = await getAmenitiesDataServices();
    if (response.status === 'success') {
      // set the data
      const amenitiesArray = response.dataArray.map((el) => ({
        id: el._id,
        value: el.name,
      }));
      setAmenitiesData(amenitiesArray);
      setAmenitiesSelected(amenitiesArray[0].value);
      setAmenitiesForm(amenitiesArray[0].value);
    } else {
      // set the error
      dispatchMonitoringStates({
        type: 'ERROR',
        errorMessage: response.message,
      });
    }
    dispatchMonitoringStates({ type: 'CLEAR' });
  }, []);
  /***************************************************************************/
  /* Name : get swimmers for today */
  /* Description : get the staff data */
  /***************************************************************************/
  const getSwimmersToday = useCallback(async (amenity) => {
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
  /***************************************************************************/
  /* Name : load Data */
  /* Description : get the staff data */
  /***************************************************************************/
  const loadData = async () => {
    // calling load
    dispatchMonitoringStates({ type: 'PENDING' });
    // get amenities
    await getAmenities();
    // get swimmers
    await getSwimmersToday(amenitiesSelected);
    // clear pending
    dispatchMonitoringStates({ type: 'CLEAR' });
  };
  /***************************************************************************/
  /* Name : add Data */
  /* Description : add the staff data */
  /***************************************************************************/
  const addData = async () => {
    // calling add
    dispatchMonitoringStates({ type: 'PENDING' });
    // get the data fromt the refs
    const data = {
      name: customerName.current.getInputValue(),
      gender: gender,
      age: customerAge.current.getInputValue(),
      deviceId: customerDeviceId.current.getInputValue(),
      resort: resortId,
      amenity: amenitiesForm,
      battery: 'N/A',
      heartRate: 'N/A',
      status: 'normal',
    };
    // send it to the server
    const response = await addSwimmersDataServices(data);
    if (response.status === 'success') {
      dispatchMonitoringStates({
        type: 'SUCCESS',
        successMessage: 'Swimmer Added Successfully',
      });
      // add the new Amenities to the state
      const newSwimmersData = [...swimmers];
      newSwimmersData.push(response.data);
      closeFormHandler();
      // add the new Swimmers to the redux
      dispatch(authActions.addtoSwimmers(data));
    } else {
      dispatchMonitoringStates({
        type: 'ERROR',
        errorMessage: response.message,
      });
    }
  };
  /***************************************************************************/
  /* Name : edit Data */
  /* Description : add the staff data */
  /***************************************************************************/
  const editData = async () => {
    dispatchMonitoringStates({ type: 'PENDING' });
    // get the data fromt the refs
    const data = {
      name: customerName.current.getInputValue(),
      age: customerAge.current.getInputValue(),
      deviceId: customerDeviceId.current.getInputValue(),
      amenity: amenitiesForm,
      gender: gender,
    };
    // send it to the server
    const response = await editSwimmersDataServices(editId, data);
    if (response.status === 'success') {
      dispatchMonitoringStates({
        type: 'SUCCESS',
        successMessage: 'Swimmer Edited Successfully',
      });
      // add the new Swimmers to the state
      dispatch(authActions.updateSwimmer(response.data));
      closeFormHandler();
    } else {
      dispatchMonitoringStates({
        type: 'ERROR',
        errorMessage: response.message,
      });
    }
  };
  /***************************************************************************/
  /* Name : delete Data */
  /* Description : add the staff data */
  /***************************************************************************/
  const deleteData = async (id) => {
    dispatchMonitoringStates({ type: 'PENDING' });
    // send it to the server
    const response = await deleteSwimmersDataServices(id);
    if (response.status === 'success') {
      dispatchMonitoringStates({
        type: 'SUCCESS',
        successMessage: 'Swimmer Deleted Successfully',
      });
      // add the new Amenities to the state
      dispatch(authActions.removeSwimmer(id));
    } else {
      dispatchMonitoringStates({
        type: 'ERROR',
        errorMessage: response.message,
      });
    }
  };
  // useEffect
  useEffect(() => {
    (async () => {
      await loadData();
    })();
  }, []);
  return (
    <Fragment>
      <div className={styles.header}>
        <div className={styles.SelectBox}>
          {' '}
          {/* Select */}
          <FormControl
            fullWidth
            sx={{
              '& .MuiInputBase-root': {
                fontSize: '1.3rem',
              },
            }}
          >
            <InputLabel
              id='demo-simple-select-label'
              sx={{
                fontSize: '1.3rem',
              }}
            >
              Select Amenity
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={amenitiesSelected}
              label='Select Amenity'
              onChange={async (e) => {
                setAmenitiesSelected(e.target.value);
              }}
            >
              {amenitiesData.map((el) => (
                <MenuItem key={el.id} value={el.value}>
                  {el.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className={styles.addBtn}>
          <AddBtn text='Add' onPress={openFormHandler} />
        </div>
      </div>
      <div className={styles.mainBody}>
        {swimmers.map((el) => (
          <DashPageBoxItem
            key={el._id}
            data={el}
            onEdit={openEditFormWithData}
            onDelete={deleteData}
            admin={true}
          />
        ))}
      </div>
      <FormPopUp open={openForm} handleClose={closeFormHandler}>
        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            <h1>{formMode === 'add' ? 'Add' : 'Edit'} Devices</h1>
          </div>
          <div className={styles.formBody}>
            <WideInputField
              type='TEXT'
              placeholder='Customer Name'
              label='Customer Name'
              ref={customerName}
            />
            {/* Select Box Gender */}
            <FormControl
              fullWidth
              sx={{
                '& .MuiInputBase-root': {
                  fontSize: '1.3rem',
                  marginBottom: '1rem',
                },
              }}
            >
              <InputLabel
                id='demo-simple-select-label'
                sx={{
                  fontSize: '1.3rem',
                }}
              >
                Select Gender
              </InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={gender}
                label='Select Gender'
                onChange={(e) => setGender(e.target.value)}
              >
                <MenuItem value='male'>male</MenuItem>
                <MenuItem value='female'>female</MenuItem>
              </Select>
            </FormControl>
            <WideInputField
              type='TEXT'
              placeholder='Age'
              label='Age'
              ref={customerAge}
            />
            {/* Select Box Amenity */}
            <FormControl
              fullWidth
              sx={{
                '& .MuiInputBase-root': {
                  fontSize: '1.3rem',
                  marginBottom: '1rem',
                },
              }}
            >
              <InputLabel
                id='demo-simple-select-label'
                sx={{
                  fontSize: '1.3rem',
                }}
              >
                Select Amenity
              </InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={amenitiesForm}
                label='Select Amenity'
                onChange={(e) => setAmenitiesForm(e.target.value)}
              >
                {amenitiesData.map((el) => (
                  <MenuItem key={el.id} value={el.value}>
                    {el.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <WideInputField
              type='TEXT'
              placeholder='Device ID'
              label='Device ID'
              ref={customerDeviceId}
            />
            <div className={styles.formBtns}>
              {monitoringStates.pending && (
                <WideButton text={<SmallSpinner />} />
              )}
              {!monitoringStates.pending && (
                <WideButton
                  text={formMode === 'add' ? 'Add' : 'Edit'}
                  onPress={formMode === 'add' ? addData : editData}
                />
              )}
            </div>
          </div>
        </div>
      </FormPopUp>
      {/* ********** ERROR SNACKBAR ********** */}
      <Snackbar
        open={monitoringStates.error}
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
          {monitoringStates.errorMessage}!
        </Alert>
      </Snackbar>
      {/* ********** SUCESS SNACKBAR ********** */}
      <Snackbar
        open={monitoringStates.success}
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
          {monitoringStates.successMessage}!
        </Alert>
      </Snackbar>
    </Fragment>
  );
});

export { Monitoring };
