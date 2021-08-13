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
    borderBottom: `2px solid ${theme.palette.divider}`,
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
    border: '1px solid #fff',
    borderRadius: theme.shape.cardBorderRadius,
    backgroundColor: theme.palette.type === 'light' ? theme.palette.surface[0] : theme.palette.surface[1],
    boxShadow: '0 25px 28px 10px #1111',
    maxWidth: 300,
    margin : '5px 10px',
  },
  loadBtn: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: -1,
  },
}));

export default useStyles;
