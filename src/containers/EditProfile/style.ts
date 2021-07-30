import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(5.75),
    },
  },
  container: {
    padding: '78px 15px 136px',
    [theme.breakpoints.down('sm')]: {
      padding: '61px 15px 136px',
    },
  },
  title: {
    marginTop: 29,
  },
  description: {
    letterSpacing: 0,
    color: theme.palette.text.secondary,
    marginTop: 20,
  },
  primary: {
    color: theme.palette.text.primary,
  },
  userInfo: {
    marginBottom: 20,
  },
  content: {
    marginTop: 64,
    [theme.breakpoints.down('xs')]: {
      marginTop: 50,
    },
  },
  avatar: {
    width: 128,
    height: 128,
    [theme.breakpoints.down('sm')]: {
      marginRight: theme.spacing(3),
    },
    [theme.breakpoints.down('xs')]: {
      width: 64,
      height: 64,
    },
  },
  info: {
    padding: '0 30px 0 7px',
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0, 0.25),
    },
  },
  label: {
    fontWeight: 500,
    marginBottom: 8,
  },
  uploadBtn: {
    marginTop: 17,
    width: 80,
  },
  secondary: {
    color: theme.palette.text.secondary,
  },
  edit: {
    paddingLeft: 16,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0,
      marginTop: 28,
    },
  },
  formWrapper: {
    marginTop: 30,
  },
  section: {
    marginBottom: 41,
    [theme.breakpoints.down('xs')]: {
      marginBottom: 4,
    },
    '& .MuiButtonBase-root': {
      width: 'auto;',

      '& .MuiButton-label': {
        '& svg': { marginTop: 10 },
      },
    },
  },
  addSocialBtn: {
    marginTop: 31,
    width: 230,
    fontSize: 13,
    fontWeight: 700,
    marginBottom: 51,
    [theme.breakpoints.down('xs')]: {
      marginBottom: 0,
    },
  },
  buttonGroup: {
    display: 'flex',
    width: '100%',
    paddingTop: 40,
    marginTop: 20,
    borderTop: `1px solid ${theme.palette.divider}`,
    '& button:nth-child(1)': {
      marginRight: 24,
    },
    '& button:nth-child(2)': {
      color: theme.palette.text.secondary,
      '& svg': {
        marginRight: 6,
      },
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: 42,
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: 38,
      flexDirection: 'column',
      '& button': {
        marginRight: '0 !important',
        marginBottom: 20,
      },
    },
  },
  action: {
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingTop: 15,
    },
  },
  fileButton: {
    marginTop: 10,
  },
  input: {
    display: 'none',
  },

  modal: {
    '& .add-btn': {},
  },
  txtField: {
    color: theme.palette.text.primary,
    fontWeight: 500,
    border: `2px solid ${theme.palette.surface[2]}`,
    fontSize: 13,
    minHeight: 41,
    borderRadius: theme.shape.borderRadius,
    '& input::placeholder, & textarea::placeholder,': {
      color: '#777e90',
      opacity: 1,
    },
  },
}));

export default useStyles;
