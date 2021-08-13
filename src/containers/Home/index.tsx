import { makeStyles } from '@material-ui/core/styles';

import Container from '../../components/Layout/Container';
import ProductSection from '../../components/ProductSection';
import TopArtistsSection from '../../components/TopArtists/index';
import { useGetNFTObjectList, useGetNFTTopUserList } from '../../hooks/useApi';
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
  const totalNFTListData = useGetNFTObjectList({ count: 1000, sortField: 'createdAt', sortOrder: 'desc' , rangeMin:0,rangeMax: 10000000000000});

  return (
    <Container className={classes.root}>
      <div className={classes.section}>
        <TopArtistsSection
          title="Top Artists"
          artists={topArtists}
        />
      </div>
      {/* <div className={classes.section}>
        <ProductSection
          title="Auctions"
          resources={totalNFTListData?.nftList}
          viewAllHandler={() => {
            history.push("/explore");
          }}
          type="auction"
        />
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

  
    </Container>
  );
};

export default Home;
