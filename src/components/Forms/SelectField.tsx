import React, { forwardRef, Ref } from 'react';
// import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Caption from '../Typography/Caption';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface MakeStylesPropsType {
  iconBorder: boolean;
}

interface SelectFieldPropsType {
  className?: string;
  label?: string;
  name?: string;
  iconBorder?: boolean;
  value?: string | number;
  options?: Array<any>;
  register?: UseFormRegister<FieldValues> | null;
  required?: boolean;
  onChangeHandler?: Function;
}

const useStyles = makeStyles<Theme, MakeStylesPropsType>(theme => ({
  root: {
    minWidth: 100,
    '& .MuiSelect-icon': {
      width: 21,
      height: 20,
      border: props => props.iconBorder && `2px solid ${theme.palette.surface[2]}`,
      borderRadius: '50%',
      padding: 5,
      right: 7,
      top: 'calc(50% - 17px)',
      color: theme.palette.text.primary,
      fontWeight: 'bolder',
    },
  },
  label: {
    marginBottom: 10,
  },
}));

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: theme.shape.borderRadius,
    position: 'relative',
    backgroundColor: 'transparent',
    border: `2px solid ${theme.palette.surface[2]}`,
    fontSize: 15,
    padding: '11px 26px 14px 15px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: theme.shape.borderRadius,
      background: 'transparent',
    },
  },
}))(InputBase);

const SelectField = ({
  className = '',
  label = '',
  name = '',
  iconBorder = true,
  options = [],
  value = '',
  register = null,
  required = false,
  onChangeHandler,
}: SelectFieldPropsType) => {
  const classes = useStyles({ iconBorder });

  const [val, setval] = React.useState(value);

  const handleChange = event => {
    setval(event.target.value);
    onChangeHandler && onChangeHandler(event);
  };

  return (
    <FormControl className={className}>
      {Boolean(label) && <Caption className={classes.label}>{label}</Caption>}
      <Select
        className={classes.root}
        value={val}
        onChange={e => handleChange(e)}
        input={<BootstrapInput {...(register && register(name, { required: required }))} />}
        IconComponent={KeyboardArrowDownIcon}
      >
        
        {options?.map(option => (
          <MenuItem key={option.key} value={option.label}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectField;
