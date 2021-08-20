import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, Theme } from '@material-ui/core/styles';

interface MakeStylesPropsType {
  size: 'small' | 'medium';
}

const useStyles = makeStyles<Theme, MakeStylesPropsType>(theme => ({
  root: {
    fontSize: props => (props.size === 'small' ? theme.spacing(1.5) : theme.spacing(2)),
    padding: props => (props.size === 'small' ? theme.spacing(0.5) : '2px 3px'),
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    minWidth: theme.spacing(3.5),
  },
  unit: {
    marginLeft: theme.spacing(0.5),
  },
  price: {
    color: theme.palette.text.primary,
  },
  count: {
    borderColor: theme.palette.surface[4],
    color: theme.palette.text.primary,
  },
  amount: {
    borderColor: theme.palette.surface[3],
    color: theme.palette.surface[3],
  },
}));

const PriceTag = ({ price, unit, type, disableUnit, size }) => {
  const classes = useStyles({ size });

  return (
    <span
      className={clsx(classes.root, {
        [classes.price]: type === 'price',
        [classes.count]: type === 'count',
        [classes.amount]: type === 'amount',
      })}
    >
      {price}
      {!disableUnit && <span className={classes.unit}>{unit}</span>}
    </span>
  );
};

PriceTag.propTypes = {
  price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  unit: PropTypes.element,
  type: PropTypes.oneOf(['price', 'count', 'amount']),
  disableUnit: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium']),
};

PriceTag.defaultProps = {
  unit: 'BNB',
  type: 'price',
  disableUnit: false,
  size: 'small',
};

export default PriceTag;
