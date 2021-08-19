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
import ProductNew from '../../components/Cards/ProductNew';
 
const useStyles = makeStyles((theme) => ({
  root: {},
  banner: {
    background: theme.palette.surface[1],
    backgroundImage: "url('/assets/images/banner.jpg')",
    backgroundRepeat: 'no-repeat',
    backgroundSize: '50% 100%',
    backgroundPosition: 'center center',
    height: 327,
    [theme.breakpoints.down('xs')]: {
      height: '61vw',
    },
  },
  gridColumn: {
    margin: theme.spacing(0, 2),
  },
  cards: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '0 4vw'
  },
  topFilter: {
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
      </div>
      <div className={classes.topFilter}>
        <FilterSection />
      </div>

      <div className={classes.cards}>
        <ProductNew />
        <ProductNew />
        <ProductNew />
        <ProductNew />
        <ProductNew />
        <ProductNew />
        <ProductNew />
        <ProductNew />
        <ProductNew />
        <ProductNew />
        <ProductNew />
        <ProductNew />
        <ProductNew />
        <ProductNew />
        <ProductNew />
        <ProductNew />
        <ProductNew />
        <ProductNew />
        <ProductNew />
        <ProductNew />
        <ProductNew />
        <ProductNew />
        <ProductNew />
        <ProductNew />
        <ProductNew />
        <ProductNew />
        <ProductNew />
        <ProductNew />
        <ProductNew />
        <ProductNew />
        <ProductNew />
      </div>   
    </div>
  );
};

Stats.propTypes = {
};

Stats.defaultProps = {
};

export default Stats;
