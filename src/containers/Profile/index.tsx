import React, { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import { useHistory, useLocation } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import BorderColorOutlinedIcon from '@material-ui/icons/BorderColorOutlined';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import Container from '../../components/Layout/Container';
import ProfileSidePane from '../../components/Widgets/ProfileSidePane';
import FilterChips from '../../components/Filters/FilterChips';
import ProductCard from '../../components/Cards/ProductCard';
// import FollowerCard from '../../components/Cards/FollowerCard';

import { useWeb3React } from '@web3-react/core';
import { useProfile } from '../../store/hooks';
import { NFTUserFullDetail, useGetNFTUserFullDetail } from '../../hooks/useApi';
import FilledButton from '../../components/Buttons/FilledButton';
import TinyBold from '../../components/Typography/TinyBold';

const useStyles = makeStyles<Theme, NFTUserFullDetail>(theme => ({
  root: {
    paddingBottom: 228,
    [theme.breakpoints.only('sm')]: {
      paddingBottom: 113,
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(3),
    },
  },
  banner: {
    background: theme.palette.surface[1],
    backgroundImage: props => `url(${props.userProfile?.userBackgroupUrl})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: 327,
    [theme.breakpoints.down('xs')]: {
      height: '61vw',
    },
  },
  container: {
    display: 'flex',
    flexDirection: 'column-reverse',
    textAlign: 'right',
    paddingBottom: 32,
    alignItems: 'flex-end',
  },
  buttonGroup: {
    '& button': {
      padding: '5px 15px',
      fontSize: 13,
      fontWeight: 'bold',
    },
    '& button:nth-child(1)': {
      marginRight: 20,
    },
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'space-between',
      marginLeft: '-5px',
      marginRight: '-5px',
      marginBottom: 55,
      '& button:nth-child(1)': {
        marginRight: 5,
      },
    },
  },
  nav: {
    paddingRight: 24,
    marginTop: -113,
    [theme.breakpoints.only('sm')]: {
      paddingRight: theme.spacing(4),
    },
    [theme.breakpoints.down('xs')]: {
      paddingRight: 0,
      marginTop: -31,
    },
  },
  icon: {
    fontSize: 14,
    marginTop: 4,
  },
  content: {
    paddingLeft: 40,
    paddingTop: 66,
    [theme.breakpoints.only('sm')]: {
      paddingLeft: theme.spacing(1.75),
    },
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 0,
      paddingTop: 46,
    },
  },
  filter: {
    marginBottom: 16,
    flexWrap: 'wrap',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'space-between',
    },
  },
  filterChip: {
    marginLeft: 0,
    marginRight: 12,
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginRight: 4,
    },
  },
  masonry: {
    display: 'flex',
    margin: theme.spacing(0, -1.75),
  },
  productWrapper: {
    padding: theme.spacing(1.5, 1.5, 2.75),
    marginBottom: theme.spacing(4),
    borderRadius: theme.shape.cardBorderRadius,
    backgroundColor: theme.palette.type === 'light' ? theme.palette.surface[0] : theme.palette.surface[1],
    boxShadow: '0 25px 28px 10px #1111',
    [theme.breakpoints.up('sm')]: {
      width: 284,
    },
    [theme.breakpoints.down('sm')]: {
      width: 304,
    },
  },
  gridColumn: {
    margin: theme.spacing(0, 2),
  },
  followers: {
    position: 'relative',
  },
  shadow: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: '100%',
    width: 70,
    backgroundImage: `linear-gradient(-90deg, ${theme.palette.background.paper}, transparent)`,
    zIndex: 1,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  indicator: {
    margin: '0 auto',
    width: 20,
    height: 20,
  },
  fileButton: {
    marginRight: 20,
    fontSize: 13,
    fontWeight: 'bold',
    border: `2px solid ${theme.palette.surface[3]}`,
    padding: 5,

    '& span svg': {
      marginLeft: 10,
      fontSize: 16,
      marginTop: 4,
    },
  },
  input: {
    display: 'none',
  },
}));

const Profile = () => {
  const location = useLocation();

  const walletAddress = location.pathname.split('/').pop();
  const [loginStatus, setLoginStatus] = useState(false);
  const { connector, library, chainId, account, active } = useWeb3React();

  const { profile } = useProfile();
  const nftUserFullDetail = useGetNFTUserFullDetail(walletAddress) || {};

  const classes = useStyles({ ...nftUserFullDetail });
  const history = useHistory();

  const [filter, setFilter] = useState(0);
  const theme = useTheme();
  const breakpointColumnsObj = {
    default: 3,
    [theme.breakpoints.values.md]: 2,
    700: 2,
    500: 1,
  };

  useEffect(() => {
    const isLoggedin = account && active && chainId === parseInt(process.env.REACT_APP_NETWORK_ID, 10);
    setLoginStatus(isLoggedin);
  }, [connector, library, account, active, chainId]);

  if (!nftUserFullDetail!.userProfile) {
    return <></>;
  }

  return (
    <div className={classes.root}>
      <div className={classes.banner}>
        <Container className={classes.container}>
          <div className={classes.buttonGroup}>
            {/* <label
              className={classes.fileButton + ' MuiButtonBase-root MuiButton-root MuiButton-outlined'}
              htmlFor="cover-file-input"
            >
              <span className="MuiButton-label">
                Edit cover photo
                <WallpaperOutlinedIcon className={classes.icon} />
              </span>

              <input
                className={classes.input}
                type="file"
                id="cover-file-input"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files && e.target.files[0]) {
                  }
                }}
              />
            </label> */}

            <FilledButton
              label="Edit profile"
              icon={<BorderColorOutlinedIcon className={classes.icon} />}
              handleClick={() => history.push('/profile/edit')}
            />
          </div>
        </Container>
      </div>
      <Container>
        <Grid container>
          <Grid item md={3} sm={4} xs={12}>
            <div className={classes.nav}>
              <ProfileSidePane userProfile={nftUserFullDetail.userProfile} />
            </div>
          </Grid>
          <Grid item md={9} sm={8} xs={12}>
            <div className={classes.content}>
              <FilterChips
                className={classes.filter}
                chipClassName={classes.filterChip}
                variant="light"
                active={filter}
                onChange={setFilter}
                // items={['Owned', 'Sold', 'Created', 'Bought', 'Following', 'Followers']}
                items={['Owned', 'Sold', 'Created', 'Bought']}
              />

              {filter === 0 && (
                <Masonry
                  breakpointCols={breakpointColumnsObj}
                  className={classes.masonry}
                  columnClassName={classes.gridColumn}
                >
                  {nftUserFullDetail?.userNfts?.currentNfts?.map((item, index) => (
                    <Box key={index} marginBottom={5}>
                      <div className={classes.productWrapper}>
                        <ProductCard product={item} />
                      </div>
                    </Box>
                  ))}
                  {nftUserFullDetail?.userNfts?.currentNfts?.length <= 0 && <TinyBold>No Data Found</TinyBold>}
                </Masonry>
              )}

              {filter === 1 && (
                <Masonry
                  breakpointCols={breakpointColumnsObj}
                  className={classes.masonry}
                  columnClassName={classes.gridColumn}
                >
                  {nftUserFullDetail?.userNfts?.soldNfts?.map((item, index) => (
                    <Box key={index} marginBottom={5}>
                      <div className={classes.productWrapper}>
                        <ProductCard product={item} />
                      </div>
                    </Box>
                  ))}
                  {nftUserFullDetail?.userNfts?.soldNfts?.length <= 0 && <TinyBold>No Data Found</TinyBold>}
                </Masonry>
              )}

              {filter === 2 && (
                <Masonry
                  breakpointCols={breakpointColumnsObj}
                  className={classes.masonry}
                  columnClassName={classes.gridColumn}
                >
                  {nftUserFullDetail?.userNfts?.createdNfts?.map((item, index) => (
                    <Box key={index} marginBottom={5}>
                      <div className={classes.productWrapper}>
                        <ProductCard product={item} />
                      </div>
                    </Box>
                  ))}
                  {nftUserFullDetail?.userNfts?.createdNfts?.length <= 0 && <TinyBold>No Data Found</TinyBold>}
                </Masonry>
              )}

              {filter === 3 && (
                <Masonry
                  breakpointCols={breakpointColumnsObj}
                  className={classes.masonry}
                  columnClassName={classes.gridColumn}
                >
                  {nftUserFullDetail?.userNfts?.boughtNfts?.map((item, index) => (
                    <Box key={index} marginBottom={5}>
                      <div className={classes.productWrapper}>
                        <ProductCard product={item} />
                      </div>
                    </Box>
                  ))}
                  {nftUserFullDetail?.userNfts?.boughtNfts?.length <= 0 && <TinyBold>No Data Found</TinyBold>}
                </Masonry>
              )}

              {/* {filter === 5 && (
                <div className={classes.followers}>
                  {followers?.map(follower => (
                    <FollowerCard key={follower.id} follower={follower} />
                  ))}
                  <div className={classes.shadow} />
                </div>
              )} */}

              {/* <LoaderIndicator className={classes.indicator} /> */}
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

Profile.propTypes = {};

Profile.defaultProps = {};

export default Profile;
