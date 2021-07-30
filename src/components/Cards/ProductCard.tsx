
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
import { NFTObjectData } from '../../hooks/useApi';
import { useProfileForWallet } from '../../store/hooks';
import  AudioPlayerButton  from '../AudioPlayer/AudioPlayerButton';

interface PropsType {
  className?: string;
  product?: NFTObjectData;
  showFooter?: boolean;
}

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: theme.shape.cardBorderRadius,
    background: 'transparent',
    maxWidth: 258,
    margin: 'auto',
  },
  media: {
    width: '100%',
    maxWidth: 258,
    height: 304,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    background: theme.palette.surface[2],
    borderRadius: theme.shape.cardBorderRadius,
    backgroundSize: 'cover !important',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
    },
  },
  content: {
    padding: '10px 0 12px',
    height: 130,
  },
  avatarGroup: {
    marginLeft: theme.spacing(1.1),
  },
  avatar: {
    width: 25,
    height: 25,
  },
  title: {
    fontWeight: 500,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
  },
  noPreview: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  price: {
    color: theme.palette.text.primary,
    marginLeft: theme.spacing(0.25),
    letterSpacing: 0,
  },
  minBidPrice: {
    color: theme.palette.warning.main,
  },
  count: {
    letterSpacing: 1.1,
  },
  footer: {
    padding: '11px 2px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fire: {
    marginLeft: theme.spacing(0.25),
  },
  favoriteBtn: {
    background: theme.palette.surface[0],
    padding: 6,
    boxShadow: '0 4px 8px 6px #3333',
    '&:hover': {
      background: `${theme.palette.surface[0]}90`,
    },
  },
  bidButton: {
    padding: '5px 14px',
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
  visibilityNone: {
    visibility: 'hidden',
  },
  productWrapper: {
    position: 'relative',
    width: '100%',
    maxWidth: 258,
    height: 304,
    '& .overlay': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      opacity: 0,
      transition: '.5s ease',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: theme.shape.cardBorderRadius,
      padding: theme.spacing(1, 1, 2),
    },

    '&:hover': {
      cursor: 'pointer',
      '& .overlay': {
        opacity: 1,
        // background: theme.palette.action.hover,
      },
    },
  },
}));

const ProductCard = ({ className, product, showFooter = false }: PropsType) => {
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
      <div className="overlay">
        <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
          <FilledButton className={classes.purchaseBtn} size="small" color="success" label="Purchasing !" />
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
    <Card
      className={clsx(classes.root, className)}
      elevation={0}
      onClick={() => history.push(`/product/${product?.baseID}`)}
    >
      <div className={classes.productWrapper}>
        <CardsMedia />
        {product?.assetUrl && <Overlay />}
      </div>
      {product?.startTime && product?.endTime && product?.assetUrl && (
        <Timer
          startTime={parseInt(product?.startTime) * 1000}
          textForStart="Start in"
          textForEnd="Left"
          endTime={parseInt(product?.endTime) * 1000}
        />
      )}
      <CardContent className={classes.content}>
        <Body1
          className={clsx(
            classes.minBidPrice,
            product?.nftType == '1' && product?.minBidPrice ? '' : classes.visibilityNone,
          )}
        >
          Min Bid Price : {product?.minBidPrice} BNB
        </Body1>

        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Body1 className={classes.title}>{product?.assetUrl && product?.name}</Body1>
          {product?.nftType == '0' && product?.price && product?.assetUrl && <PriceTag price={product?.price} />}
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-between" marginTop="12px">
          <AvatarGroup max={5} className={classes.avatarGroup}>
            {owner && <Avatar src={owner?.profile?.userAvatarUrl} className={classes.avatar} />}
            {creator && <Avatar src={creator?.profile?.userAvatarUrl} className={classes.avatar} />}
          </AvatarGroup>
          {/* {product?.count && <Body2 className={classes.count}>{`${product?.count || 0} in stock`}</Body2>} */}
        </Box>
      </CardContent>
      {showFooter && (
        <>
          <Divider />
          <CardActions className={classes.footer}>
            <Footer />
          </CardActions>
        </>
      )}
    </Card>
  );
};

export default ProductCard;
