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
 
}));

const AuctionTime = ({ nftDetails }) => {
  const classes = useStyles();
  const [currentTime] = useState(Date.now());

  return (
    <div>
       {nftDetails?.nft?.status==3 && moment(nftDetails?.nft?.endTime * 1000 ).isSameOrAfter(currentTime) &&(
          <div >
            {nftDetails?.nft?.endTime && (
                <Timer endTime={nftDetails?.nft?.endTime * 1000 } />
            )}
          </div>
        )}
    </div>
  );
};


export default AuctionTime;
