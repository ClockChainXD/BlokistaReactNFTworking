
import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';

import Body1 from '../Typography/Body1';
import Body2 from '../Typography/Body2';
import PriceTag from '../Tags/PriceTag';
import Tiny from '../Typography/Tiny';
import TinyBold from '../Typography/TinyBold';
import FilledButton from '../Buttons/FilledButton';

import Timer from '../../components/Timer';
import { NFTObjectData, NFTUserFullDetail } from '../../hooks/useApi';
import { useProfileForWallet } from '../../store/hooks';
import  AudioPlayerButton  from '../AudioPlayer/AudioPlayerButton';

interface PropsType {
  className?: string;
  product?: NFTObjectData;
  showFooter?: boolean;
  user?: NFTUserFullDetail;
}
//theme 
//background: theme.palette.type === 'light' ? theme.palette.surface[0] : theme.palette.surface[1],

const useStyles = makeStyles(theme => ({
  card : {
    position: 'relative',
    width: 258,
    height: 350, 
    margin: '.5em .8vw',
    borderRadius: 'calc(20 * 1px)',
    overflow: 'hidden',
    textDecoration: 'none',
    '&:hover':{
        '& $overlay': {
            transform : 'translateY(0)',
            backgroundColor: theme.palette.type === 'light' ? theme.palette.surface[1] : theme.palette.surface[0],
        },
        '& $header': {
            transform: 'translateY(0%)',
            backgroundColor : 'transparent',
        },
        '& $buttonOverlay':{
          opacity: 1
        }
    }
  },
  media: {
      width: '100%',
      height: '60%',
  },
  overlay:{
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    borderRadius: '',   
    backgroundColor: theme.palette.type === 'light' ? theme.palette.surface[1] : theme.palette.surface[0],
    transform: 'translateY(100%)',
    transition: '.2s ease-in-out',
  },
  header: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: '2em',
    padding: '1.6em ',
    borderRadius: '40px',
    backgroundColor : 'transparent',
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
      display: 'flex',
      width: "100%",
      justifyContent: 'space-between',
  },
  itemHeader : {
    marginRight: '15%',
    textTransform: 'capitalize',
    width : "100%",
  },
  tagline: {
      display: 'block',
      margin: '1em 0',
      fontSize: '.7em ',
      color: '#D7BCA',
  },
  status: {
      fontSize: '1em',
      color: '#000',
  },
  description: {
      padding: '0 2em 2em',
      margin: '0',
      color: '#D8BDCA',
      display: '-webkit-box',
      '-webkit-box-orient': 'vertical',
      '-webkit-line-clamp': 3,
      overflow: 'hidden',
  },
  minBidPrice: {
    color: theme.palette.info.main
  },
  visibilityNone: {
    visibility: 'hidden',
  },
  avatarGroup:{
    marginLeft: theme.spacing(1.1),
  },
  avatar: {
    width:35,
    height: 35,
  },
  content:{
    display: 'flex',
    flexDirection: 'column',
  },
  purchaseBtn: {
    height: 26,
    borderRadius: 3,
    width: 103,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 10,
  },
  favoriteBtn: {
    background: theme.palette.surface[0],
    padding: 7,
    boxShadow: '0 4px 8px 6px #3333',
    '&:hover': {
      background: `${theme.palette.surface[0]}90`,
    },
  },
  bidButton: {
    padding: '5px 14px',
  },
  productWrapper: {
    minWidth: 258,
    margin: '0 10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent : 'center',
  }, 
  buttonOverlay:{
    position:'absolute',
    width:'100%',
    opacity:0,

    top: 0,
  },
  fire: {
    marginLeft: theme.spacing(0.25),
  },
  footer: {
    padding: '11px 2px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    color: theme.palette.text.primary,
    marginLeft: theme.spacing(0.25),
    letterSpacing: 0,
  },
  icon: {
    width : '12px',
    height: '12px',
    marginLeft: 6,
  },
  bidIcon:{
    marginRight: theme.spacing(1),
  }
}));

const ProductCard = ({ className, product, showFooter = false, user }: PropsType) => {
  const classes = useStyles();
  const history = useHistory();

  const owner = useProfileForWallet(product?.ownerAddress);
  const creator = useProfileForWallet(product?.initialCreatorAddress);

  function Footer() {
   return (
     <>
       <Box display="flex" alignItems="center">
         <img className={clsx(classes.bidIcon, 'icon-img')} src="/assets/images/bid-icon.png" alt="bid-icon" />
         <Tiny>
           Highest bid
           <TinyBold className={classes.price}>
             {`${0.0} ETH`}
           </TinyBold>
         </Tiny>
       </Box>
       <Box display="flex" alignItems="center">
         <Tiny >New bid</Tiny>
         <img className={clsx(classes.fire, 'icon-img')} src="/assets/images/fire.png" alt="new" />
       </Box>
     </>
   );
  }
  function Overlay() {
    return (
      <div className={classes.buttonOverlay}>
        <Box display="flex" justifyContent="space-around" alignItems="center" width="100%" position="relative"  top="15px">
          { product?.status!=0 && <FilledButton className={classes.purchaseBtn} size="small" color="success" label="Purchasing !" />}
          <IconButton className={classes.favoriteBtn} color="default" size="small">
            <FavoriteIcon color="error" fontSize="small" />
          </IconButton>
        </Box>
      
      </div>
    );
  }
  function CardsMedia() {
    return (
      <>
        {product?.assetType === undefined && (
          <CardMedia image={`${product?.assetUrl}`} className={classes.media}>
            {!product?.assetUrl && <TinyBold>Upload file to preview your brand new NFT</TinyBold>}
          </CardMedia>
        )}

        {product?.assetType == 'Image' && (
          <CardMedia image={`${product?.assetUrl}`} className={classes.media}>
            {!product?.assetUrl && <TinyBold>Upload file to preview your brand new NFT</TinyBold>}
          </CardMedia>
        )}
           {product?.assetType == 'GIF' && (
          <CardMedia image={`${product?.assetUrl}`} className={classes.media}>
            {!product?.assetUrl && <TinyBold>Upload file to preview your brand new NFT</TinyBold>}
          </CardMedia>
        )}
        {product?.assetType == 'Video' && (
          <>
            <video className={classes.media} controls autoPlay loop>
              <source src={product?.assetUrl} type="video/mp4" />
            </video>
          </>
        )}
        {product?.assetType == 'Audio' && (
          <CardMedia image={`${product?.bannerImage || '/assets/images/default-audio.jpeg'}`} className={classes.media}>
            <AudioPlayerButton product={product} />
          </CardMedia>
        )}
      </>
    );
  }

  return (
    <Card className={classes.card} elevation={0} onClick={() => history.push(`/product/${product?.baseID}`)} >
      <CardsMedia />
      {product?.assetUrl && <Overlay />}
      <div>
        <div className={classes.header}>
        <AvatarGroup max={5} className={classes.avatarGroup}>
          {owner && <Avatar src={owner?.profile?.userAvatarUrl} className={classes.avatar} />}
          {creator && <Avatar src={creator?.profile?.userAvatarUrl} className={classes.avatar} />}
        </AvatarGroup>
        <div className={classes.content}>
          <h3 className={classes.title}>
            <div className={classes.itemHeader}>{product?.assetUrl && product?.name}</div>
            <span>
              {product?.status == 2 && product?.price && product?.assetUrl && <PriceTag size="small" unit={<img className={classes.icon} src="/assets/images/binance.svg" />} price={product?.price} />}
            </span>
          </h3>
          <span className={classes.tagline}>
            {product?.assetUrl && product?.category}
          </span>  
          <span className={clsx(classes.tagline, (product?.status == 1 || product?.status == 3) && product?.minBidPrice ? '' : classes.visibilityNone)}> 
            Min Bid Price : 
              <span className={classes.minBidPrice}>
                {product?.minBidPrice} 
              </span>
              BNB
          </span>
          <p className={classes.status}> 
            {product?.startTime && product?.endTime && product?.assetUrl && (
                <Timer
                  startTime={parseInt(product?.startTime) * 1000}
                  textForEnd='End '
                  textForStart= 'Start  '
                  endTime={parseInt(product?.endTime) * 1000}
                />
              )}
          </p>
        </div>
        </div>

        <p className={classes.description}>
          {showFooter && (
                <CardActions className={classes.footer}>
                  <Footer />
                </CardActions>
            )}
        </p> 
      </div>
    </Card>
  );
};

export default ProductCard;


{/* PLACE A BID */}
{/*
 {product?.count && <Body2 className={classes.count}>{`${product?.count || 0} in stock`}</Body2>}
 
    <span>
      <FilledButton
        label="Place a bid"
        className={classes.bidButton}
        icon={<img src="/assets/images/bid-btn-icon.png" alt="bid-icon" />}
        handleClick={() => history.push(`/product/${product?.baseID}`)}
      /> 
    </span>
*/}