import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import PropTypes from 'prop-types';
import ImageWrapper from '../ImageWrapper';
import OutlinedButton from '../Buttons/OutlinedButton';
import Body2 from '../Typography/Body2';
import FilledButton from '../Buttons/FilledButton';
import { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import UpdatePrice from './UpdatePrice/index';
import Auction from './Auction/index';
import Body1 from '../Typography/Body1';
import UpdateIcon from '@material-ui/icons/Update';
import Timer from '../Timer';
import moment from 'moment';
import { CardMedia } from '@material-ui/core';
import AudioPlayerButton from '../AudioPlayer/AudioPlayerButton';

const useStyles = makeStyles(theme => ({
  root: {},
  productWrapper: {
    width: '100%',
    height: 500,
    borderRadius: theme.shape.cardBorderRadius,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    background: theme.palette.surface[1],
    position: 'relative',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  offers: {
    minHeight: 150,
    borderRadius: theme.shape.cardBorderRadius,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    border: `1px solid ${theme.palette.surface[2]}`,
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
  },
  icon: {
    color: theme.palette.text.primary,
    marginRight: theme.spacing(2),
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  status: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: theme.palette.surface[2],
    padding: theme.spacing(1.5, 0),
    borderRadius: theme.shape.borderRadius,
    margin: '10px 0px',
  },
  bottom: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 15,
    '& button': {
      width: theme.spacing(18),
    },
  },
  timer: {
    '& div': {
      border: 0,
      position: 'relative',
      margin: 'auto',
      background: 'transparent',
      display: 'inline-block',
    },
  },
}));

const ProductImage = ({ src, nftDetails }) => {
  const classes = useStyles();
  const [showAuction, setShowAuction] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [currentTime] = useState(new Date().getTime());

  console.log('nftDetails', nftDetails);

  function showActionModal() {
    setShowAuction(true);
  }
  function showUpdatePriceModal() {
    setShowPrice(true);
  }

  function modalClose() {
    setShowAuction(false);
    setShowPrice(false);
  }

  const MediaBox = () => {
    return (
      <>
        {nftDetails?.nft?.assetType == 'Image' && <ImageWrapper className={classes.productWrapper} content={src} />}
        {nftDetails?.nft?.assetType == 'Video' && (
          <>
            <video className={classes.productWrapper} controls>
              <source src={src} type="video/mp4" />
            </video>
          </>
        )}
        {nftDetails?.nft?.assetType == 'Audio' && (
          <CardMedia
            image={`${nftDetails?.nft?.bannerImage || '/assets/images/default-audio.jpeg'}`}
            className={classes.productWrapper}
          >
            <AudioPlayerButton product={nftDetails?.nft} showBottomBg={false} />
          </CardMedia>
        )}
      </>
    );
  };

  function updateNFTListingStatus() {}
  return (
    <div>
      <MediaBox />
      {moment(nftDetails?.nft?.startTime * 1000).isSameOrAfter(currentTime) && (
        <div className={classes.status}>
          <UpdateIcon className={classes.icon} />
          <Body1 className={classes.timer}>
            Auction starts in{' '}
            {nftDetails?.nft?.startTime && nftDetails?.nft?.endTime && (
              <Timer endTime={nftDetails?.nft?.startTime * 1000} />
            )}
          </Body1>
        </div>
      )}
      {!moment(nftDetails?.nft?.startTime * 1000).isSameOrAfter(currentTime) &&
        moment(nftDetails?.nft?.endTime * 1000).isSameOrAfter(currentTime) && (
          <div className={classes.status}>
            <UpdateIcon className={classes.icon} />
            <Body1 className={classes.timer}>
              Auction ends in{' '}
              {nftDetails?.nft?.startTime && nftDetails?.nft?.endTime && (
                <Timer endTime={nftDetails?.nft?.endTime * 1000} />
              )}
            </Body1>
          </div>
        )}
    </div>
  );
};

ProductImage.propTypes = {
  onClick: PropTypes.func,
};

export default ProductImage;
