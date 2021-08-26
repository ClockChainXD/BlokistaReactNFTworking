import React,  { useState }  from 'react';
// import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Container from '../../components/Layout/Container';
import Body1 from '../../components/Typography/Body1';
import Body2 from '../../components/Typography/Body2';
import ProductImage from '../../components/ProductDetail/ProductImage';
import { useHistory, useLocation } from 'react-router-dom';
import { useGetNFTObjectDetail } from '../../hooks/useApi';
import { useFetchPriceList, useGetApiPrice, useProfile } from '../../store/hooks';
import { useWeb3React } from '@web3-react/core';
import toast from 'react-hot-toast';
import { claimAuction } from '../../utils/contracts';
import { baseApiUrl, getContractInfo } from '../../utils';
import { Avatar, Divider, Typography } from '@material-ui/core';
import clsx from 'clsx';
import moment from 'moment';
import { useStyles } from './style';
import ProductActionCard from '../../components/Cards/ProductActionCard';
import Timer from '../../components/Timer'
import Auction from '../../components/ProductDetail/Auction';
import AuctionTime from '../../components/ProductDetail/AuctionTime';
import { pricesSlice } from '../../store/prices';
import TradingHistory from '../../components/ProductDetail/TradingHistory';
import BidInfo from '../../components/ProductDetail/BidInfo';

const ProductDetail = () => {
  const classes = useStyles();
const contractOfNFT=getContractInfo('BlokistaVault',97);
  const refreshClickHandler = () => {
    console.log('refreshClickHandler clicked ! ');
  };
  const shareClickHandler = () => {
    console.log('shareClickHandler clicked ! ');
  };
  const reportClickHandler = () => {
    console.log('reportClickHandler clicked ! ');
  };
  const makeAnOfferClickHandler = () => {
    console.log('makeAnOfferClickHandler clicked ! ');
  };

  const location = useLocation();
 const history=useHistory();
  const baseId = location.pathname.split('/').pop();
  const nftObjectDetail = useGetNFTObjectDetail(baseId);
  console.log(nftObjectDetail)
  const { profile } = useProfile();
  const [currentTime] = useState(Date.now())
  useFetchPriceList();
  const price  =useGetApiPrice('0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c');
  console.log("Thisd:" + price)
  function isOwnsProduct() {
    return nftObjectDetail?.owner?.walletAddress?.toLowerCase() === profile?.walletAddress?.toLowerCase();
  }

  const { connector, library, chainId, account, active } = useWeb3React();

  const sellNFTToUser = async () => {
    const load_toast_id = toast.loading('Please wait...');
    try {
      const retVal = await claimAuction(chainId, library.getSigner(), nftObjectDetail?.nft?.tokenID);
      if (retVal !== false) {
        toast.success("NFT is Sold Successfully");
        setTimeout(async function () {
          await fetch(`${baseApiUrl}/syncBlock`);
          window.location.reload();
        }, 3000);
      }
      else
        toast.error("NFT Sale Failed");
    } catch (e) {
      toast.error("NFT Sale Failed");
    }
    toast.dismiss(load_toast_id);
  }

  return (
    <div className={classes.root}>
      <Container>
        <Grid container spacing={5}>
          <Grid xs={4} className={classes.media}>
            <ProductImage
              nftDetails={nftObjectDetail}
              src={nftObjectDetail?.nft?.assetUrl}
            />

            {/* DESCRIPTION SECTION */}
            <Body1 className={classes.description} color="secondary">
              <h6> Description 
                <span className={classes.category}>
                  {" " + nftObjectDetail?.nft?.category}
                </span>
              </h6>
              <div className={classes.descriptionText}>
                
                { nftObjectDetail?.nft?.description }
              </div>

            </Body1>
          
            <Body2 className={classes.contract}>
              <span className={classes.addressTitle}>
                Contract Adress
              </span>
              <span className={classes.address}>
                {contractOfNFT.address}
              </span>
              <span className={classes.addressTitle} style={{marginTop: '15px',}}>
                Token ID
              </span>
              <span className={classes.address}>
                {nftObjectDetail?.nft?.tokenID}
              </span>
            </Body2>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid xs={6} className={classes.info}>
            <div className={classes.box}>
              <p className={classes.headerNft}>
                {nftObjectDetail?.nft?.name}
              </p>
            </div>
            <div className={classes.profile}>
              <div className={classes.owner} onClick={() => history.push(`/profile/${nftObjectDetail?.owner?.customUrl ? nftObjectDetail?.owner?.customUrl : nftObjectDetail?.owner?.walletAddress }`)}>
                { <Avatar className={classes.avatar} src={nftObjectDetail?.owner?.userAvatarUrl} />}
                <div className={clsx(classes.user)}>
                  <span className={classes.bold}>Owner</span>
                  <span>{nftObjectDetail?.owner.displayName}</span>
                </div>
              </div>
              <div className={classes.creator}  onClick={() => history.push(`/profile/${nftObjectDetail?.creator?.customUrl ? nftObjectDetail?.creator?.customUrl : nftObjectDetail?.creator?.walletAddress }`)}>
                {<Avatar className={classes.avatar} src={nftObjectDetail?.creator?.userAvatarUrl} />}
                <div className={clsx(classes.user)}>
                  <span className={classes.bold}>Creator</span>
                  <span>{nftObjectDetail?.owner.displayName}</span>
                </div>
              </div>
            </div>            
            <div className={classes.auctionBox}>
                {/* {nftObjectDetail?.nft?.status==3  && moment(nftObjectDetail?.nft?.endTime * 1000).isSameOrAfter(currentTime) &&(
            
           <div className={classes.auctionBox}>
                {nftObjectDetail?.nft?.status==3  && moment((nftObjectDetail?.nft?.endTime) * 1000).isSameOrAfter(currentTime) &&(
                <div >
                  {nftObjectDetail?.nft?.endTime && (
                      <Timer endTime={(nftObjectDetail?.nft?.endTime)*1000} />
                  )}
                </div>
              )} */}

              {/* <AuctionTime nftDetails={nftObjectDetail} /> */}
            </div> 
            { (nftObjectDetail?.nft?.status==3 || nftObjectDetail?.nft?.status==1) &&
            <div className={classes.bid}>
              <div>
                <Typography className={classes.bidText}>Current Bid</Typography>
                <div className={classes.flexRow}>
                  <h4 className={classes.price}>
                    <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png" className={classes.priceLogo} />
                    <span>{(nftObjectDetail?.bids[nftObjectDetail?.bids?.length-1]?.price)} BNB</span> 
                  </h4>
                  <span className={classes.realPrice}> ≈ $ {(parseFloat(price?.toString())*parseFloat(nftObjectDetail?.nft?.instBuyPrice)).toFixed(2)} </span>
                </div>
              </div>
              {nftObjectDetail?.nft?.status==3  && moment((nftObjectDetail?.nft?.endTime) * 1000).isSameOrAfter(currentTime) &&
              <div>
                <div className={classes.auctionText}>Ends in</div>
                <Timer endTime={(nftObjectDetail?.nft?.endTime)*1000}/>
              </div>
              }
            </div>
}
          { nftObjectDetail?.nft?.status==2 &&

          <div>
          <Typography className={classes.bidText}> Price</Typography>
          <div className={classes.flexRow}>
            <h4 className={classes.price}>
              <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png" className={classes.priceLogo} />
              <span>{(nftObjectDetail?.nft?.price)} BNB</span> 
            </h4>
            <span className={classes.realPrice}> ≈ $ {(parseFloat(price?.toString())*parseFloat(nftObjectDetail?.nft?.price)).toFixed(2)} </span>
          </div>
          </div>

          }    
            <ProductActionCard
              price={parseFloat(nftObjectDetail?.nft?.price)}
              instBuyPrice={parseFloat(nftObjectDetail?.nft?.instBuyPrice)}
              minBidPrice={parseFloat(nftObjectDetail?.nft?.minBidPrice)}
              ownsProduct={isOwnsProduct()}
              nftDetails={nftObjectDetail}
            />
        
           <TradingHistory historyEvents={nftObjectDetail?.historyEvents} />
          </Grid>
          
          <Grid xs={5} style={{marginTop: 25,}}>
            <BidInfo bids={nftObjectDetail?.bids} nftType={nftObjectDetail?.nft?.nftType} ownsProduct={isOwnsProduct()} sellNFTToUser={sellNFTToUser} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

ProductDetail.propTypes = {};

ProductDetail.defaultProps = {};

export default ProductDetail;
{/* SOCIAL BUTTON */}
{/* 
  <div className={classes.row}>
    <div className={classes.tag}>
      <VisibilityIcon className={classes.icon} />
      <Body2>14 Views</Body2>
    </div>
    <ButtonGroup className={classes.btnGroup}>
      <Button onClick={refreshClickHandler}>Refresh</Button>
      <Button onClick={shareClickHandler}>Share</Button>
      <Button onClick={reportClickHandler}>Report</Button>
    </ButtonGroup>
  </div>  
  */}

{/* NFT INFO */}
{/*
 <Grid item md={6} sm={6} xs={12}>
    <Title className={classes.title}>{nftObjectDetail?.nft?.name}</Title>
    <Body1 color="secondary" >
      CREATED BY: {nftObjectDetail?.creator?.displayName}
    </Body1>
     <ProductActionCard
              price={parseFloat(nftObjectDetail?.nft?.price)}
              instBuyPrice={parseFloat(nftObjectDetail?.nft?.instBuyPrice)}
              minBidPrice={parseFloat(nftObjectDetail?.nft?.minBidPrice)}
              ownsProduct={isOwnsProduct()}
              nftDetails={nftObjectDetail}
            />

    <Body1 className={classes.root} color="secondary" onClick={() => history.push(`/profile/${nftObjectDetail?.owner?.customUrl ? nftObjectDetail?.owner?.customUrl : nftObjectDetail?.owner?.walletAddress }`)}  >
      Owner : { <Avatar className={classes.avatar} src={nftObjectDetail?.owner?.userAvatarUrl} />}
    </Body1>
  </Grid>
*/}
 
{/* BIDS */}
{/*
<Grid item md={6} sm={6} xs={12}>
  
</Grid>
*/}

{/* TRADING HISTORY */}

{/* <Grid item md={6} sm={6} xs={12}>
    <TradingHistory historyEvents={nftObjectDetail?.historyEvents} />
  </Grid> */}