import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Body1 from '../../Typography/Body1';

const useStyles = makeStyles((theme) => ({
  root: {

  },
  title: {
    fontWeight: 500,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
    [theme.breakpoints.down('xs')]: {
      marginBottom: 30,
    },
  },
  icon: {
    color: theme.palette.text.secondary,
    fontSize: theme.spacing(2.5),
    transition: 'transform 200ms',
    [theme.breakpoints.up('sm')]: {
      opacity: 0,
    },
  },
  rotate: {
    transform: 'rotate(180deg)',
  },
}));

const ExpandableColumn = ({
  children,
  title,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [expanded, setExpanded] = useState(true);
  const isMobileOrTablet = useMediaQuery(`(max-width:${theme.breakpoints.values.sm}px)`);

  const handleExpanding = () => {
    if (isMobileOrTablet) setExpanded((prev) => !prev);
  };

  return (
    <>
      <div className={classes.header} onClick={handleExpanding}>
        <Body1 className={classes.title}>{title}</Body1>
        <ExpandLessIcon
          className={clsx(classes.icon, {
            [classes.rotate]: !expanded,
          })}
        />
      </div>
      <Collapse in={expanded}>
        {children}
      </Collapse>
    </>
  );
};

ExpandableColumn.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default ExpandableColumn;
