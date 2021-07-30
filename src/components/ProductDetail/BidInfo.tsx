import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import SubTitle1 from '../Typography/Subtitle1';
import BasicTable from '../Table';
import Avatar from '@material-ui/core/Avatar';
import { Button } from '@material-ui/core';
import OutlinedButton from '../Buttons/OutlinedButton';
import { useState } from 'react';
import SellToUser from './SellToUser/index';
import { useProfileList } from '../../store/hooks';
import { truncateWalletString } from '../../utils';
import { FilledInput } from '@material-ui/core';
import FilledButton from '../Buttons/FilledButton';

const useStyles = makeStyles(theme => ({
  root: {},
  title: {
    marginBottom: theme.spacing(3),
  },
}));

const BidInfo = ({ bids, nftType, ownsProduct, sellNFTToUser }) => {
  const { profileList: profileList } = useProfileList();
  const [sellToUserObject, setSellToUserObject] = useState(null);

  const classes = useStyles();


  function sellToUser(bidderDetail) {
    console.log(bidderDetail);
  }
  function sellToUserDialogClose() {
    setSellToUserObject(null);
  }

  function showSellToUserDialog(bidder) {
    setSellToUserObject(bidder);
  }

  const rows = [
    // {
    //   price: 'price',
    //   info: `By Test User`,
    //   sell: <OutlinedButton label="Sell" size="" handleClick={() => showSellToUserDialog({ username: 'test 1' })} />,
    //   image: <Avatar src="/assets/images/users/2.jpg" />,
    // },
    // {
    //   price: 'price',
    //   info: `By Test User`,
    //   sell: <OutlinedButton label="Sell" size="" handleClick={() => showSellToUserDialog({ username: 'test 2' })} />,
    //   image: <Avatar src="/assets/images/users/2.jpg" />,
    // },
  ];

  for (let i = 0; i < bids?.length; i++) {
    const bidderProfile = profileList?.find(e => e.walletAddress.toLowerCase() == bids[i].bidder.toLowerCase());
    const bid = {
      price: `${bids[i].price} BNB`,
      info: `${bidderProfile?.displayName || truncateWalletString(bidderProfile?.walletAddress)}`,
      sell: (ownsProduct && nftType == "2") ? <FilledButton label="Sell" size="small" handleClick={() => sellNFTToUser(bidderProfile?.walletAddress)} /> : <></>,
      image: <Avatar src={bidderProfile?.userAvatarUrl} />,
    }
    rows.push(bid);
  }

  const columns = [
    { key: 'image', label: 'User' },
    { key: 'price', label: 'Info' },
    { key: 'info', label: 'Bidder' },
    { key: 'sell', label: '' },
  ];

  return (
    <div>
      <SubTitle1 color="primary" className={classes.title}>
        Bids
      </SubTitle1>
      <div>
        <BasicTable columns={columns} rows={rows} />
      </div>
      {sellToUserObject && (
        <SellToUser
          sellToUser={sellToUser}
          bidderProfile={sellToUserObject}
          show={sellToUserObject ? true : false}
          onClose={sellToUserDialogClose}
        />
      )}
    </div>
  );
};

export default BidInfo;
