import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    width : '100vw',
    height: '100vh',
    margin: '0 20px'
  },
  secondRoot: {
    flexDirection: 'column',
  },
  masonry: {
    display: 'flex-wrap',
    margin: theme.spacing(0, -1.75),
  },
  product: {
    minWidth: '400px',
    padding: '0 50px',
  },
  gridColumn: {
    margin: theme.spacing(0, 2),
  },
  topFilter: {
    
    padding: theme.spacing(3, 0),
    marginBottom: theme.spacing(5),
  },
  products: {
    paddingLeft: 7,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0,
    },
  },
  productWrapper: {
    padding: theme.spacing(1, 1, 1),
    borderRadius: theme.shape.cardBorderRadius,
    backgroundColor: theme.palette.type === 'light' ? theme.palette.surface[0] : theme.palette.surface[1],
    margin : '5px 10px',
    boxShadow: '15px 20px 20px 0px rgba(0,0,0, 0.4)',
  },
  loadBtn: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: -1,
  },
}));

export default useStyles;
