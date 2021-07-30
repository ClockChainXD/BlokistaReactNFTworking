import React from 'react';
import PropTypes from 'prop-types';
import { Theme, withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';

const style = (theme: Theme) => ({
  root: {
    width: (props: { kind: string }) => (props.kind === 'small' ? 40 : 48),
    height: (props: { kind: string }) => (props.kind === 'small' ? 20 : 24),
    borderRadius: 20,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 3,
    color: theme.palette.primary.main,
    '&$checked': {
      transform: 'translateX(calc(100% + 2px))',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: (props: { kind: string }) => ({
    width: props.kind === 'small' ? 13 : 17,
    height: props.kind === 'small' ? 13 : 17,
    boxShadow: 'none',
  }),
  track: {
    borderColor: theme.palette.surface[1],
    borderRadius: 20,
    opacity: 1,
    backgroundColor: theme.palette.surface[1],
  },
  checked: {},
});

const AntSwitch = withStyles(style)(Switch);

const ToggleSwitch = ({ size, handleCheck, value }) => {
  const handleChecking = (event: { target: { checked: any } }) => {
    handleCheck(event.target.checked);
  };

  return <AntSwitch checked={value} kind={size} onChange={handleChecking} />;
};

ToggleSwitch.propTypes = {
  size: PropTypes.oneOf(['small', 'medium']),
  handleCheck: PropTypes.func,
  value: PropTypes.bool,
};

ToggleSwitch.defaultProps = {
  size: 'medium',
  handleCheck: () => {},
  value: true,
};

export default ToggleSwitch;
