import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import SubHeader from '../../components/Layout/Header/SubHeader';
import PageTitle from '../../components/Typography/PageTitle';
import Body1 from '../../components/Typography/Body1';
import Body2 from '../../components/Typography/Body2';
import OutlinedButton from '../../components/Buttons/OutlinedButton';
import InputField from '../../components/Forms/InputField';
import FilledButton from '../../components/Buttons/FilledButton';
import Container from '../../components/Layout/Container';

import UploadFile from '../../components/Forms/UploadFile';
// import TinyBold from 'components/Typography/TinyBold';
import { useForm, useWatch } from 'react-hook-form';
// import Modal from 'components/modal';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import toast from 'react-hot-toast';
import { useSnackbar } from 'notistack';

import { useWeb3React } from '@web3-react/core';
import { useProfile } from '../../store/hooks';
import { getImageIpfsHash, readFileAsync } from '../../utils/ipfs';
import API from '../../utils/api';
import ErrorAlert from '../../components/Widgets/ErrorAlert';
import useStyles from './style';

const EditProfile = () => {
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [socialInputList, setSocialInputList] = useState([
    { name: 'socialPortfolioUrl', label: 'Portfolio or Website', placeholder: 'Enter URL' },
    { name: 'socialTwitterUrl', label: 'Twitter', placeholder: '@twitter username' },
  ]);
  const [socialAccountName, setSocialAccountName] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const [bannerImage, setBannerImage] = useState(null);
  const [avatarImage, setAvatar] = useState(null);
  const [formSubmit, setFormSubmit] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
    reset,
  } = useForm();

  const formWatch = useWatch({ control });

  useEffect(() => {
    setDisplayName(formWatch?.displayName);
  }, [formWatch]);

  const onSubmit = async updatedData => {
    const data = {
      customUrl: updatedData.customUrl || profile?.customUrl,
      displayName: updatedData.displayName || profile?.displayName,
      socialPortfolioUrl: updatedData.socialPortfolioUrl || profile?.socialPortfolioUrl,
      socialTwitterUrl: updatedData.socialTwitterUrl || profile?.socialTwitterUrl,
      userBio: updatedData.userBio || profile?.userBio,
      userBackgroupUrl: profile?.userBackgroupUrl,
      walletAddress: profile?.walletAddress,
      userAvatarUrl: '',
    };

    setFormSubmit(true);
    setDisplayName(data.displayName);
    if (!profile) {
      toast.error('Profile Update Failed!');
      return;
    }

    if (!loginStatus) {
      toast.error('Please connect Metamask Correctly!');
      return;
    }
    if (!displayName) {
      return;
    }

    // let errorList = [];
    // Object.keys(data).map((key, i) => {
    //   let val = data[key];
    //   if (val) val = val.trim();
    //   if (val === undefined || val === '') {
    //     errorList.push(`${key.toUpperCase()} field is required !`);
    //   }
    // });
    // if (errorList.length > 0) {
    //   toast.error(errorList[0]);
    //   return;
    // }

    try {
      setLoading(true);
      const load_toast_id = toast.loading('Please wait...');

      var user_avatar_url = profile.userAvatarUrl;
      var user_background_url = profile.userBackgroupUrl;

      if (avatarImage) {
        const buffer = await readFileAsync(avatarImage);
        const hash = await getImageIpfsHash(buffer);
        user_avatar_url = `https://ipfs.io/ipfs/${hash}`;
      }

      if (bannerImage) {
        const buffer = await readFileAsync(bannerImage);
        const hash = await getImageIpfsHash(buffer);
        user_background_url = `https://ipfs.io/ipfs/${hash}`;
      }

      data.walletAddress = profile.walletAddress;
      data.userAvatarUrl = user_avatar_url;
      data.userBackgroupUrl = user_background_url;

      console.log(data);
      API.post('/updateNFTUserProfile', data)
        .then(res => {
          toast.success('Your Profile Updated!');
          window.location.href = '/home';
        })
        .catch(error => {
          toast.error('Profile Update Failed!');
        })
        .finally(() => {
          setLoading(false);
          toast.dismiss(load_toast_id);
        });
    } catch (error) {
      toast.error('Profile Update Failed!');
    }
  };

  const addMoreSocialAccountHandler = () => {
    if (socialAccountName.length <= 0) {
      enqueueSnackbar("Account name couldn't be empty !");
      return;
    }
    setModalOpen(false);
    setSocialInputList(prevState => [
      ...prevState,
      {
        name: socialAccountName.toLowerCase().trim().replaceAll(' ', '_') + prevState.length,
        label: socialAccountName,
        placeholder: `@${socialAccountName} username`,
      },
    ]);
  };

  const { connector, library, chainId, account, active } = useWeb3React();

  const [loginStatus, setLoginStatus] = useState(false);

  const { profile } = useProfile();

  useEffect(() => {
    const isLoggedin = account && active && chainId === parseInt(process.env.REACT_APP_NETWORK_ID, 10);
    setLoginStatus(isLoggedin);
  }, [connector, library, account, active, chainId]);
  if (!profile) {
    return null;
  }
  return (
    <div className={classes.root}>
      <SubHeader />

      <Grid container>
        <Grid item xs={12}>
          <UploadFile
            label="Upload"
            dispalyAsset
            defaultAsset={profile && profile.userBackgroupUrl}
            defaultAssetType="Image"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.files && e.target.files[0]) {
                setBannerImage(e.target.files[0]);
              }
            }}
          />
        </Grid>
      </Grid>
      <Container className={classes.container} size="small">
        <PageTitle className={classes.title}>Edit profile</PageTitle>
        <Body1 className={classes.description}>
          You can set preferred display name, create
          <span className={classes.primary}>&nbsp;your profile URL&nbsp;</span>
          and manage other personal settings.
        </Body1>

        <Grid container className={classes.content}>
          <Grid container item md={6} sm={12} className={classes.userInfo}>
            <Grid item md={5} xs={3}>
              <Avatar
                className={classes.avatar}
                src={(avatarImage && URL.createObjectURL(avatarImage)) || (profile && profile.userAvatarUrl)}
              />
            </Grid>
            <Grid item md={7} sm={5} xs={9}>
              <div className={classes.info}>
                <Body1 className={classes.label}>Profile photo</Body1>
                <Body2 className={classes.secondary}>We recommend an image of at least 400*400. Gifs work too</Body2>

                <label
                  className={classes.fileButton + ' MuiButtonBase-root MuiButton-root MuiButton-outlined'}
                  htmlFor="avatar-file-input"
                >
                  <span className="MuiButton-label">Upload</span>
                  <input
                    className={classes.input}
                    type="file"
                    id="avatar-file-input"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      if (e.target.files && e.target.files[0]) {
                        setAvatar(e.target.files[0]);
                      }
                    }}
                  />
                </label>
              </div>
            </Grid>
          </Grid>

          <Grid item md={6} sm={12}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={4} className={classes.edit}>
                <Grid item md={12} sm={6} xs={12} className={classes.section}>
                  <Body1 className={classes.label}>Account info</Body1>
                  <InputField
                    name="displayName"
                    value={profile?.displayName}
                    register={register}
                    wrapperClass={classes.formWrapper}
                    label="Display Name"
                    placeholder="Enter your display name"
                    error={formSubmit && !displayName}
                  />
                  <ErrorAlert title="Display name is required !" show={formSubmit && !displayName} />
                  <InputField
                    name="customUrl"
                    value={profile?.customUrl}
                    register={register}
                    wrapperClass={classes.formWrapper}
                    label="Custom URL"
                    placeholder="blokista.com/Your custom URL"
                  />

                  <InputField
                    name="userBio"
                    value={profile?.userBio}
                    register={register}
                    wrapperClass={classes.formWrapper}
                    label="BIO"
                    isMulti
                    placeholder="About yourself in a few words"
                  />
                </Grid>
                <Grid item md={12} sm={6} xs={12} className={classes.section}>
                  <Body1 className={classes.label}>Social</Body1>

                  {socialInputList.map((item, index) => (
                    <InputField
                      key={index}
                      name={item.name}
                      value={profile && profile[item.name]}
                      register={register}
                      wrapperClass={classes.formWrapper}
                      label={item.label}
                      placeholder={item.placeholder}
                    />
                  ))}

                  {/* <OutlinedButton
                    className={clsx(classes.addSocialBtn, classes.secondary)}
                    label="Add more social account"
                    icon={<AddCircleOutlineIcon />}
                    iconPosition="start"
                    handleClick={() => setModalOpen(true)}
                  />
                  <Modal
                    show={modalOpen}
                    children={
                      <Container className={classes.modal}>
                        <Body1 className={classes.label}>Add</Body1>
                        <DialogContentText>More social account can add here.</DialogContentText>
                        <InputField
                          label="Social Account Name"
                          wrapperClass={classes.formWrapper}
                          onChangeData={val => setSocialAccountName(val)}
                          className={classes.txtField}
                        />
                        <div className={classes.buttonGroup}>
                          <FilledButton
                            label="Add account"
                            size="large"
                            className="add-btn"
                            handleClick={addMoreSocialAccountHandler}
                          />
                          <Button size="large" variant="text" onClick={() => setModalOpen(false)}>
                            <HighlightOffIcon />
                            Close
                          </Button>
                        </div>
                      </Container>
                    }
                  /> */}
                </Grid>

                <div className={classes.action}>
                  <Body1 className={classes.secondary}>
                    To update your settings you should sign message through your wallet. Click ‘Update profile’ then
                    sign the message
                  </Body1>

                  <div className={classes.buttonGroup}>
                    <FilledButton label="Update Profile" size="large" disabled={loading} />
                    <Button size="large" variant="text" onClick={() => reset()}>
                      <HighlightOffIcon />
                      Clear All
                    </Button>
                  </div>
                </div>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default EditProfile;
