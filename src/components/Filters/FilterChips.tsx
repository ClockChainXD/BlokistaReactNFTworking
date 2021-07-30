import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    '&:hover': {
      background: 'inherit',
    },
  },
  chip: {
  },
  active: {
    // eslint-disable-next-line max-len
    background: `${theme.palette.type === 'light' ? `${theme.palette.text.primary}e0` : theme.palette.surface[2]} !important`,
    color: `${theme.palette.type === 'light' ? theme.palette.surface[1] : theme.palette.text.primary} !important`,
  },
  lightActive: {
    // eslint-disable-next-line max-len
    background: `${theme.palette.type === 'light' ? `${theme.palette.text.primary}e0` : theme.palette.surface[4]} !important`,
    color: `${theme.palette.type === 'light' ? theme.palette.surface[1] : theme.palette.surface[0]} !important`,
  },
}));

const FilterChip = withStyles((theme) => ({
  root: {
    fontSize: 12,
    color: theme.palette.text.secondary,
    background: 'none',
    height: 29,
    fontWeight: 'bold',
    letterSpacing: 0.4,
    padding: '0 3px',
    marginLeft: 12,
    borderRadius: theme.shape.cardBorderRadius,
    '&:hover': {
      background: `${theme.palette.surface[1]} !important`,
    },
    '&:focus': {
      background: 'none',
    },
  },
}))(Chip);

const FilterChips = ({
  className,
  chipClassName,
  items,
  variant,
  active,
  onChange,
}) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      {items?.map((item, index) => (
        <FilterChip
          key={item}
          className={clsx(chipClassName, {
            [classes.active]: index === active && variant === 'dark',
            [classes.lightActive]: index === active && variant === 'light',
          })}
          label={item}
          clickable
          onClick={() => onChange(index)}
        />
      ))}
    </div>
  );
};

FilterChips.propTypes = {
  className: PropTypes.string,
  chipClassName: PropTypes.string,
  items: PropTypes.array,
  variant: PropTypes.oneOf(['light', 'dark']),
  active: PropTypes.number,
  onChange: PropTypes.func,
};

FilterChips.defaultProps = {
  chipClassName: '',
  className: '',
  items: [],
  variant: 'light',
  active: 0,
  onChange: () => {},
};

export default FilterChips;
