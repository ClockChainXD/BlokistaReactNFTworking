import Modal from '../../modal';
import Container from '../../Layout/Container';
import Title from '../../Typography/Title';
import InputField from '../../Forms/InputField';
import Grid from '@material-ui/core/Grid';
import FilledButton from '../../Buttons/FilledButton';
import Button from '@material-ui/core/Button';
import useStyles from './style';
import { useState } from 'react';
export default function UpdatePrice({ onClose, onUpdate }) {
  const classes = useStyles();
  const [nftPrice, setNFTPrice] = useState(null);

  function onPriceChange(val) {
    setNFTPrice(val);
  }
  const handleClose = () => {
    onClose();
  };
  const handleSave = () => {
    if (nftPrice) {
      onUpdate(nftPrice);
    }
  };

  return (
    <Modal
      show={true}
      maxWidth={'lg'}
      className="create-collection"
      children={
        <Container>
          <Title>Update Price </Title>
          <br />

          <InputField name="price" type="number" onChangeData={onPriceChange} label="Price" />
          <br />
          <Grid container className={classes.ctaWrapper}>
            <FilledButton label="Update" handleClick={handleSave} />
            <Button variant="text" onClick={handleClose}>
              Close
            </Button>
          </Grid>
        </Container>
      }
    />
  );
}
