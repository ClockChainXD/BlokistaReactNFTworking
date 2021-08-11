import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import TinyBold from '../../../components/Typography/TinyBold';
import toast from 'react-hot-toast';
import Tiny from '../../../components/Typography/Tiny';
import Caption from '../../../components/Typography/Caption';
import OutlinedButton from '../../../components/Buttons/OutlinedButton';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Container from '../../../components/Layout/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Radio } from '@material-ui/core';
import ButtonBase from '@material-ui/core/ButtonBase';
import ImageWrapper from '../../../components/ImageWrapper';
import LabelWithComment from '../../../components/Widgets/LabelWIthComment';
import clsx from 'clsx';
import InputField from '../../../components/Forms/InputField';

interface FormInputs {
  name: string;
  description: string;
  royalties: string;
  to_mint: string;
  max_supply: string;
  metaData: string;
  buy_now_price: string;
  auction_details: string;
  file: any;
}

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  baseBtn: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 143,
    width: 180,
    padding: 45,
    paddingBottom: 25,
    border: `3px solid ${theme.palette.surface[1]}`,
    borderRadius: theme.shape.borderRadius,
    flexDirection: 'column',

    '&:hover': {
      border: `3px solid ${theme.palette.surface[3]}`,
    },

    '&.active': {
      border: `3px solid ${theme.palette.surface[4]}`,
    },
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: '100%',
    background: '#FFF',
  },
  label: {
    marginTop: 10,
    marginBottom: 0,
    '& p': {
      lineHeight: '20px',
      marginBottom: 0,
    },
  },
  formWrapper: {
    marginTop: 28,
    width: '100%',
  },

  grid: {
    justifyContent: 'center',
  },
}));

interface PropTypeCard {
  value: number;
  title: string;
  subTitle: string;
  src: string;
  active?: boolean;
  onClick?: (val: number) => void;
}
const ButtonCard = ({ value, title, subTitle, src, active, onClick }: PropTypeCard) => {
  const classes = useStyles();

  return (
    <ButtonBase
      focusRipple
      className={clsx(classes.baseBtn, active && 'active')}
      value={value}
      onClick={() => onClick && onClick(value)}
    >
      <ImageWrapper content={src} className={classes.image} />
      <LabelWithComment comment={subTitle} className={classes.label}>
        {title}
      </LabelWithComment>
    </ButtonBase>
  );
};

interface propsType {
  items: Array<{ img: string; title: string; subTitle?: string }>;
  selectHandler: Function;
  cardGroupName: string;
}

const Collection = ({ items, onSelect, selectedIndex }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(`(max-width: ${theme.breakpoints.values.xs}px)`);

  const startingDateOptions = ['Right after listing', 'Pick after listing'];

  const [selectedBtnValue, setSelectedBtnValue] = useState(-1);

  useEffect(() => {
    setSelectedBtnValue(selectedIndex);
    //console.log(selectedBtnValue);
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={4} className={classes.grid}>
        {items.map((item, i) => (
          <Grid item key={i}>
            <ButtonCard
              value={i}
              title={item.title}
              subTitle={item.subTitle}
              src={item.img}
              active={selectedBtnValue === i}
              onClick={val => {
                setSelectedBtnValue(val);
                item.index = val;
                onSelect && onSelect(item);
              }}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Collection;
