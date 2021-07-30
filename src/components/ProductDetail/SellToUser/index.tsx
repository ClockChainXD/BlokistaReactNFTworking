import { truncateWalletString } from '../../../utils/index';
import Modal from '../../modal';

import './index.scss';
import Container from '../../Layout/Container';
import { makeStyles } from '@material-ui/core/styles';
import FilledButton from '../../Buttons/FilledButton';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  sellToUser: {
    padding: 60,
    paddingTop: 30,
  },
  info: {
    fontSize: 20,
    marginBottom: 40,
  },
}));
export default function SellToUser({ bidderProfile, show, sellToUser, onClose }) {
  const classes = useStyles();

  function handleClose() {
    onClose(null);
  }
  const sellHandler = () => {
    sellToUser(bidderProfile);
    handleClose();
  };

  return (
    <Modal
      show={true}
      maxWidth={'lg'}
      className="create-collection"
      children={
        <Container className={classes.sellToUser}>
          <div className={classes.info}>
            Are you sure to sell '{bidderProfile?.username || truncateWalletString(bidderProfile?.walletAddress)}' ?
          </div>
          <Grid container justify="space-between">
            <FilledButton size="large" label="Ok" handleClick={sellHandler} />
            <Button size="large" variant="text" onClick={handleClose}>
              Close
            </Button>
          </Grid>
        </Container>
      }
    />
  );
}
