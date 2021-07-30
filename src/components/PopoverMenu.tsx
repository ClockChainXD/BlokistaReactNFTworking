import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  root: {
    boxShadow: theme.shadows[10],
  },
}));

const PopoverMenu = ({
  anchor,
  children,
  anchorOrigin,
  transformOrigin,
  className,
  disableCloseAsSelfClick,
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickMenuContent = () => {
    if (!disableCloseAsSelfClick) handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <div
        aria-describedby={id}
        onClick={handleClick}
      >
        {anchor}
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        className={clsx(classes.root, className)}
        anchorOrigin={anchorOrigin}
        transitionDuration={0}
        transformOrigin={transformOrigin}
      >
        <div onClick={handleClickMenuContent}>
          {children}
        </div>
      </Popover>
    </>
  );
};

PopoverMenu.propTypes = {
  anchor: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  anchorOrigin: PropTypes.object,
  transformOrigin: PropTypes.object,
  className: PropTypes.string,
  disableCloseAsSelfClick: PropTypes.bool,
};

PopoverMenu.defaultProps = {
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'center',
  },
  transformOrigin: {
    vertical: 'top',
    horizontal: 'center',
  },
  className: '',
  disableCloseAsSelfClick: false,
};

export default PopoverMenu;
