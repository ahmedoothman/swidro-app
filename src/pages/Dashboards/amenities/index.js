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
  getAmenitiesDataServices,
  deleteAmenitiesDataServices,
  addAmenitiesDataServices,
  editAmenitiesDataServices,
} from '../../../services/amenitiesServices';
// Reducer
import {
  amenitiesStatesReducer,
  amenitiesStatesInitialState,
} from './indexReducer';
// MUI
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { SmallSpinner } from '../../../components/spinners/smallSpinner';

/***************************************************************************/
/* Name : Amenities React Component */
/***************************************************************************/
const Amenities = React.memo(() => {
  // state
  const [openForm, setOpenForm] = useState(false);
  const [editId, setEditId] = useState('');
  const [formMode, setFormMode] = useState('add'); // ['add', 'edit']
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
    dispatchAmenitiesStates({ type: 'CLEAR' });
  };
  // refs
  const amenitiesNameRef = useRef();
  // Reducer
  const [amenitiesStates, dispatchAmenitiesStates] = useReducer(
    amenitiesStatesReducer,
    amenitiesStatesInitialState
  );
  // state
  const [amenitiesData, setAmenitiesData] = useState([]);
  /***************************************************************************/
  /* Name : load Data */
  /* Description : get the staff data */
  /***************************************************************************/
  const loadData = async () => {
    // calling load
    dispatchAmenitiesStates({ type: 'PENDING' });
    const response = await getAmenitiesDataServices();
    if (response.status === 'success') {
      setAmenitiesData(response.dataArray);
      dispatchAmenitiesStates({ type: 'CLEAR' });
    } else if (response.status === 'error') {
      dispatchAmenitiesStates({
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
    if (data.name === '') {
      dispatchAmenitiesStates({
        type: 'ERROR',
        errorMessage: 'User Name is required',
      });
      amenitiesNameRef.current.activeError();
      return false;
    } else {
      amenitiesNameRef.current.clearError();
    }
    return true;
  }, []);
  /***************************************************************************/
  /* Name : Add Amenities*/
  /* Description : add the Amenities data */
  /***************************************************************************/
  const addAmenities = async () => {
    const data = {
      name: amenitiesNameRef.current.getInputValue(),
    };
    // validata the input
    const valid = validateInput(data);
    if (valid) {
      dispatchAmenitiesStates({ type: 'PENDING' });
      const response = await addAmenitiesDataServices(data);
      if (response.status === 'success') {
        dispatchAmenitiesStates({
          type: 'SUCCESS',
          successMessage: 'Amenities Added Successfully',
        });
        // add the new Amenities to the state
        const newAmenitiesData = [...amenitiesData];
        newAmenitiesData.push(response.data);
        setAmenitiesData(newAmenitiesData);
        closeFormHandler();
      } else {
        dispatchAmenitiesStates({
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
  const openEditAmenities = async (id) => {
    // get the staff data with id and put its info in the form
    const amenities = amenitiesData.find((item) => item._id === id);
    amenitiesNameRef.current.setInputValue(amenities.name);
    setEditId(id);
    // open the form
    openFormEditHandler();
  };
  /***************************************************************************/
  /* Name : Edit Amenities*/
  /* Description : Edit the Amenities data */
  /***************************************************************************/
  const editAmenities = async (id) => {
    const data = {
      name: amenitiesNameRef.current.getInputValue(),
    };
    // open the form
    dispatchAmenitiesStates({ type: 'PENDING' });
    const response = await editAmenitiesDataServices(editId, data);
    if (response.status === 'success') {
      dispatchAmenitiesStates({
        type: 'SUCCESS',
        successMessage: 'Amenities Edited Successfully',
      });
      // edit the Amenities from the state
      const newAmenitiesData = amenitiesData.map((item) => {
        if (item._id === response.data._id) {
          return response.data;
        } else {
          return item;
        }
      });
      closeFormHandler();
      setAmenitiesData(newAmenitiesData);
    } else if (response.status === 'error') {
      dispatchAmenitiesStates({
        type: 'ERROR',
        errorMessage: response.message,
      });
    }
  };
  /***************************************************************************/
  /* Name : Delete Amenities*/
  /* Description : delete the Amenities data */
  /***************************************************************************/
  const deleteAmenities = async (id) => {
    dispatchAmenitiesStates({ type: 'PENDING' });
    const response = await deleteAmenitiesDataServices(id);
    if (response.status === 'success') {
      dispatchAmenitiesStates({
        type: 'SUCCESS',
        successMessage: 'Amenities Deleted Successfully',
      });
      // remove the Amenities from the state
      const newAmenitiesData = amenitiesData.filter((item) => item._id !== id);
      setAmenitiesData(newAmenitiesData);
    } else if (response.status === 'error') {
      dispatchAmenitiesStates({
        type: 'ERROR',
        errorMessage: response.message,
      });
    }
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
        pageName='Amenities'
        data={amenitiesData}
        openFormHandler={openFormHandler}
        deleteItem={deleteAmenities}
        editItem={openEditAmenities}
        pending={amenitiesStates.pending}
      />
      <FormPopUp open={openForm} handleClose={closeFormHandler}>
        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            <h1>{formMode === 'add' ? 'Add' : 'Edit'} Amenities</h1>
          </div>
          <div className={styles.formBody}>
            <WideInputField
              type='TEXT'
              placeholder='Name'
              label='Name'
              ref={amenitiesNameRef}
            />
            <div className={styles.formBtns}>
              {amenitiesStates.pending && (
                <WideButton text={<SmallSpinner />} />
              )}
              {!amenitiesStates.pending && (
                <WideButton
                  text={formMode === 'add' ? 'Add' : 'Edit'}
                  onPress={formMode === 'add' ? addAmenities : editAmenities}
                />
              )}
            </div>
          </div>
        </div>
      </FormPopUp>
      {/* ********** ERROR SNACKBAR ********** */}
      <Snackbar
        open={amenitiesStates.error}
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
          {amenitiesStates.errorMessage}!
        </Alert>
      </Snackbar>
      {/* ********** SUCESS SNACKBAR ********** */}
      <Snackbar
        open={amenitiesStates.success}
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
          {amenitiesStates.successMessage}!
        </Alert>
      </Snackbar>
    </Fragment>
  );
});

export { Amenities };
