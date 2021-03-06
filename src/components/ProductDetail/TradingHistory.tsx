import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import SubTitle1 from '../Typography/Subtitle1';
import BasicTable from '../Table';
import { truncateWalletString } from '../../utils';
import { useProfileList } from '../../store/hooks';
import moment from 'moment';
import { Avatar } from '@material-ui/core';
import { Profile } from '../../store/types';

const useStyles = makeStyles(theme => ({
  root: {},
  title: {
    marginBottom: theme.spacing(3),
  },
}));

const TradingHistory = ({ historyEvents  }) => {
  const classes = useStyles();

  const { profileList } = useProfileList();

  const sorted_nft_events = historyEvents?.sort((evt1, evt2) => {
    if (evt1.doneOn > evt2.doneOn) return -1;
    if (evt1.doneOn < evt2.doneOn) return 1;
    return 0;
  });

  const columns = [
    { key: 'user_image', label: '' },
    { key: 'display_name', label: 'Name' },
    { key: 'event_content', label: 'Event' },
    { key: 'event_date', label: 'Date' },
  ];
  const rows = [
    // {
    //   user_image: <Avatar src="/assets/images/users/2.jpg" />,
    //   display_name: 'test',
    //   event_content: 'Fat',
    //   event_date: 'Carbs',
    // }
  ];

  for (var i = 0; i < sorted_nft_events?.length; i++) {
    let doneOn = sorted_nft_events[i].doneOn;
    let eventType = sorted_nft_events[i].eventType;

    let user_wallet = '';
    let user_image = '';
    let user_name = '';
    let user_verified = false;
    let event_content = '';
    let event_date = moment(doneOn * 1000).fromNow();

    if (eventType === 0) {
      let minter = sorted_nft_events[i].minter;

      let user = null;
      if (profileList) user = profileList.find(user => user.walletAddress === minter);

      user_wallet = minter;
      user_image = user && user.userAvatarUrl ? user.userAvatarUrl : '/img/default-profile.png';
      user_name = user && user.displayName ? user.displayName : truncateWalletString(minter);
      user_verified = user && user.verified ? user.verified : false;
      event_content = 'The NFT was minted';
    } else if (eventType === 1) {
      // let seller = sorted_nft_events[i].seller;
      let buyer = sorted_nft_events[i].buyer;
      let nftSoldAtPrice = sorted_nft_events[i].nftSoldAtPrice;

      let user = null;
      if (profileList) user = profileList.find(user => user.walletAddress === buyer);

      user_wallet = buyer;
      user_image = user && user.userAvatarUrl ? user.userAvatarUrl : '/img/default-profile.png';
      user_name = user && user.displayName ? user.displayName : truncateWalletString(buyer);
      user_verified = user && user.verified ? user.verified : false;
      event_content = `Bought at ${nftSoldAtPrice} BNB`;
    } else if (eventType === 2) {
      let priceUpdater = sorted_nft_events[i].priceUpdater;
      let newNftPrice = sorted_nft_events[i].newNftPrice;
      // let oldNftPrice = sorted_nft_events[i].oldNftPrice;

      let user = null;
      if (profileList) user = profileList.find(user => user.walletAddress === priceUpdater);

      user_wallet = priceUpdater;
      user_image = user && user.userAvatarUrl ? user.userAvatarUrl : '/img/default-profile.png';
      user_name = user && user.displayName ? user.displayName : truncateWalletString(priceUpdater);
      user_verified = user && user.verified ? user.verified : false;
      event_content = `Put on sale for ${newNftPrice} BNB`;
    } else if (eventType === 7) {
      // let seller = sorted_nft_events[i].seller;
      let buyer = sorted_nft_events[i].buyer;
      let nftSoldAtPrice = sorted_nft_events[i].nftSoldAtPrice;

      let user = null;
      if (profileList) user = profileList.find(user => user.walletAddress === buyer);

      user_wallet = buyer;
      user_image = user?.userAvatarUrl;
      user_name = user && user.displayName ? user.displayName : truncateWalletString(buyer);
      user_verified = user && user.verified ? user.verified : false;
      event_content = `Bought at ${nftSoldAtPrice} BNB From Bid`;
    } else {
      continue;
    }
    rows.push({
      user_image: <Avatar src={user_image} />,
      display_name: user_name,
      event_content: event_content,
      event_date: event_date
    });
  }

  return (
    <div>
      <SubTitle1 color="primary" className={classes.title}>
        Trading History
      </SubTitle1>
      <div>
        <BasicTable columns={columns} rows={rows} />
      </div>
    </div>
  );
};

export default TradingHistory;
