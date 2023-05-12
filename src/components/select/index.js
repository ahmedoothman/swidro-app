// react
import React, { useState } from 'react';
// styles
import styles from './index.module.scss';
// mui
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

/***************************************************************************/
/* Name : Select React Component */
/***************************************************************************/
const SelectComponent = React.memo(({ data }) => {
  // state
  const [value, setValue] = useState(data[0].value);
  /***************************************************************************/
  /* Name : handleChange */
  /* Description : handleChange */
  /***************************************************************************/
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl>
      <Select
        labelId='demo-multiple-name-label'
        id='demo-multiple-name'
        onChange={handleChange}
        value={value}
        sx={{
          width: 250,
          backgroundColor: '#fff',
          border: 'none',
          borderRadius: '10px',
          outline: 'none',
        }}
      >
        {data.map((el) => (
          <MenuItem key={el.id} value={el.value}>
            {el.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});

export { SelectComponent };
