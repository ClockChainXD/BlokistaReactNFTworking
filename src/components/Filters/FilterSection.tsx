import React from 'react';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import SelectField from '../Forms/SelectField';
import RadioButtonGroup from '../Forms/RadioButtonGroups';
import { addedOptions } from '../../constants/filter';
import { Console } from 'console';

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

const filterOptions = [
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

const FilterSection = ({ radioChangeHandler, selectChangeHandler }: PropsType) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <RadioButtonGroup value="buy_now" options={filterOptions} onChange={radioChangeHandler && radioChangeHandler} />
      <SelectField
        className={classes.select}
        options={addedOptions}
        value={addedOptions[0].key}
        onChangeHandler={selectChangeHandler && selectChangeHandler}
      />
    </div>
  );
};

export default FilterSection;
