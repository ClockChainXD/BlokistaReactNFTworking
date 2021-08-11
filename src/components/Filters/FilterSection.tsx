import React, { useState } from 'react';
import { Collapse, Button, CardBody, Card, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import SelectField from '../Forms/SelectField';
import RadioButtonGroup from '../Forms/RadioButtonGroups';
import { addedOptions, categoryOptions, userOptions } from '../../constants/filter';

const useStyles = makeStyles(theme => ({
  main: {
    display: 'flex',
    flexDirection : 'column',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  root: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  radios: {
    display: 'flex',
  },
  select: {
    width: theme.spacing(30),
  },
  input: {
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
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);


  return (
    <div className={classes.main}>
      <div className={classes.root}>
        <RadioButtonGroup value="buy_now" options={filterOptions} onChange={radioChangeHandler && radioChangeHandler} />
        <SelectField
          className={classes.select}
          options={addedOptions}
          value={addedOptions[0].key}
          onChangeHandler={selectChangeHandler && selectChangeHandler}
        />
      </div>


    
    </div>
   
  );
};

export default FilterSection;

/*
   this is an extra section for filter. i don't need this item because I use a sidebar     



  <Collapse className={classes.root} style={{marginTop: "3vh",}} isOpen={isOpen}>
        <SelectField 
          className={classes.select}
          options={userOptions}
          value={userOptions[0].key}
          onChangeHandler={selectChangeHandler && selectChangeHandler}
        />

        <SelectField 
          className={classes.select}
          options={categoryOptions}
          value={categoryOptions[0].key}
          onChangeHandler={selectChangeHandler && selectChangeHandler}
        />
             
        <InputGroup className={classes.input}>
          <Input placeholder="Max Price (BSC)" maxLength={6} />
        </InputGroup>

        <InputGroupAddon addonType="prepend">
          <Button>Apply</Button>
        </InputGroupAddon>

      </Collapse>
*/