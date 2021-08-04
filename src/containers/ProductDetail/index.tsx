import React from 'react';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import Container from '../../components/Layout/Container';
import Title from '../../components/Typography/Title';
import Body1 from '../../components/Typography/Body1';
import Body2 from '../../components/Typography/Body2';
import ProductActionCard from '../../components/Cards/ProductActionCard';
import ProductImage from '../../components/ProductDetail/ProductImage';
import TradingHistory from '../../components/ProductDetail/TradingHistory';
import BidInfo from '../../components/ProductDetail/BidInfo';
import { useLocation } from 'react-router-dom';
import { useGetNFTObjectDetail } from '../../hooks/useApi';
import { useProfile } from '../../store/hooks';
import FilledButton from '../../components/Buttons/FilledButton';
import { useWeb3React } from '@web3-react/core';
import toast from 'react-hot-toast';
import { claimAuction } from '../../utils/contracts';
import { baseApiUrl } from '../../utils';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: 97,
    paddingBottom: 96,
  },
  icon: {
    color: theme.palette.text.primary,
    marginRight: theme.spacing(2),
  },
  title: {
    margin: theme.spacing(3, 0),
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  tag: {
    display: 'flex',
    alignItems: 'center',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(1, 0),
  },

  description: {
    paddingTop: theme.spacing(4),
  },
  btnGroup: {
    '& .MuiButton-outlined': {
      border: `1px solid ${theme.palette.surface[3]}`,
    },
  },
}));

const ProductDetail = () => {
  const classes = useStyles();

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

  const baseId = location.pathname.split('/').pop();
  const nftObjectDetail = useGetNFTObjectDetail(baseId);
  const { profile } = useProfile();

  function isOwnsProduct() {
    return nftObjectDetail?.owner?.walletAddress?.toLowerCase() === profile?.walletAddress?.toLowerCase();
  }

  const { connector, library, chainId, account, active } = useWeb3React();

  /////////////////////////// Sell Auction Unlimited NFT //////////////////////////// DEĞİŞECEK BUNLAR HEP KÖKTEN
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
        <Grid container spacing={6}>
          <Grid item md={6} sm={6} xs={12}>
            <ProductImage
              nftDetails={nftObjectDetail}
              src={nftObjectDetail?.nft?.assetUrl}
            />
          </Grid>

          <Grid item md={6} sm={6} xs={12}>
            <Title className={classes.title}>{nftObjectDetail?.nft?.name}</Title>
            <Body1 color="secondary" >
              CREATED BY: {nftObjectDetail?.creator?.displayName}
            </Body1>
            {/* <div className={classes.row}>
              <div className={classes.tag}>
                <VisibilityIcon className={classes.icon} />
                <Body2>14 Views</Body2>
              </div>

              <ButtonGroup className={classes.btnGroup}>
                <Button onClick={refreshClickHandler}>Refresh</Button>
                <Button onClick={shareClickHandler}>Share</Button>
                <Button onClick={reportClickHandler}>Report</Button>
              </ButtonGroup>
            </div> */}
            <ProductActionCard
              price={parseFloat(nftObjectDetail?.nft?.price)}
              instBuyPrice={parseFloat(nftObjectDetail?.nft?.instBuyPrice)}
              minBidPrice={parseFloat(nftObjectDetail?.nft?.minBidPrice)}
              ownsProduct={isOwnsProduct()}
              nftDetails={nftObjectDetail}
            />

            <Divider />

            <Body1 className={classes.description} color="secondary">
              {nftObjectDetail?.nft?.description}
            </Body1>
          </Grid>

          <Grid item md={6} sm={6} xs={12}>
            <TradingHistory historyEvents={nftObjectDetail?.historyEvents} />
          </Grid>

          <Grid item md={6} sm={6} xs={12}>
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
