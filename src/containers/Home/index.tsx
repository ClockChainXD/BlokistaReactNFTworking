import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Container from '../../components/Layout/Container';
import PageTitle from '../../components/Typography/PageTitle';
import ProductSection from '../../components/ProductSection';
import LoadMoreButton from '../../components/Buttons/LoadMoreButton';

/*import { products, sellers } from '../../constants/dummy.json';
import FeatureSection from '../../components/FeatureSection';
import SignupAction from '../../components/SignupAction';
*/
import TopArtistsSection from '../../components/TopArtists/index';
import { NFTObjectData, useGetNFTObjectList, useGetNFTTopUserList } from '../../hooks/useApi';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    [theme.breakpoints.down('xs')]: {
      paddingTop: 76,
      textAlign: 'center',
    },
  },
  top: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(6, 0, 2),
  },
  title: {
    [theme.breakpoints.down('xs')]: {
      lineHeight: '47px',
    },
  },
  section: {
    paddingTop: theme.spacing(8),
  },
  bottom: {
    padding: theme.spacing(8, 0),
    display: 'flex',
    justifyContent: 'center',
  },
}));

const Home = () => {
  const classes = useStyles();
  const history = useHistory();

  const topArtists = useGetNFTTopUserList();
  const totalNFTListData = useGetNFTObjectList({ start: 0, count: 1000, sortField: 'createdAt', sortOrder: 'desc' });

  return (
    <Container className={classes.root}>
      <div className={classes.section}>
        <TopArtistsSection
          title="Top Artists"
          artists={topArtists}
        />
      </div>
      <div className={classes.section}>
        <ProductSection
          title="Auctions"
          resources={totalNFTListData?.nftList}
          viewAllHandler={() => {
            history.push("/explore");
          }}
          type="auction"
        />
      </div>
      {/* <div className={classes.section}>
        <br />
        <SignupAction />
      </div> */}
      <div className={classes.section}>
        <ProductSection
          title="Recently added"
          resources={totalNFTListData?.nftList}
          viewAllHandler={() => {
            history.push("/explore");
          }}
          type="recent"
        />
      </div>
      <div className={classes.section}>
        <ProductSection
          title="Buy now"
          resources={totalNFTListData?.nftList}
          viewAllHandler={() => {
            history.push("/explore");
          }}
          type="fixed"
        />
      </div>

      {/* <div className={classes.bottom}>
        <LoadMoreButton />
      </div> */}
    </Container>
  );
};

export default Home;
