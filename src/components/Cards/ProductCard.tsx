
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
    display: 'flex',
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
        },
        '& $buttonOverlay':{
          opacity: 1
        }
    }
  },
  media: {
      width: '100%',
      height: '60%',
      marginBottom: '30px'
  },
  overlay:{
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    borderRadius: '',    
    backgroundColor: '#fff',
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
    backgroundColor : '#fff',
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
  purchaseBtn: {
    height: 26,
    // paddingTop: 10,
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
    '& .overlay': {
      position: 'absolute',
      top: 5,
      left: 30,
      width: '20%',
      height: '20%',
      opacity: 0,
      transition: '.5s ease',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: theme.shape.cardBorderRadius,
      padding: theme.spacing(1, 0, 3),
    },
    '&:hover': {
      cursor: 'pointer',
      '& .overlay': {
        opacity: 1,
      },
    },
  }, 
  buttonOverlay:{
    position:'absolute',
     width:'100%',
     opacity:0,
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
    marginRight: theme.spacing(1),
  },
}));

const ProductCard = ({ className, product, showFooter = true, user }: PropsType) => {
  const classes = useStyles();
  const history = useHistory();

  const owner = useProfileForWallet(product?.ownerAddress);
  const creator = useProfileForWallet(product?.initialCreatorAddress);

function Footer() {
  return (
    <>
      <Box display="flex" alignItems="center">
        <img className={clsx(classes.icon, 'icon-img')} src="/assets/images/bid-icon.png" alt="bid-icon" />
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
        {/* <FilledButton
          label="Place a bid"
          className={classes.bidButton}
          icon={<img src="/assets/images/bid-btn-icon.png" alt="bid-icon" />}
          handleClick={() => history.push(`/product/${product?.baseID}`)}
        /> */}
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

      <div className={classes.overlay}>
        <div className={classes.header}>
          <AvatarGroup max={5} className={classes.avatarGroup}>
            {owner && <Avatar src={owner?.profile?.userAvatarUrl} className={classes.avatar} />}
            {creator && <Avatar src={creator?.profile?.userAvatarUrl} className={classes.avatar} />}
          </AvatarGroup>
     
          <div>
            <h3 className={classes.title}>
                owner:name
            </h3>
            <span className={classes.tagline}>
              category:name  
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


{/*  Timer */}
{/* 
     {product?.startTime && product?.endTime && product?.assetUrl && (
        <Timer
          startTime={parseInt(product?.startTime) * 1000}
          textForStart="Start in"
          textForEnd="Left"
          endTime={parseInt(product?.endTime) * 1000}
        />
      )}
*/}

{/* Footer */}
{/*
   {showFooter && (
      <>
        <Divider />
        <CardActions className={classes.footer}>
          <Footer />
        </CardActions>
      </>
    )}
*/}

{/* MIN BID PRICE */}

{/* 
    <span
        className={clsx(
          (product?.status == 1 || product?.status == 3) && product?.minBidPrice ? '' : classes.visibilityNone,
        )}
      >
        Min Bid Price :<span className={classes.minBidPrice}> {product?.minBidPrice} </span> BNB
      </span>
*/}


{/* BASIC INFO */}
{/*
<Box display="flex" alignItems="center" justifyContent="space-between">
<Body1 className={classes.title}>{product?.assetUrl && product?.name}</Body1>
{product?.status == 2 && product?.price && product?.assetUrl && <PriceTag price={product?.price} />}
</Box>
<Box>
<AvatarGroup max={5} className={classes.avatarGroup}>
  {owner && <Avatar src={owner?.profile?.userAvatarUrl} className={classes.avatar} />}
  {creator && <Avatar src={creator?.profile?.userAvatarUrl} className={classes.avatar} />}
</AvatarGroup>
 {product?.count && <Body2 className={classes.count}>{`${product?.count || 0} in stock`}</Body2>}
</Box> */}