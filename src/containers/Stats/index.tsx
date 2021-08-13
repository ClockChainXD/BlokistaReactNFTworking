import React from 'react';
import Masonry from 'react-masonry-css';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Container from '../../components/Layout/Container';
import LoaderIndicator from '../../components/Loader';
import Body1 from '../../components/Typography/Body1';

import FilterSection from '../../components/Filters/FilterSection';
import ProductCard from '../../components/Cards/ProductCard';
import Filter from '../../components/Filters/Filter';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: 100,
  },
  banner: {
    background: theme.palette.surface[1],
    backgroundImage: "url('/assets/images/Preview.jpg')",
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    height: 327,
    [theme.breakpoints.down('xs')]: {
      height: '61vw',
    },
  },
  container: {
    paddingTop: theme.spacing(25),
    '& p': {
      margin: '0 auto',
      maxWidth: theme.spacing(80),
      textAlign: 'center',
    },
  },
  masonry: {
    display: 'flex',
    margin: theme.spacing(0, -1.75),
  },
  gridColumn: {
    margin: theme.spacing(0, 2),
  },
  indicator: {
    margin: '0 auto',
    width: 20,
    height: 20,
  },
  topFilter: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(3, 0),
    marginBottom: theme.spacing(5),
  },
  productWrapper: {
    marginBottom: theme.spacing(8),
  },
  description: {
    color: theme.palette.common.white,
  },
}));

const Stats = () => {
  const classes = useStyles();
  const breakpointColumnsObj = {
    default: 4,
    900: 2,
    700: 2,
    500: 1,
  };

  return (
    <div className={classes.root}>
      <div className={classes.banner}>
        <Container className={classes.container}>
          <Body1 className={classes.description}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut
          </Body1>
        </Container>
      </div>
      <Container>
        <div className={classes.topFilter}>
          <FilterSection />
        </div>

        <Masonry
          breakpointCols={breakpointColumnsObj}
          className={classes.masonry}
          columnClassName={classes.gridColumn}
        >
          {/*products.slice(0, 8).map((product) => (
            <div
              key={product.id}
              className={classes.productWrapper}
            >
              { <ProductCard product={product} /> }
            </div>
          ))*/}
        </Masonry>

        <LoaderIndicator className={classes.indicator} />
      </Container>
    </div>
  );
};

Stats.propTypes = {
};

Stats.defaultProps = {
};

export default Stats;
