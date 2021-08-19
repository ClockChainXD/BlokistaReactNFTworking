import Modal from '../../modal';
import Container from '../../Layout/Container';
import Title from '../../Typography/Title';
import InputField from '../../Forms/InputField';
import Grid from '@material-ui/core/Grid';
import DateTimePickerField from '../../DateTimePicker/index';
import { useState } from 'react';
import FilledButton from '../../Buttons/FilledButton';
import Button from '@material-ui/core/Button';
import useStyles from './style';
import toast from 'react-hot-toast';
export default function Auction({ onClose, onAuctionStart }) {
  const classes = useStyles();
  const [startTime, setNFTAuctionStartTime] = useState(new Date());
  const [endTime, setNFTAuctionEndTime] = useState(new Date());
  const [minBidPrice, setNFTMinBidPrice] = useState("");
  const[instBuyPrice, setinstBuyPrice] = useState("");
  const[minIncPercent, setminIncPercent] = useState("");
  const handleClose = () => {
    onClose();
  };

  const [showTimePick, setShowTimePick]=useState(true);
  const handleSave = () => {
    if (endTime <= new Date() || endTime <= startTime) {
      toast.error("Auction End Time should be later than current time and start time");
      return;
    }

    if (parseFloat(minBidPrice) <= 0) {
      toast.error("Minimum bid price should be over than 0");
      return;
    }

    onAuctionStart(minIncPercent,minBidPrice, Date.now(), endTime, instBuyPrice);
  };

  return (
    <Modal
      show={true}
      maxWidth={'lg'}
      className="create-collection"
      children={
        <Container>
          <Title>Auctions</Title>
          <br />
          <InputField
            name="minBidPrice"
            type="number"
            onChangeData={val => {
              setNFTMinBidPrice(val);
            }}
            label="Minimum bid"
          />
          <br />
          <br />
          <InputField
            name="minIncPercent"
            type="number"
            onChangeData={val => {
              setminIncPercent(val);
            }}
            label="Minimum Increase Percent For Bids"
          />
          <br />
          <br />
          <InputField
            name="instBuyPrice"
            type="number"
            onChangeData={val => {
              setinstBuyPrice(val);
            }}
            label="Instant Buy Price (Optional) (We recommend that you choose this price as it will satisfy your expectations)"
          />
          <br />
          <Grid container justify="space-between" spacing={4}>
            {/*<Grid item sm={6} xs={12}>
              <DateTimePickerField
                value={startTime}
                label="Starting Date"
                onChange={selectedStartDate => {
                  setNFTAuctionStartTime(selectedStartDate);
                }}
              />
              </Grid>*/}
            <Grid item sm={6} xs={12}>
              <DateTimePickerField
                value={endTime}
                label="End Date"
                onChange={selectedEndTime => {
                  setNFTAuctionEndTime(selectedEndTime);
                }}
              />
            </Grid>
          </Grid>
          <br />
          <Grid container className={classes.ctaWrapper}>
            <FilledButton label="Save" handleClick={handleSave} />
            <Button variant="text" onClick={handleClose}>
              Close
            </Button>
          </Grid>
        </Container>
      }
    />
  );
}
