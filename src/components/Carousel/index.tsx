import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import OwlCarousel from 'react-owl-carousel3';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(7),
    width: '100%',
    position: 'relative',
  },
  wrapper: {
    width: '100%',
    height: 'auto',
    '& img': {
      width: '100%',
      height: 'auto',
    },
  },
  nav: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    border: `1px solid ${theme.palette.surface[3]}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&.disabled': {
      display: 'none',
    },
    '&:hover': {
      cursor: 'pointer',
      border: `1px solid ${theme.palette.surface[3]}`,
    },
    '&.owl-prev': {
      position: 'absolute',
      left: '-50px',
      top: 'calc(50% - 20px)',
      [theme.breakpoints.down('sm')]: {
        left: '-20px',
      },
    },
    '&.owl-next': {
      position: 'absolute',
      right: '-50px',
      top: 'calc(50% - 20px)',
      [theme.breakpoints.down('sm')]: {
        right: '-20px',
      },
    },
  },
  navContainer: {},
}));

const Carousel = ({ className, navPrevClassName, navNextClassName, customOption, children }) => {
  const classes = useStyles();
  const theme = useTheme();

  const options = {
    loop: true,
    nav: true,
    dots: false,
    autoplayHoverPause: false,
    autoplay: false,
    autoplayTimeout: 5,
    margin: 10,
    navText: [
      `<div class="nav-btn prev-slide"><svg viewBox="0 0 11 7" fill="none" width="12" height="12" xlmns="http://www.w3.org/2000/svg" style="transform: rotate(90deg);"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.00146 6.41431L9.70857 1.7072C10.0991 1.31668 10.0991 0.683511 9.70857 0.292986C9.31805 -0.097538 8.68488 -0.097538 8.29436 0.292986L5.00146 3.58588L1.70857 0.292986C1.31805 -0.097538 0.684882 -0.097538 0.294358 0.292986C-0.0961662 0.68351 -0.0961662 1.31668 0.294358 1.7072L5.00146 6.41431Z" fill=${theme.palette.text.primary}></path></svg></div>`,
      `<div class="nav-btn next-slide"><svg viewBox="0 0 11 7" fill="none" width="12" height="12" xlmns="http://www.w3.org/2000/svg" style="transform: rotate(-90deg);"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.00146 6.41431L9.70857 1.7072C10.0991 1.31668 10.0991 0.683511 9.70857 0.292986C9.31805 -0.097538 8.68488 -0.097538 8.29436 0.292986L5.00146 3.58588L1.70857 0.292986C1.31805 -0.097538 0.684882 -0.097538 0.294358 0.292986C-0.0961662 0.68351 -0.0961662 1.31668 0.294358 1.7072L5.00146 6.41431Z" fill=${theme.palette.text.primary}></path></svg></div>`,
    ],
    responsive: {
      0: {
        items: 1,
      },
      [theme.breakpoints.values.md]: {
        items: 3,
      },
      [theme.breakpoints.values.lg]: {
        items: 4,
      },
      [theme.breakpoints.values.xl]: {
        items: 5,
      },
    },
  };

  return (
    <div className={clsx(classes.root, className)}>
      <OwlCarousel
        className="owl-carousel owl-theme"
        navContainerClass={classes.navContainer}
        navClass={[clsx(classes.nav, navPrevClassName), clsx(classes.nav, navNextClassName)]}
        {...Object.assign(options, customOption)}
      >
        {children}
      </OwlCarousel>
    </div>
  );
};

Carousel.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  customOption: PropTypes.object,
  navContainerClassName: PropTypes.string,
  navPrevClassName: PropTypes.string,
  navNextClassName: PropTypes.string,
};

Carousel.defaultProps = {
  className: '',
  customOption: {},
  navContainerClassName: 'owl-nav',
  navPrevClassName: 'owl-prev',
  navNextClassName: 'owl-next',
};

export default Carousel;
