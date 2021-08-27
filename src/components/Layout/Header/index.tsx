import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';

import Container from '../Container';
import NavigationList from './NavigationList';
import UserDropDown from '../../Menus/UserDropDown';
import { useWeb3React } from '@web3-react/core';
import useAuth from '../../../hooks/useAuth';
import { useProfile } from '../../../store/hooks';
import { getBalanceOfBNB } from '../../../utils/contracts';
import { truncateWalletString } from '../../../utils';
import { LocalDiningOutlined } from '@material-ui/icons';
import { injectedConnector } from '../../../utils/connectors';
import { useEagerConnect } from '../../../hooks/useEagerConnect';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.surface[0],
    borderBottom: `1px solid ${theme.palette.divider}`,
    boxShadow: '0 4px 10px 4px #1111',
    height: theme.layouts.header.height.desktop,
    [theme.breakpoints.down('sm')]: {
      minHeight: theme.layouts.header.height.desktop,
      height: 'auto',
      paddingTop: theme.spacing(2),
    },
    [theme.breakpoints.down('xs')]: {
      borderBottom: 'none',
      paddingTop: theme.spacing(5),
    },
  },
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    width: theme.layouts.logo.width.desktop,
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
    marginRight: 68,
    [theme.breakpoints.down('sm')]: {},
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      justifyContent: 'center',
    },
  },
  logoWrapper: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
  },
  connectBtn: {
    border: '1px solid #a0a0a0',
    padding: '1em 0',
    width: '198.6px',
    textAlign: 'center',
  },
}));

const Header = () => {
  const classes = useStyles();
  const theme = useTheme();

  const { connector, library, chainId, account, active , deactivate , activate } = useWeb3React();

  const [loginStatus, setLoginStatus] = useState(false);
  let [etherBalance, setEtherBalance] = useState('0.00');
  // let [wbnbBalance, setWBNBBalance] = useState('0.00');

  const { login , logout } = useAuth();
  const { profile } = useProfile();

  useEffect(() => {
    const isLoggedin = account && active && chainId === parseInt(process.env.REACT_APP_NETWORK_ID, 10);
    if (isLoggedin) {
      
      getBalanceOfBNB(library, account).then(balance => {
        setEtherBalance(balance.toFixed(4));
      });
     /* getBalanceOfWBNB(chainId, library, account).then(balance => {
        setWBNBBalance(balance.toFixed(4));
      });
      */
    }
    setLoginStatus(isLoggedin);
  }, [connector, library, account, active, chainId]);

  const goLogin= async () =>  {
 login();
 setLoginStatus(true);

  }
  
  let displayName = '';
  let userAvatar = '/assets/images/users/default-profile.png';
  let customUrl='';
  if (profile) {
    displayName = profile.displayName ? profile.displayName : truncateWalletString(profile.walletAddress);
    userAvatar = profile.userAvatarUrl ? profile.userAvatarUrl : '/assets/images/users/default-profile.png';
    if(profile.customUrl){
      customUrl=profile.customUrl;
    }
  }

  return (
    <AppBar className={classes.root} position="static" elevation={0}>
      <Container className={classes.container}>
        <div className={classes.wrapper}>
          <div className={classes.logoWrapper}>
            <Link to="/home" className={classes.logo}>
              <img src={`/assets/images/logo-${theme.palette.type}.png`} alt="Supfam logo" width="100%" height="auto" />
            </Link>
          </div>
          <NavigationList />
          {loginStatus && profile ? (
            <UserDropDown avatarUrl={userAvatar} displayName={displayName} balance={etherBalance} walletAddress={account} customUrl={customUrl}  />
          ) : (
            <Button
              className={classes.connectBtn}
              onClick={() => {
               
                goLogin();
              }}
            >
              🦊 CONNECT WALLET
            </Button>
          )}
        </div>
      </Container>
    </AppBar>
  );
};

Header.propTypes = {};

Header.defaultProps = {
  isAuthorized: true,
};

export default Header;
