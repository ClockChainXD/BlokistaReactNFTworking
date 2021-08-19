import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import SubTitle1 from './Typography/Subtitle1';
import OutlinedButton from './Buttons/OutlinedButton';
import ProductCard from './Cards/ProductCard';
import Carousel from './Carousel/index';

const useStyles = makeStyles(theme => ({
  content: {},
  root: {},
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(4, 0),
  },
  gridColumn: {
    margin: theme.spacing(0, 2),
  },
  viewButton: {
    width: theme.spacing(12),
  },
  productWrapper: {
    display: 'flex',
    paddingTop: 10,
    flexDirection : 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.shape.cardBorderRadius,
    maxWidth: 305,
    backgroundColor: theme.palette.type === 'light' ? theme.palette.surface[0] : theme.palette.surface[1],
    boxShadow: '0 20px 10px 4px #000',
  },
}));

const ProductSection = ({ resources, title, viewAllHandler, type }) => {
  const classes = useStyles();
  const breakpointColumnsObj = {
    default: 4,
    900: 3,
    700: 2,
    500: 1,
  };

  function RenderProduct() {
    return (
      <Carousel
        customOption={{
          loop: false,
          responsive: {
            0: {
              items: 1,
            },
            500: {
              items: 2,
            },
            768: {
              items: resources?.length > 3 ? 3 : resources?.length,
            },
            1200: {
              items: resources?.length > 4 ? 4 : resources?.length,
            },
          },
        }}
      >
        {resources?.map(
          (product, index) =>
            ((type == 'auction' && (product.status == 1 || product.status == 3)) ||
              (type == 'fixed' && product.status == 2) ||
              (type == 'recent' && index <= 10)) && (
              <div key={index} className={classes.productWrapper}>
                <ProductCard product={product} />
              </div>
            ),
        )}
      </Carousel>
    );
  }

  return (
    <div className={classes.root}>
      <div className={classes.top}>
        <SubTitle1 color="primary">{title}</SubTitle1>
        <OutlinedButton label="View all" size="small" className={classes.viewButton} handleClick={viewAllHandler} />
      </div>
      <div className={classes.content}>{resources?.length && <RenderProduct />}</div>
    </div>
  );
};

ProductSection.propTypes = {
  resources: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  viewAllHandler: PropTypes.func,
};

ProductSection.defaultProps = {};

export default ProductSection;
