import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Body1 from '../Typography/Body1';
import Tiny from '../Typography/Tiny';
import FilledButton from '../Buttons/FilledButton';

import Verified from '../Verified';
import { truncateWalletString } from '../../utils';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  avatarWrapper: {
    position: 'relative',
    '& svg.verified-icon': {
      position: 'absolute',
      bottom: 2,
      right: 20,
    },
  },
  avatar: {
    width: 88,
    height: 88,
    marginRight: 20,
    [theme.breakpoints.down('xs')]: {
      width: 72,
      height: 72,
      marginRight: 16,
    },
  },
  name: {
    marginBottom: 5,
  },
  info: {
    width: '220px',
    '& p': {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      width: '100%',
    },
  },
  button: {
    marginTop: 16,
    width: 68,
    [theme.breakpoints.down('xs')]: {
      width: 76,
      marginTop: 0,
    },
  },
}));

const FollowerInfo = ({ follower, withFollowBtn = false, children = null, verified = false }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.values.xs}px)`);

  return (
    <div className={classes.root}>
      <div className={classes.avatarWrapper}>
        <Avatar className={classes.avatar} src={follower?.userAvatarUrl} />
        {verified && <Verified />}
      </div>
      <div className={classes.info}>
        <div>
          <Body1 className={classes.name}>{follower?.displayName || truncateWalletString(follower?.walletAddress)}</Body1>
          <Tiny></Tiny>
          {/* <Tiny>{follower?.userBio}</Tiny> */}
        </div>
        <Tiny>{children && children}</Tiny>
        {withFollowBtn && (
          <FilledButton className={classes.button} label="Follow" size={isMobile ? 'medium' : 'small'} />
        )}
      </div>
    </div>
  );
};

FollowerInfo.propTypes = {
  follower: PropTypes.object.isRequired,
};

FollowerInfo.defaultProps = {};

export default FollowerInfo;
