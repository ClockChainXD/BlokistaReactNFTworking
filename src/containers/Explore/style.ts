import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  secondRoot: {
    flexDirection: 'column',
  },
  masonry: {
    display: 'flex',
    margin: theme.spacing(0, -1.75),
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
    marginBottom: theme.spacing(5),
    borderRadius: theme.shape.cardBorderRadius,
    backgroundColor: theme.palette.type === 'light' ? theme.palette.surface[0] : theme.palette.surface[1],
    boxShadow: '0 25px 28px 10px #1111',
    maxWidth: 300,
    margin: 'auto',
  },
  loadBtn: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: -1,
  },
}));

export default useStyles;
