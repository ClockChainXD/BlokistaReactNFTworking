import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SelectField from '../Forms/SelectField';
import RadioButtonGroup from '../Forms/RadioButtonGroups';
import { userOptions } from '../../constants/filter';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  radios: {
    display: 'flex',
  },
  select: {
    width: theme.spacing(30),
  },
}));

const Options = [
  {
    id: 1,
    value: 'buy_now',
    label: 'Buy Now',
  },
  {
    id: 2,
    value: 'auction',
    label: 'In Auction',
  },
  {
    id: 3,
    value: 'has_offer',
    label: 'Has Offers',
  },
  {
    id: 4,
    value: 'new',
    label: 'New',
  },
  
];

interface PropsType {
  radioChangeHandler?: (e) => void;
  selectChangeHandler?: (e) => void;
}

const Filter = ({ radioChangeHandler, selectChangeHandler }: PropsType) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <RadioButtonGroup value="buy_now" options={Options} onChange={radioChangeHandler && radioChangeHandler} />
      <SelectField
        className={classes.select}
        options={userOptions}
        value={userOptions[0].key}
        onChangeHandler={selectChangeHandler && selectChangeHandler}
      />
    </div>
  );
};

export default Filter;
