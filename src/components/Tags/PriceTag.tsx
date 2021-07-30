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
    borderWidth: 2,
    borderStyle: 'solid',
    padding: props => (props.size === 'small' ? theme.spacing(0.5) : '4px 7px'),
    borderRadius: 3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    minWidth: theme.spacing(8.5),
  },
  unit: {
    marginLeft: theme.spacing(0.5),
  },
  price: {
    borderColor: theme.palette.success.main,
    color: theme.palette.success.main,
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
    <div
      className={clsx(classes.root, {
        [classes.price]: type === 'price',
        [classes.count]: type === 'count',
        [classes.amount]: type === 'amount',
      })}
    >
      {price}
      {!disableUnit && <span className={classes.unit}>{unit}</span>}
    </div>
  );
};

PriceTag.propTypes = {
  price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  unit: PropTypes.string,
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
