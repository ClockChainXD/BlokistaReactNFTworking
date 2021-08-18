import React, { useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Container from '../../components/Layout/Container';
import PageTitle from '../../components/Typography/PageTitle';
import SubTitle1 from '../../components/Typography/Subtitle1';
import FilledButton from '../../components/Buttons/FilledButton';
import UploadFile from '../../components/Forms/UploadFile';
import InputField from '../../components/Forms/InputField';
import ProductCard from '../../components/Cards/ProductCard';
import Pane from '../../components/Pane';
import {  useForm, useWatch } from 'react-hook-form';

import TinyBold from '../../components/Typography/TinyBold';
import toast from 'react-hot-toast';
import Tiny from '../../components/Typography/Tiny';
import Caption from '../../components/Typography/Caption';
import Collection from './collection';
import Title from '../../components/Typography/Title';
import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useProfile } from '../../store/hooks';
import { getImageIpfsHash, readFileAsync } from '../../utils/ipfs';
import API from '../../utils/api';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import useStyles from './style';
import ErrorAlert from '../../components/Widgets/ErrorAlert';
import { mint, multipleMint } from '../../utils/contracts';
import { NFTObjectData } from '../../hooks/useApi';
import DateTimePickerField from '../../components/DateTimePicker/index';
import SelectField from '../../components/Forms/SelectField';
import { addedOptions, categoryOptions, mintCategoryOptions } from '../../constants/filter';

interface FormInputs {
  name: string;
  description: string;
  royalties: string;
  royaltyFee: number;
  to_mint: string;
  max_supply: string;
  metaData: string;
  buy_now_price: string;
  auction_details: string;
  file: any;
}

const Create = () => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const isMobileOrTablet = useMediaQuery(`(max-width: ${theme.breakpoints.values.xs}px)`);

  const [toggleAdvancedSetting, setAdvancedSetting] = useState(false);
  const [formSubmit, setFormSubmit] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [putOnMarketPlace, setPutOnMarketPlace] = useState(true);
  const [unlock, setUnlock] = useState(false);
  const [selectedMarketPlaceOption, setSelectedMarketPlaceOption] = useState(0);
  const [selectedCollection, setSelectedCollection] = useState(1);
  const [product, setProduct] = useState<NFTObjectData>();
  const [nftAsset, setNFTAsset] = useState(null);
  const [nftAssetType, setNFTAssetType] = useState('');
  const [nftAssetBannerImage, setNFTAssetBannerImage] = useState(null);
  const [name, setNFTName] = useState(null);
  const [description, setNFTDescription] = useState(null);
  const[royaltyFee,setNFTRoyalty]=useState(0);
  // const [price, setNFTPrice] = useState(0);
 // const [minBidPrice, setNFTMinBidPrice] = useState(0);
  const [startTime, setNFTAuctionStartTime] = useState(new Date());
  const [endTime, setNFTAuctionEndTime] = useState(new Date());
  const [category,setNFTCategory]=useState(null);
  const [subcategory,setNFTSubCategory]=useState(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    unregister,
  } = useForm();

  const { library, chainId, account } = useWeb3React();
  const { profile } = useProfile();

  const fieldLabels = {
    account,
  };

  function getExtension(filename) {
    var parts = filename.split('.');
    return parts[parts.length - 1];
  }

  function isImage(filename) {
    var ext = getExtension(filename);
    switch (ext.toLowerCase()) {
      case 'jpg':
      case 'gif':
      case 'bmp':
      case 'png':
        //etc
        return true;
    }
    return false;
  }

  function isVideo(filename) {
    var ext = getExtension(filename);
    switch (ext.toLowerCase()) {
      case 'm4v':
      case 'avi':
      case 'mpg':
      case 'mp4':
        // etc
        return true;
    }
    return false;
  }

  function isAudio(filename) {
    var ext = getExtension(filename);
    switch (ext.toLowerCase()) {
      case 'mp3':
        // etc
        return true;
    }
    return false;
  }

  function getAssetType(filename) {
    var ext = getExtension(filename);
    switch (ext.toLowerCase()) {
      case 'jpg':
        return 'Image';
      case 'gif':
        return 'GIF';
      case 'bmp':
        return 'Image';
      case 'png':
        return 'Image';
      case 'm4v':
        return 'Video';
      case 'avi':
        return 'Video';
      case 'mpg':
        return 'Video';
      case 'mp4':
        return 'Video';
      case 'mp3':
        return 'Audio';
    }
    return '';
  }

  console.log(nftAssetType);

  const onChangeNFTAsset = async asset => {
    setNFTAsset(asset);
    setNFTAssetType(getAssetType(asset.name));

    // if (isImage(asset.name)) setNFTAssetType("Image");
    // if (isVideo(asset.name)) setNFTAssetType("video");
    // if (isAudio(asset.name)) setNFTAssetType("Audio");
  };

  const onSubmit = async data => {
    setFormSubmit(true);
    if (!account || !library) {
      toast.error('Please connect your wallet correctly!');
      return;
    }

    if (!profile) {
      toast.error('Please login correctly!');
      return;
    }
    if (!name || !description || !nftAsset) {
      return;
    }
    
    const load_toast_id = toast.loading('Please wait...');
    setIsSaving(true);
    try {
      let buffer = await readFileAsync(nftAsset);
      let hash = await getImageIpfsHash(buffer);
      const assetUrl = `https://ipfs.io/ipfs/${hash}`;
      let bannerImage = '';

      if (nftAssetType == 'Audio' && nftAssetBannerImage) {
        buffer = await readFileAsync(nftAssetBannerImage);
        hash = await getImageIpfsHash(buffer);
        bannerImage = `https://ipfs.io/ipfs/${hash}`;
      }
      var formdata = new FormData();

      formdata.append('name', name);
      formdata.append('description', description);
      formdata.append('assetUrl', assetUrl);
      formdata.append('assetType', nftAssetType);
      formdata.append('bannerImage', bannerImage);
      var response: any = await API.post('/addNFTMetaData', formdata);

      if (response.status === 'success') {
        const baseID = response.baseID;
        const tokenURI = `${API.apiUrl}/nfts/${baseID}`;

        let txhash;

        if (selectedMarketPlaceOption === 0) {
          txhash = await mint(chainId, library.getSigner(), tokenURI, name, royaltyFee,category,subcategory);
        } else if (selectedMarketPlaceOption === 1) {
          txhash = await mint(chainId, library.getSigner(), tokenURI, name, royaltyFee,category,subcategory);
        } else if (selectedMarketPlaceOption === 2) {
          txhash = await mint(chainId, library.getSigner(), tokenURI, name, royaltyFee,category,subcategory);
        }
        setIsSaving(false);
        if (txhash !== false) {
          toast.success('NFT Product is created successfully!');
          setTimeout(async () => {
            await API.get('/syncBlock');
            history.push('/home');
          }, 3000);
        } else {
          toast.error('NFT Artist Create Failed!');
        }
      } else {
        toast.error('NFT Artist Create Failed!');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      toast.dismiss(load_toast_id);
    }
  };

  const productPreviewWatch = useWatch({ control });

  function updatePreview(item) {
    setProduct(prevState => ({ ...prevState, ...item }));
  }

  const marketPlaceOptions = [
    { img: '/assets/images/tag.svg', title: 'Single' },
  //  { img: '/assets/images/time.svg', title: 'Multiple' },
  //  { img: '/assets/images/infinite.svg', title: 'Multiple' },
  ];

  function selectMarketOption(item) {
    setSelectedMarketPlaceOption(item.index);
  }

  useEffect(() => {
    if (selectedMarketPlaceOption == 1) updatePreview({ endTime: endTime });
    else updatePreview({ startTime: null, endTime: null });

    console.log('product', product);
  }, [selectedMarketPlaceOption]);

  function marketPlaceOptionUI(index) {
    if (index === 1) {
      return (
        <Box marginBottom={1}>
          <InputField
            name="numberOfCopy"
            wrapperClass={classes.formWrapper}
            label="Number Of Copy"
            type="number"
            placeholder="Enter number of copy"
           // error={formSubmit && !(numberOfCopy > 0)}
            onChangeData={val => {
              updatePreview({ numberOfCopy: val });
           //   setNFTMinBidPrice(parseFloat(val));
            }}
          />
          <ErrorAlert title="NFT Minimum Bid Price is not valid !" show={formSubmit } />
          <Tiny className={classes.note}>Bids below this amount won’t be allowed.</Tiny>
          <Grid container justify="space-between" spacing={4}>
            <Grid item sm={6} xs={12}>
              <DateTimePickerField
                value={startTime}
                label="Starting Date"
                onChange={val => {
                  const time = moment(val).valueOf();
                  updatePreview({ startTime: time / 1000 });
                  setNFTAuctionStartTime(val);
                }}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <DateTimePickerField
                value={endTime}
                label="End Date"
                onChange={val => {
                  const time = moment(val).valueOf();
                  updatePreview({ endTime: time / 1000 });
                  setNFTAuctionEndTime(val);
                }}
              />
            </Grid>
          </Grid>
          <Tiny className={classes.note}>Any bid placed in the last 10 minutes extends the auction by 10 minutes</Tiny>
        </Box>
      );
    }
  }

  function registerUnregisterMarketOptionFields(index) {
    register('name');
    if (index === 0) {
      register('price');
      unregister('minBidPrice');
      unregister('startTime');
      unregister('endTime');
    }
    if (index === 1) {
      register('minBidPrice');
      register('startTime');
      register('endTime');
      unregister('price');
    } else {
      unregister('price');
      unregister('minBidPrice');
      unregister('startTime');
      unregister('endTime');
    }
  }

  return (
    <div className={classes.root}>
      <Container>
        <Grid container justify="space-between" spacing={4}>
          <Grid item md={7} xs={12}>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <PageTitle className={classes.title}>Create single collectible </PageTitle>

              <Box marginTop={5}>
                <Caption>Upload file</Caption>
                <UploadFile
                  label="Upload"
                  dispalyAsset
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files && e.target.files[0]) {
                      onChangeNFTAsset(e.target.files[0]);
                      // updatePreview({ image: URL.createObjectURL(e.target.files[0]) });
                      updatePreview({
                        assetType: getAssetType(e.target.files[0].name),
                        assetUrl: URL.createObjectURL(e.target.files[0]),
                      });
                    }
                  }}
                />
                <ErrorAlert title="Please select the Artist!" show={formSubmit && !nftAsset} />
              </Box>

              {nftAssetType == 'Audio' && (
                <Box marginTop={5}>
                  <Caption>Banner Image For Audio</Caption>
                  <UploadFile
                    label="Upload Banner Image"
                    dispalyAsset
                    info="JPG, GIF, BMP, PNG"
                    accept="Image"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      if (e.target.files && e.target.files[0]) {
                        setNFTAssetBannerImage(e.target.files[0]);
                        // updatePreview({ image: URL.createObjectURL(e.target.files[0]) });
                        updatePreview({ bannerImage: URL.createObjectURL(e.target.files[0]) });
                      }
                    }}
                  />
                </Box>
              )}

              <Box marginTop={5}>
                {putOnMarketPlace && (
                  <Collection
                    items={marketPlaceOptions}
                    onSelect={item => {
                      selectMarketOption(item);
                      registerUnregisterMarketOptionFields(item.index);
                    }}
                    selectedIndex={selectedMarketPlaceOption}
                  />
                )}
                {putOnMarketPlace && marketPlaceOptionUI(selectedMarketPlaceOption)}
              </Box>

              <Box marginTop={5}>
                <InputField
                  name="name"
                  error={formSubmit && !name}
                  wrapperClass={classes.formWrapper}
                  label="Title"
                  placeholder=""
                  onChangeData={val => {
                    setNFTName(val);
                    updatePreview({ name: val });
                  }}
                />
                <ErrorAlert title="NFT Name Field is required !" show={formSubmit && !name} />
                <InputField
                  name="description"
                  wrapperClass={classes.formWrapper}
                  label="Description"
                  isMulti
                  placeholder=""
                  onChangeData={val => {
                    setNFTDescription(val);
                  }}
                  error={formSubmit && !description}
                />
               <ErrorAlert title="NFT Description Field is required !" show={formSubmit && !description} />
                  <SelectField
                    name="category"
                    className={classes.formWrapper}
                    options={mintCategoryOptions}
                    value={"Select a Category"}
                    label="Category (Art,Music,GIF,Secret Footage)"
                    onChangeHandler={e => {
                      setNFTCategory(e.target.value);
                      console.log(e.target.value)
                    }}
                />
                <ErrorAlert title="NFT Category Field is required !" show={formSubmit && !category} />
                <InputField
                  name="subcategory"
                  wrapperClass={classes.formWrapper}
                  label="SubCategory"
                  isMulti
                  placeholder=""
                  onChangeData={val => {
                    setNFTSubCategory(val);
                  }}
                  error={formSubmit && !subcategory}
                />
                <ErrorAlert title="NFT Description Field is required !" show={formSubmit && !subcategory} />
                {/* <Tiny className={classes.b2}>With preserved line-breaks</Tiny> */}
                <InputField
                  name="royalty"
                  wrapperClass={classes.formWrapper}
                  label="Royalty (%)"
                  type="number"
                  error={formSubmit && royaltyFee < 0}
                  onChangeData={val => {
                    setNFTRoyalty(parseFloat(val));
                  }}
                />
                <ErrorAlert title="'Royalties' must be a valid number" show={formSubmit && royaltyFee < 0} /> 
              </Box>

              <Box marginTop={5} className={classes.buttonGroup}>
                <FilledButton
                  size="large"
                  label="Create item"
                  icon={<ArrowRightAltIcon />}
                  className={classes.createBtn}
                  disabled={isSaving}
                />
              </Box>
            </form>
          </Grid>
          <Grid item md={4} xs={12}>
            <Pane className={classes.preview}>
              <SubTitle1 className={classes.previewLabel}>Preview</SubTitle1>
              <ProductCard className={classes.product} product={product} showFooter={false} />
            </Pane>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Create;
