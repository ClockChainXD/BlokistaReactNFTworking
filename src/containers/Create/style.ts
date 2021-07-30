import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: 128,
    paddingBottom: 127,
    [theme.breakpoints.down('sm')]: {
      paddingTop: 80,
      paddingBottom: 112,
    },
    '&.MuiSelect-icon': {},
  },
  title: {
    marginBottom: 45,
  },
  label: {
    fontWeight: 500,
  },
  formWrapper: {
    marginTop: 28,
    width: '100%',
  },
  formGroup: {
    paddingTop: 3,
  },
  preview: {
    background: 'transparent',
    borderRadius: theme.shape.cardBorderRadius,
    padding: '46px 47px',
    boxShadow: '0 37px 28px 10px #1111',
    [theme.breakpoints.down('sm')]: {
      padding: 21,
    },
  },
  product: {
    background: 'transparent',
    marginBottom: 34,
  },
  previewLabel: {
    color: theme.palette.text.primary,
    marginBottom: 25,
  },
  clear: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.text.secondary,
    fontWeight: 'bold',
    '& svg': {
      marginRight: 6,
    },
    '&:hover': {
      cursor: 'pointer',
      color: theme.palette.text.primary,
    },
  },
  upload: {
    marginBottom: 40,
  },
  buttonGroup: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  createBtn: {
    marginBottom: 20,
    [theme.breakpoints.down('xs')]: {
      order: 2,
      marginTop: 10,
    },
  },
  b2: { marginTop: 10 },
  settingBtn: { marginTop: 20, width: '100%' },

  note: {
    marginTop: 8,
  },
  createCollection: {
    width: '380px',
  },
  datepicker: {
    marginTop: 32,
    '& label': {
      color: theme.palette.text.hint,
      fontWeight: 700,
      transform: 'translate(0, -6px) scale(0.75)  !important',
      '&.Mui-focused': {
        color: theme.palette.text.hint,
      },
    },
    '& input': {
      marginTop: 18,
      border: `2px solid ${theme.palette.surface[2]}`,
      borderRadius: theme.shape.borderRadius,
      color: '#787e90',
      cursor: 'pointer',
    },
  },
}));

export default useStyles;
