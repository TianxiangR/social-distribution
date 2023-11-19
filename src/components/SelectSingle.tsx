import React from 'react';
import { InputLabel, MenuItem, FormControl, Select as MuiSelect, SelectChangeEvent } from '@mui/material';

export interface SelectSingleProps {
  options: Array<string>
  label: string;
  value: string;
  onChange?: (e: SelectChangeEvent) => void;
}

function SelectSingle(props: SelectSingleProps) {
  const { label, value, onChange, options } = props;

  return (
    <FormControl>
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        label={label}
        value={value}
        onChange={onChange}
      >
        {
          options.map((item, idx) => (
            <MenuItem key={idx} value={item}>{item}</MenuItem>
          ))
        }
      </MuiSelect>
    </FormControl>
  );
}

SelectSingle.displayName = 'Select';

export default SelectSingle;