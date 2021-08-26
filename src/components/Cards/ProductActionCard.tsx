
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
  cancelAuction,
} from '../../utils/contracts';
import toast from 'react-hot-toast';
import { baseApiUrl } from '../../utils';
import moment from 'moment';
import TopArtistsSection from '../TopArtists';

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: theme.shape.cardBorderRadius,
    padding: '23px 23px 26px',
    width: 380,
    margin: '32px auto',
    background: 'transparent',
    borderSize: 0,
    [theme.breakpoints.down('sm')]: {
      width: 280,
    },
  },
  button: {
    width: '45%',
    marginTop: theme.spacing(5),
    height:'20%',
    background: 'linear-gradient(140deg, rgba(242,220,102,1) 16%, rgba(255,37,213,0.8519782913165266) 68%)',
    
  },
  buyNowButton:{
    margin: '0px',
    minWidth: '0px',
    appearance: 'none',
    userSelect: 'none',
    cursor: 'pointer',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    display: 'inline-flex',
    '-webkit-box-align': 'center',
    alignItems: 'center',
    '-webkit-box-pack': 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    textAlign: 'center',
    textDecoration: 'none',
    outline: 'none',
    fontWeight: 500,
    lineWeight: '20px',
    wordBreak:'keep-all',
    color: "#fff",
    borderRadius: '4px',
    padding: '4px 8px',
    minHeight: '24px',
    border: 'none',
    backgroundImage: 'linear-gradient(140deg, rgba(242,220,102,1) 16%, rgba(255,37,213,0.8519782913165266) 58%)',
    width: '50%',
    height: '48px',
    fontSize: '16px',
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
      console.log(fee);
    });

 /*   getBalanceOfWBNB(chainId, library, account).then(amountWBNB => {
      setBalanceWBNB(amountWBNB);
    });
*/
    getBalanceOfBNB(library, account).then(amountBNB => {
      setBalanceBNB(amountBNB);
    });
  }, [connector, library, account, active, chainId]);
/////////////////// Cancel Auction //////////////////////////////

const cancelNFTAuction= async () => {
  if (!loginStatus || !ownsProduct) {
    toast.error('Please connect correctly!');
    return;
  }

  setLoading(true);
  const load_toast_id = toast.loading('Please wait...');
  try {
    const txhash = await cancelAuction(chainId, library.getSigner(), nftDetails?.nft?.tokenID);

    if (txhash !== false) {
      await fetch(`${baseApiUrl}/syncBlock`);
      toast.dismiss(load_toast_id);
      toast.success('Auction Cancelled successfully!');
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } else {
      toast.dismiss(load_toast_id);
      toast.error('Auction Cancel Failed!');
    }
  } catch (error) {
    toast.dismiss(load_toast_id);
    toast.error('Auction Cancel Failed!');
  }
  setLoading(false);
};













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
      const txhash = await buy(chainId, library.getSigner(), nftDetails?.nft?.tokenID, nftDetails?.nft?.price.toString());
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
      if (moment(nftDetails?.nft?.endTime * 1000).isBefore(Date.now())) {
        toast.error('Auction is already ended!');
        return;
      }
    
      
    }

    setLoading(true);
    const load_toast_id = toast.loading('Please wait...');
    try {
      const txhash = await bid(chainId, library, library.getSigner(), account, nftDetails?.nft?.tokenID, bidPrice.toString());
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
    console.log("Now End Time comes here as: "+ endTime);
    try {
      if(endTime){
        const txhash = await startDeadlineAuction(
          chainId,
          library.getSigner(),
          nftDetails?.nft?.tokenID,
          minBidPrice.toString(),
          minIncPercent.toString(),
          endTime,
          instBuyPrice.toString()
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
        minBidPrice.toString(),
        minIncPercent.toString(),
        instBuyPrice.toString()
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
    const txhash = await sell(chainId, library.getSigner(), nftDetails?.nft?.tokenID,nftPrice.toString());

    if (txhash !== false) {
      await fetch(`${baseApiUrl}/syncBlock`);
      toast.dismiss(load_toast_id);
      toast.success('Bid Cancelled successfully!');
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } else {
      toast.dismiss(load_toast_id);
      toast.error('Bid Cancel Failed! :' );
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
    setShowAuctionWithDeadline(false);
  }

  return (
    <Pane className={classes.root}>
      {/* {nftDetails?.nft?.status == 2 && nftDetails?.nft?.listed==true && (
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Body1>Fixed Price To Buy :</Body1>
          <h3>{`${price} BNB`}</h3>
        </Box>
      )}
      {(nftDetails?.nft?.status == 1 || nftDetails?.nft?.status == 3) && nftDetails?.nft?.listed==true && nftDetails?.nft?.instBuyPrice!=0 &&  (
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Body1>INSTANT BUY! :</Body1>
          <h3>{`${instBuyPrice} BNB`}</h3>
        </Box>
      )}
      {(nftDetails?.nft?.status == 1 || nftDetails?.nft?.status == 3) && nftDetails?.nft?.listed==true && (
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Body1>Min Bid Price:</Body1>
          <h3>{`${minBidPrice}  BNB`}</h3>
        </Box>
      )}
      {nftDetails?.nft?.status == 1 && nftDetails?.nft?.listed==true && (
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Body1>Unlimited Auction & Bid</Body1>
        </Box>
      )} */}

      { loginStatus && ownsProduct  && (
        <Grid container justify="space-between">
          {(nftDetails?.nft?.status == 1 || nftDetails?.nft?.status == 3) && !nftDetails?.bids?.length && nftDetails?.nft.listed && (
            <FilledButton
              className={classes.button}
              label={'Cancel Auction'}
              handleClick={cancelNFTAuction}
            />
          )} 
          
          {nftDetails?.nft?.listed == true && nftDetails?.nft?.status == 2 && (
            <OutlinedButton className={classes.buyNowButton} label="Update Price" handleClick={showUpdatePriceModal} />
          )}
          {nftDetails?.nft?.listed == false && (
            <FilledButton className={classes.buyNowButton} label="Sell With Fixed Price" handleClick={showSaleModal} />
          )}
          { nftDetails?.nft?.listed == false && (
            <FilledButton className={classes.buyNowButton} label="Start an Auction With Deadline" handleClick={showActionModal} />
          )}
           { nftDetails?.nft?.listed == false && (
            <FilledButton className={classes.buyNowButton} icon={<img  src="/assets/images/time.svg" alt="time-icon" />} label="Start an Unlimited Time Auction" handleClick={showActionDeadModal} />
          )}
          {(nftDetails?.nft?.status == 1 || nftDetails?.nft?.status == 3) &&
            nftDetails?.nft?.listed == true &&  nftDetails?.bids?.length>0 &&
            (
              <FilledButton className={classes.buyNowButton}  label="Claim Auction" handleClick={submitClaimAuction} />
            )}
        </Grid>
      )}

      {!ownsProduct && nftDetails?.nft?.listed == true && loginStatus &&(
        <Grid container justify="space-between">
          {nftDetails?.nft?.status == 2 && (
            <FilledButton className={classes.buyNowButton} label="Buy Now" handleClick={buyNowNFT} />
          )}
          {(nftDetails?.nft?.status == 1 || nftDetails?.nft?.status == 3) && (
            <FilledButton className={classes.buyNowButton} label=" INSTANT BUY RIGHT NOW " handleClick={buyNowNFT} />
          )}
          {(nftDetails?.nft?.status == 1 || (nftDetails?.nft?.status == 3 &&  moment(nftDetails?.nft?.endTime * 1000).isAfter(new Date().getTime()))) && !isAlreadyBid() && (
            <FilledButton className={classes.buyNowButton} label="Place Bid" handleClick={ placeBidModal} />
          )}
          {(nftDetails?.nft?.status == 1 || (nftDetails?.nft?.status == 3 && moment(nftDetails?.nft?.endTime * 1000).isBefore(new Date().getTime()))) && isAlreadyBid() && (
            <OutlinedButton className={classes.buyNowButton} label="Cancel Bid" handleClick={cancelNFTBid} />
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
        
          bidders={nftDetails?.bids}
          minBidInc={nftDetails?.nft?.minBidInc}
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
