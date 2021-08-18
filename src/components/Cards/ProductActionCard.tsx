
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import Title from '../Typography/Title';
import Body1 from '../Typography/Body1';
import FilledButton from '../Buttons/FilledButton';
import Pane from '../Pane';
import OutlinedButton from '../Buttons/OutlinedButton';
import { useState }   from 'react';
import Grid from '@material-ui/core/Grid';
import PlaceBid from '../ProductDetail/PlaceBid/index';
import UpdatePrice from '../ProductDetail/UpdatePrice';
import StartSale from '../ProductDetail/StartSale';
import Auction from '../ProductDetail/Auction';
import AuctionWithoutDeadline from '../ProductDetail/AuctionWithoutDeadline';

import { useWeb3React } from '@web3-react/core';
import {
  bid,
  buy,
  cancelBid,
  claimAuction,
  getBalanceOfBNB,
  // getBalanceOfWBNB,
  getFeePercent,
  startAuction,
  startDeadlineAuction,
  updatePrice,
  sell,
} from '../../utils/contracts';
import toast from 'react-hot-toast';
import { baseApiUrl } from '../../utils';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: theme.shape.cardBorderRadius,
    padding: '23px 23px 26px',
    boxShadow: '0 26px 26px 10px #1111',
    width: 380,
    margin: '32px auto',
    background: 'transparent',
    borderSize: 1,
    [theme.breakpoints.down('sm')]: {
      width: 280,
    },
  },
  button: {
    width: '45%',
    marginTop: theme.spacing(5),
    height:'20%',
    background: 'linear-gradient(rgba(236,45,162,1),transparent)'
  },
  productWrapper: {
    width: '100%',
    height: 500,
    borderRadius: theme.shape.cardBorderRadius,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    background: theme.palette.surface[1],
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

const ProductActionCard = ({ price,instBuyPrice, minBidPrice, ownsProduct, nftDetails }) => {
  const classes = useStyles();

  const [loginStatus, setLoginStatus] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [balanceBNB, setBalanceBNB] = useState(0);
  const [balanceWBNB, setBalanceWBNB] = useState(0);
  const [nftFee, setNFTFee] = useState(0);
  const [showAuctionWithDeadline, setShowAuctionWithDeadline] = useState(false);
  const [showPlaceBid, setShowPlaceBid] = useState(false);
  const [showAuction, setShowAuction] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [currentTime] = useState(new Date().getTime());
  const [showSale, setShowSale]=useState(false);

  const { connector, library, chainId, account, active } = useWeb3React();

  useEffect(() => {
    const isLoggedin = account && active && chainId === parseInt(process.env.REACT_APP_NETWORK_ID, 10);
    setLoginStatus(isLoggedin);

    getFeePercent(chainId, library).then(fee => {
      setNFTFee(fee);
    });

 /*   getBalanceOfWBNB(chainId, library, account).then(amountWBNB => {
      setBalanceWBNB(amountWBNB);
    });
*/
    getBalanceOfBNB(library, account).then(amountBNB => {
      setBalanceBNB(amountBNB);
    });
  }, [connector, library, account, active, chainId]);

  /////////////////////////// NFT Enable & Disable ////////////////////////////
  /*const updateNFTListingStatus = async () => {
    if (!loginStatus) {
      toast.error('Please connect correctly!');
      return;
    }
    if (nftDetails?.nft?.ownerAddress?.toLowerCase() !== account.toLowerCase()) {
      toast.error('You are not owner of this asset!');
      return;
    }

    setLoading(true);
    const load_toast_id = toast.loading('Please wait...');
    try {
      const txhash = await updateListingStatus(
        chainId,
        library.getSigner(),
        nftDetails?.nft?.tokenID,
        !nftDetails?.nft?.listed,
      );
      if (txhash !== false) {
        await fetch(`${baseApiUrl}/syncBlock`);
        toast.dismiss(load_toast_id);
        toast.success('NFT Listing Updated Successfully!');
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        toast.dismiss(load_toast_id);
        toast.error('NFT Listing Failed!');
      }
    } catch (error) {
      toast.dismiss(load_toast_id);
      toast.error('NFT Listing Failed!');
    }
    setLoading(false);
  };
  */
  /////////////////////////// NFT Price Update For Fixed Type ////////////////////////////
  const updateNFTPrice = async nftPrice => {
    modalClose();

    if (!loginStatus) {
      toast.error('Please connect correctly!');
      return;
    }
    if (nftDetails?.nft?.ownerAddress?.toLowerCase() !== account.toLowerCase()) {
      toast.error('You are not owner of this asset!');
      return;
    }

    setLoading(true);
    const load_toast_id = toast.loading('Please wait...');
    try {
      const txhash = await updatePrice(chainId, library.getSigner(), nftDetails?.nft?.tokenID, nftPrice);

      if (txhash !== false) {
        await fetch(`${baseApiUrl}/syncBlock`);
        toast.dismiss(load_toast_id);
        toast.success('NFT Price is updated successfully!');
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        toast.dismiss(load_toast_id);
        toast.error('NFT Price Update Failed!');
      }
    } catch (error) {
      toast.dismiss(load_toast_id);
      toast.error('NFT Price Update Failed!');
    }
    setLoading(false);
  };
  /////////////////////////// NFT Purchase For Fixed Type ////////////////////////////
  const buyNowNFT = async () => {
    if (!loginStatus) {
      toast.error('Please connect correctly!');
      return;
    }
    if (nftDetails?.nft?.ownerAddress?.toLowerCase() == account.toLowerCase()) {
      toast.error("Owner can't purchase their NFT.");
      return;
    }

    if (nftDetails?.nft?.listed === false) {
      toast.error('Currently not open for sale 🔒');
      return;
    }

    setLoading(true);
    const load_toast_id = toast.loading('Please wait...');
    try {
      const txhash = await buy(chainId, library.getSigner(), nftDetails?.nft?.tokenID, nftDetails?.nft?.price);
      if (txhash !== false) {
        await fetch(`${baseApiUrl}/syncBlock`);
        toast.success('Purchased current NFT!');
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      toast.error('NFT purchase failed!');
      console.log(error);
    }
    toast.dismiss(load_toast_id);
    setLoading(false);
  };
  /////////////////////////// Submit Bid ////////////////////////////
  const submitPlaceBid = async bidPrice => {
    if (!loginStatus) {
      toast.error('Please connect correctly!');
      return;
    }
    if (nftDetails?.nft?.ownerAddress?.toLowerCase() == account.toLowerCase()) {
      toast.error("Owner can't bid to their NFT.");
      return;
    }

    if (nftDetails?.nft?.listed === false) {
      toast.error('Currently not open for sale 🔒');
      return;
    }

    for (let i = 0; i < nftDetails?.bids?.length; i++) {
      if (account.toLowerCase() == nftDetails?.bids[i].bidder.toLowerCase()) {
        toast.error('You already bidded for this NFT!');
        return;
      }
    }
    
    if (nftDetails?.nft?.nftType == '2') {
      if (moment(nftDetails?.nft?.endTime * 1000).isBefore(new Date().getTime())) {
        toast.error('Auction is already ended!');
        return;
      }
      if (moment(nftDetails?.nft?.startTime * 1000).isAfter(new Date().getTime())) {
        toast.error('Auction is not started yet!');
        return;
      }
      
    }

    setLoading(true);
    const load_toast_id = toast.loading('Please wait...');
    try {
      const txhash = await bid(chainId, library, library.getSigner(), account, nftDetails?.nft?.tokenID, bidPrice);
      if (txhash !== false) {
        await fetch(`${baseApiUrl}/syncBlock`);
        toast.success('Bid Offered Successfully!');
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else toast.error('Bid Failed!');
    } catch (error) {
      toast.error('Bid Failed!');
      console.log(error);
    }
    toast.dismiss(load_toast_id);
    setLoading(false);
  };
  /////////////////////////// Claim Auction ////////////////////////////
  const submitClaimAuction = async () => {
    if (!loginStatus) {
      toast.error('Please connect correctly!');
      return;
    }
    if (nftDetails?.nft?.ownerAddress?.toLowerCase() !== account.toLowerCase()) {
      toast.error('You are not owner of this asset!');
      return;
    }

    if (moment(nftDetails?.nft?.endTime * 1000).isAfter(new Date().getTime())) {
      toast.error('Auction is not ended yet!');
      return;
    }

    setLoading(true);
    const load_toast_id = toast.loading('Please wait...');
    try {
      const txhash = await claimAuction(chainId, library.getSigner(), nftDetails?.nft?.tokenID);

      if (txhash !== false) {
        await fetch(`${baseApiUrl}/syncBlock`);
        toast.dismiss(load_toast_id);
        toast.success('NFT is claimed successfully!');
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        toast.dismiss(load_toast_id);
        toast.error('NFT Claim Failed!');
      }
    } catch (error) {
      toast.dismiss(load_toast_id);
      toast.error('NFT Claim Failed!');
    }
    setLoading(false);
  };
  /////////////////////////// Start Auction ////////////////////////////
  const auctionStart = async (minIncPercent,minBidPrice, startTime, endTime,instBuyPrice) => {
    modalClose();

    if (!loginStatus) {
      toast.error('Please connect correctly!');
      return;
    }
    if (nftDetails?.nft?.ownerAddress?.toLowerCase() !== account.toLowerCase()) {
      toast.error('You are not owner of this asset!');
      return;
    }

    /*if (moment(nftDetails?.nft?.endTime * 1000).isAfter(new Date().getTime())) {
      toast.error('Auction is not ended yet!');
      return;
    }
*/
    setLoading(true);
    const load_toast_id = toast.loading('Please wait...');
    
    try {
      if(endTime!=0){
        const txhash = await startDeadlineAuction(
          chainId,
          library.getSigner(),
          nftDetails?.nft?.tokenID,
          minBidPrice,
          minIncPercent,
          endTime,
          instBuyPrice
        );
        if (txhash !== false) {
          await fetch(`${baseApiUrl}/syncBlock`);
          toast.dismiss(load_toast_id);
          toast.success('NFT Auction Started successfully!');
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        } else {
          toast.dismiss(load_toast_id);
          toast.error('NFT Auction Start Failed!');
        }
      
      }
      else{
      const txhash = await startAuction(
        chainId,
        library.getSigner(),
        nftDetails?.nft?.tokenID,
        minBidPrice,
        minIncPercent,
        instBuyPrice
      );

      if (txhash !== false) {
        await fetch(`${baseApiUrl}/syncBlock`);
        toast.dismiss(load_toast_id);
        toast.success('NFT Auction Started successfully!');
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        toast.dismiss(load_toast_id);
        toast.error('NFT Auction Start Failed!');
      }
    }
  }
    catch (error) {
      toast.dismiss(load_toast_id);
      toast.error('NFT Auction Start Failed!');
    }
    setLoading(false);
    
      
  };
  /////////////////////////// Cancel Bid ////////////////////////////
  const cancelNFTBid = async () => {
    if (!loginStatus) {
      toast.error('Please connect correctly!');
      return;
    }

    setLoading(true);
    const load_toast_id = toast.loading('Please wait...');
    try {
      const txhash = await cancelBid(chainId, library.getSigner(), nftDetails?.nft?.tokenID);

      if (txhash !== false) {
        await fetch(`${baseApiUrl}/syncBlock`);
        toast.dismiss(load_toast_id);
        toast.success('Bid Cancelled successfully!');
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        toast.dismiss(load_toast_id);
        toast.error('Bid Cancel Failed!');
      }
    } catch (error) {
      toast.dismiss(load_toast_id);
      toast.error('Bid Cancel Failed!');
    }
    setLoading(false);
  };
////////////////////// SELL THIS///////////
const sellthis = async (nftPrice) => {
  if (!loginStatus) {
    toast.error('Please connect correctly!');
    return;
  }

  setLoading(true);
  const load_toast_id = toast.loading('Please wait...');
  try {
    const txhash = await sell(chainId, library.getSigner(), nftDetails?.nft?.tokenID,nftPrice);

    if (txhash !== false) {
      await fetch(`${baseApiUrl}/syncBlock`);
      toast.dismiss(load_toast_id);
      toast.success('Bid Cancelled successfully!');
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } else {
      toast.dismiss(load_toast_id);
      toast.error('Bid Cancel Failed!');
    }
  } catch (error) {
    toast.dismiss(load_toast_id);
    toast.error('Bid Cancel Failed!');
  }
  setLoading(false);
};
  function isAlreadyBid() {
    for (let i = 0; i < nftDetails?.bids?.length; i++) {
      if (account?.toLowerCase() == nftDetails.bids[i].bidder.toLowerCase()) return true;
    }
    return false;
  }

  function placeBidModal() {
    setShowPlaceBid(true);
  }
  function placeBidClose(value) {
    setShowPlaceBid(value);
  }

  function showActionModal() {
    setShowAuction(true);
  }
  function showActionDeadModal() {
    setShowAuctionWithDeadline(true);
  }
  function showSaleModal() {
    setShowSale(true);
  }
  function showUpdatePriceModal() {
    setShowPrice(true);
  }

  function modalClose() {
    setShowAuction(false);
    setShowPrice(false);
    setShowSale(false);
  }

  return (
    <Pane className={classes.root}>
      {nftDetails?.nft?.nftType == '0' && nftDetails?.nft?.listed==true && (
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Body1>Price For Buy:</Body1>
          <h3>{`${price} BNB`}</h3>
        </Box>
      )}
      {nftDetails?.nft?.nftType != '0' && nftDetails?.nft?.listed==true && nftDetails?.nft?.instBuyPrice!=0 &&  (
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Body1>INSTANT BUY! :</Body1>
          <h3>{`${instBuyPrice} BNB`}</h3>
        </Box>
      )}
      {nftDetails?.nft?.nftType == '1' && nftDetails?.nft?.listed==true && (
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Body1>Min Bid Price:</Body1>
          <h3>{`${minBidPrice}  BNB`}</h3>
        </Box>
      )}
      {nftDetails?.nft?.nftType == '2' && nftDetails?.nft?.listed==true && (
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Body1>Unlimited Auction & Bid</Body1>
        </Box>
      )}

      {ownsProduct && (
        <Grid container justify="space-between">
          {/* {(nftDetails?.nft?.nftType == '0' || nftDetails?.nft?.nftType == '2') && (
            <FilledButton
              className={classes.button}
              label={nftDetails?.nft.listed ? 'Disable for sale' : 'Enable for sale'}
              handleClick={cancelNFTBid}
            />
          )} */}
          {nftDetails?.nft?.listed == true && nftDetails?.nft?.nftType == '0' && (
            <OutlinedButton className={classes.button} label="Update Price" handleClick={showUpdatePriceModal} />
          )}
          {nftDetails?.nft?.listed == false && (
            <FilledButton className={classes.button} label="Sell With Fixed Price" handleClick={showSaleModal} />
          )}
          { nftDetails?.nft?.listed == false && (
            <FilledButton className={classes.button} label="Start an Auction With Deadline" handleClick={showActionModal} />
          )}
           { nftDetails?.nft?.listed == false && (
            <FilledButton className={classes.button} icon={<img  src="/assets/images/time.svg" alt="time-icon" />} label="Start an Unlimited Time Auction" handleClick={showActionDeadModal} />
          )}
          {nftDetails?.nft?.nftType != '0' &&
            nftDetails?.nft?.listed == true &&  nftDetails?.bids!==undefined &&
            moment(nftDetails?.nft?.endTime * 1000).isBefore(new Date().getTime()) && (
              <FilledButton className={classes.button}  label="Claim Auction" handleClick={submitClaimAuction} />
            )}
        </Grid>
      )}

      {!ownsProduct && nftDetails?.nft?.listed == true && (
        <Grid container justify="space-between">
          {nftDetails?.nft?.nftType == '0' && (
            <FilledButton className={classes.button} label="Buy Now" handleClick={buyNowNFT} />
          )}
          {nftDetails?.nft?.nftType != '0' && (
            <FilledButton className={classes.button} label=" INSTANT BUY RIGHT NOW " handleClick={buyNowNFT} />
          )}
          {nftDetails?.nft?.nftType != '0' && !isAlreadyBid() && (
            <FilledButton className={classes.button} label="Place Bid" handleClick={placeBidModal} />
          )}
          {nftDetails?.nft?.nftType != '0' && isAlreadyBid() && (
            <OutlinedButton className={classes.button} label="Cancel Bid" handleClick={cancelNFTBid} />
          )}
        </Grid>
      )}
      {showPlaceBid && (
        <PlaceBid
          onClose={placeBidClose}
          onSubmit={submitPlaceBid}
          balanceBNB={balanceBNB}
       //   balanceWBNB={balanceWBNB}
          nftFee={nftFee}
        />
      )}
      {showPrice && <UpdatePrice onClose={modalClose} onUpdate={updateNFTPrice} />}
      {showSale && <StartSale onClose={modalClose} onUpdate={sellthis} />}
      {showAuction && <Auction onClose={modalClose} onAuctionStart={auctionStart} />}
      {showAuctionWithDeadline && <AuctionWithoutDeadline onClose={modalClose} onAuctionStart={auctionStart} />}
    </Pane>
  );
};

ProductActionCard.propTypes = {
  price: PropTypes.number,
  onClick: PropTypes.func,
};

ProductActionCard.defaultProps = {
  price: '',
};

export default ProductActionCard;
