
import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
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
import { useStyles } from './style';
interface PropsType {
  className?: string;
  product?: NFTObjectData;
  showFooter?: boolean;
  user?: NFTUserFullDetail;
}

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
            <video className={classes.media} controls >
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
      <div className={classes.header}>
          <div className={classes.container}>
            <div className={classes.itemHeader}>
              <p className={classes.title}>
                {product?.assetUrl &&  product?.name.slice(0, 9)} 
              </p>
              <p className={classes.tagline}>
                {product?.category}
              </p>
            </div>
            <AvatarGroup max={5} className={classes.avatarGroup}>
              {owner && <Avatar src={owner?.profile?.userAvatarUrl} className={classes.avatar} />}
              {creator && <Avatar src={creator?.profile?.userAvatarUrl} className={classes.avatar} />}
            </AvatarGroup>
          </div>
          <div className={classes.container}>
            <h4 className={classes.price}>
              {product?.status == 2 && product?.price && product?.assetUrl && <PriceTag size="small" unit={<img className={classes.icon} src="/assets/images/binance.svg" />} price={product?.price} />}
            </h4>
            <span className={clsx(classes.tagline, (product?.status == 1 || product?.status == 3) && product?.minBidPrice ? '' : classes.visibilityNone)}> 
                <span className={classes.minBidPrice}>
                   Min Bid Price : {product?.minBidPrice}  BNB
                </span>
            </span>
            <p className={classes.timer}> 
              { product?.endTime && product?.assetUrl && (
                <Timer
                  textForEnd='Ends In '
                  endTime={product?.endTime*1000}
                />
              )}
            </p>
          </div>
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
{/* 
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
*/}

