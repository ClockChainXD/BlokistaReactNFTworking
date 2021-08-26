import { useState } from 'react';
import toast from 'react-hot-toast';
import Modal from '../../modal';
import Container from '../../Layout/Container';
import { makeStyles } from '@material-ui/core/styles';
import FilledButton from '../../Buttons/FilledButton';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Title from '../../Typography/Title';
import InputField from '../../Forms/InputField';
import SelectField from '../../Forms/SelectField';

const useStyles = makeStyles(theme => ({
  title: {
    marginBottom: 20,
  },
  placeBid: {
    width: '400px',
  },
  infoWrapper: {
    marginTop: 60,
  },
  info: {
    fontSize: 16,
    marginBottom: 40,
  },
  actionButtons: {
    marginBottom: 20,
    gap: 10,
  },
}));

export default function PlaceBid({ balanceBNB, nftFee, onClose, onSubmit,minBidInc, bidders }) {
  const classes = useStyles();

  const [open, setOpen] = useState(true);
  const [currencyValue, setCurrencyValue] = useState('bnb');
  const [bidPrice, setBidPrice] = useState();

  const handleClose = () => {
    setOpen(false);
    onClose();
  };
  function currencyChange(value) {
    setCurrencyValue(value);
  }
  const placeBid = () => {
    if (parseFloat(bidPrice) >  balanceBNB) {
      toast.error('Your bid price is out of your balance');
      return;
    }
    if(parseFloat(bidPrice) < (bidders[bidders?.length-1]?.price * minBidInc/100)){
      toast.error('Your bid price is lower than minimum offerable price');
      return;

    }


    handleClose();
    onSubmit(bidPrice);
  };
  const onChangePrice = value => {
    setBidPrice(value);
  };

  const Info = {
    bnb: [
      { label: 'Your Wallet Balance', value: `${parseFloat(balanceBNB).toFixed(4)} BNB` },
   //   { label: 'Your Wallet Balance', value: `${parseFloat(balanceWBNB).toFixed(4)} WBNB` },
      { label: 'Service Fee', value: `${nftFee}%` },
      // { label: 'Total Cost', value: '0 WBNB ($0 USD)' }
    ],
  };

  return (
    <Modal
      show={true}
      maxWidth={'lg'}
      className="create-collection"
      children={
        <Container className={classes.placeBid}>
          <Title className={classes.title}>Place a Bid</Title>
          <Grid container justify="space-between">
            <InputField name="price" onChangeData={onChangePrice} label="Your Bid Price:" />
            <SelectField
              name="currency"
              label="&nbsp;"
              iconBorder={false}
              value='BNB'
              options={[{ key: 'bnb', label: 'BNB' }]}
            />
          </Grid>
          <br />
          <div className={classes.infoWrapper}>
            {Info[currencyValue].map((item, index) => (
              <Grid container justify="space-between">
                <div className={classes.info}>{item.label}</div>
                <div className={classes.info}>{item.value}</div>
              </Grid>
            ))}
          </div>
          <Grid className={classes.actionButtons} container>
            <FilledButton label="Place Bid" handleClick={placeBid} />
            <Button variant="text" onClick={handleClose}>
              Close
            </Button>
          </Grid>
        </Container>
      }
    />
  );
}
