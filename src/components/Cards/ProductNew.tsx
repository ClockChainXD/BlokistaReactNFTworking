import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    card : {
        position: 'relative',
        display: 'block',
        width: 258,
        height: 500, 
        margin: '1em 2vw',
        borderRadius: 'calc(40 * 1px)',
        overflow: 'hidden',
        textDecoration: 'none',
        '&:hover':{
            '& $overlay': {
                transform : 'translateY(0)',
            },
            '& $header': {
                transform: 'translateY(0)',
            }
        }
    },
    image: {
        width: '100%',
        height: 'auto',
    },
    overlay:{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        borderRadius: 'calc(40 * 1px)',    
        backgroundColor: '#000',
        transform: 'translateY(100%)',
        transition: '.2s ease-in-out',
    },
    header: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: '2em',
        padding: '2em',
        borderRadius: '40px  40px 0 0',
        backgroundColor : '#000',
        transform: 'translateY(-100%)',
        transition: '.2s ease-in-out',
    },
    arc: {
        width: '80px',
        height: '80px',
        position: 'absolute',
        bottom: '100%',
        zIndex: 1,
    },
    thumb:{
        flexShrink: 0,
        width: '50px',
        height: '50px',
        borderRadius: '50%',
    },
    title: {
        fontSize: '1em',
        margin: '0 0 .3em',
        color: '#6A515E',
    },
    tagline: {
        display: 'block',
        margin: '1em 0',
        fontSize: '.8em',
        color: '#D7BCA',
    },
    status: {
        fontSize: '.8em',
        color: '#D7BDCA',
    },
    description: {
        padding: '0 2em 2em',
        margin: '0',
        color: '#D8BDCA',
        display: '-webkit-box',
        '-webkit-box-orient': 'vertical',
        '-webkit-line-clamp': 3,
        overflow: 'hidden',
    }
}));

const ProductNew = ({}) => {
  const classes = useStyles();

  return (
      <div className={classes.card}>
          <img className={classes.image} src="https://i.imgur.com/oYiTqum.jpg" alt="tiger" />
          <div className={classes.overlay}>
            <div className={classes.header}>
                <svg className={classes.arc}> <path fill="#fff" d="M150 0 L75 200 L225 200 Z" /> </svg>
                <img className={classes.thumb} src="https://i.imgur.com/7D7I6dI.png" alt="" />

                <div>
                    <h3 className={classes.title}>John Doe</h3>
                    <span className={classes.tagline}>Lorem ipsum dolor sit amet consectetur</span>  
                    <span className={classes.status}>1 hour ago</span>
                </div>
            </div>

            <p className={classes.description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, blanditis?</p>
          </div>
      </div>
  );
};

export default ProductNew;
