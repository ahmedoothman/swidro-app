// react
import React, {
  Fragment,
  useEffect,
  useState,
  useReducer,
  useRef,
  useCallback,
} from 'react';
// styles
import styles from './index.module.scss';
// Components
import { DashCore } from '../../../components/DashElements/DashPageCore';
import { FormPopUp } from '../../../components/formPopUp';
import { WideInputField } from '../../../components/inputs/WideInputField';
import { WideButton } from '../../../components/buttons/WideButton';
// Services
import {
  getStaffDataServices,
  deleteStaffDataServices,
  addStaffDataServices,
  editStaffDataServices,
} from '../../../services/staffServices';
// Reducer
import { staffStatesReducer, staffStatesInitialState } from './indexReducer';
// MUI
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { SmallSpinner } from '../../../components/spinners/smallSpinner';
/***************************************************************************/
/* Name : Staff React Component */
/***************************************************************************/
const Staff = React.memo(() => {
  // States
  const [StaffData, setStaffData] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [editId, setEditId] = useState('');
  const [formMode, setFormMode] = useState('add'); // ['add', 'edit']
  const [role, setRole] = useState('lifeguard');
  // refs
  const userNameInputRef = useRef();
  const passwordInputRef = useRef();
  const PasswordConfirmInputRef = useRef();
  // Reducer
  const [staffStates, dispatchStaffStates] = useReducer(
    staffStatesReducer,
    staffStatesInitialState
  );
  // Select
  const handleChange = (event) => {
    setRole(event.target.value);
  };
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
    dispatchStaffStates({ type: 'CLEAR' });
  };
  /***************************************************************************/
  /* Name : load Data */
  /* Description : get the staff data */
  /***************************************************************************/
  const loadData = async () => {
    // calling load
    dispatchStaffStates({ type: 'PENDING' });
    const response = await getStaffDataServices();
    if (response.status === 'success') {
      setStaffData(response.dataArray);
      dispatchStaffStates({ type: 'CLEAR' });
    } else if (response.status === 'error') {
      dispatchStaffStates({
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
    if (data.userName === '') {
      dispatchStaffStates({
        type: 'ERROR',
        errorMessage: 'User Name is required',
      });
      userNameInputRef.current.activeError();
      return false;
    } else {
      userNameInputRef.current.clearError();
    }
    // check if the password is empty
    if (data.password === '') {
      dispatchStaffStates({
        type: 'ERROR',
        errorMessage: 'Password is required',
      });
      passwordInputRef.current.activeError();
      return false;
    } else {
      passwordInputRef.current.clearError();
    }

    // check if the confirm password is empty
    if (data.passwordConfirm === '') {
      dispatchStaffStates({
        type: 'ERROR',
        errorMessage: 'Confirm Password is required',
      });
      PasswordConfirmInputRef.current.activeError();
      return false;
    } else {
      PasswordConfirmInputRef.current.clearError();
    }
    // check if the password and confirm password are the same
    if (data.password !== data.passwordConfirm) {
      dispatchStaffStates({
        type: 'ERROR',
        errorMessage: 'Password and Confirm Password are not the same',
      });
      passwordInputRef.current.activeError();
      PasswordConfirmInputRef.current.activeError();
      return false;
    } else {
      passwordInputRef.current.clearError();
      PasswordConfirmInputRef.current.clearError();
    }
    return true;
  }, []);
  /***************************************************************************/
  /* Name : Add Staff*/
  /* Description : add the staff data */
  /***************************************************************************/
  const addStaff = async () => {
    const data = {
      userName: userNameInputRef.current.getInputValue(),
      password: passwordInputRef.current.getInputValue(),
      passwordConfirm: PasswordConfirmInputRef.current.getInputValue(),
      role: role,
    };

    // validata the input
    const valid = validateInput(data);
    if (valid) {
      dispatchStaffStates({ type: 'PENDING' });
      const response = await addStaffDataServices(data);
      if (response.status === 'success') {
        dispatchStaffStates({
          type: 'SUCCESS',
          successMessage: 'Staff Added Successfully',
        });
        // add the new staff to the state
        const newStaffData = [...StaffData];
        newStaffData.push(response.data);
        setStaffData(newStaffData);
        closeFormHandler();
      } else {
        dispatchStaffStates({
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
  const openEditStaff = async (id) => {
    // get the staff data with id and put its info in the form
    const staff = StaffData.find((item) => item._id === id);
    userNameInputRef.current.setInputValue(staff.userName);
    setRole(staff.role);
    setEditId(id);
    // open the form
    openFormEditHandler();
  };
  /***************************************************************************/
  /* Name : Edit Staff*/
  /* Description : Edit the staff data */
  /***************************************************************************/
  const editStaff = async (id) => {
    const data = {
      userName: userNameInputRef.current.getInputValue(),
      role: role,
    };
    if (passwordInputRef.current.getInputValue() !== '') {
      data.password = passwordInputRef.current.getInputValue();
      if (
        PasswordConfirmInputRef.current.getInputValue() !==
        passwordInputRef.current.getInputValue()
      ) {
        // dispatch error
        dispatchStaffStates({
          type: 'ERROR',
          errorMessage: 'Password and Confirm Password are not the same',
        });
        passwordInputRef.current.activeError();
        PasswordConfirmInputRef.current.activeError();
        return;
      } else {
        data.passwordConfirm = PasswordConfirmInputRef.current.getInputValue();
        passwordInputRef.current.clearError();
        PasswordConfirmInputRef.current.clearError();
      }
    }
    // open the form
    dispatchStaffStates({ type: 'PENDING' });
    const response = await editStaffDataServices(editId, data);
    if (response.status === 'success') {
      dispatchStaffStates({
        type: 'SUCCESS',
        successMessage: 'Staff Edited Successfully',
      });
      // edit the staff from the state
      const newStaffData = StaffData.map((item) => {
        if (item._id === response.data._id) {
          return response.data;
        } else {
          return item;
        }
      });
      closeFormHandler();
      setStaffData(newStaffData);
    } else if (response.status === 'error') {
      dispatchStaffStates({
        type: 'ERROR',
        errorMessage: response.message,
      });
    }
  };
  /***************************************************************************/
  /* Name : Delete Staff*/
  /* Description : delete the staff data */
  /***************************************************************************/
  const deleteStaff = async (id) => {
    dispatchStaffStates({ type: 'PENDING' });
    const response = await deleteStaffDataServices(id);
    if (response.status === 'success') {
      dispatchStaffStates({
        type: 'SUCCESS',
        successMessage: 'Staff Deleted Successfully',
      });
      // remove the staff from the state
      const newStaffData = StaffData.filter((item) => item._id !== id);
      setStaffData(newStaffData);
    } else if (response.status === 'error') {
      dispatchStaffStates({
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
        pageName='Staff'
        data={StaffData}
        pending={staffStates.pending}
        deleteItem={deleteStaff}
        editItem={openEditStaff}
        openFormHandler={openFormHandler}
      />
      {/*********** POP UP Form**************/}
      <FormPopUp open={openForm} handleClose={closeFormHandler}>
        <div className={styles.formInputs}>
          <WideInputField
            label='User Name'
            type='Text'
            ref={userNameInputRef}
          />

          {/* Select */}
          <FormControl
            fullWidth
            sx={{
              '& .MuiInputBase-root': {
                fontSize: '1.3rem',
                marginBottom: '1.5rem',
              },
            }}
          >
            <InputLabel
              id='demo-simple-select-label'
              sx={{
                fontSize: '1.3rem',
              }}
            >
              Role
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={role}
              label='Role'
              onChange={handleChange}
            >
              <MenuItem value={'lifeguard'}>Life Guard</MenuItem>
              <MenuItem value={'manager'}>Manager</MenuItem>
            </Select>
          </FormControl>
          {/* end Select */}
          <WideInputField
            label='Password'
            type='PASSWORD'
            ref={passwordInputRef}
          />
          <WideInputField
            label='Confirm Password'
            type='PASSWORD'
            ref={PasswordConfirmInputRef}
          />
          <div className={styles.addBtn}>
            {staffStates.pending && (
              <WideButton
                text={<SmallSpinner />}
                onPress={addStaff}
                onEdit={editStaff}
              />
            )}
            {!staffStates.pending && (
              <WideButton
                text={formMode === 'add' ? 'Add' : 'Edit'}
                onPress={formMode === 'add' ? addStaff : editStaff}
                mode={formMode}
              />
            )}
          </div>
        </div>
      </FormPopUp>
      {/* ********** ERROR SNACKBAR ********** */}
      <Snackbar
        open={staffStates.error}
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
          {staffStates.errorMessage}!
        </Alert>
      </Snackbar>
      {/* ********** SUCESS SNACKBAR ********** */}
      <Snackbar
        open={staffStates.success}
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
          {staffStates.successMessage}!
        </Alert>
      </Snackbar>
    </Fragment>
  );
});

export { Staff };
