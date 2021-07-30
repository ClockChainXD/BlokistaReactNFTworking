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
    padding: theme.spacing(1.5, 1.5, 2.75),
    marginBottom: theme.spacing(4),
    borderRadius: theme.shape.cardBorderRadius,
    backgroundColor: theme.palette.type === 'light' ? theme.palette.surface[0] : theme.palette.surface[1],
    boxShadow: '0 4px 10px 4px #1111',
    maxWidth: 285,
    margin: 'auto',
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
            ((type == 'auction' && product.nftType == '1') ||
              (type == 'fixed' && product.nftType == '0') ||
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
