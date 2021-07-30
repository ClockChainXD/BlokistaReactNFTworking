import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: 80,
    paddingBottom: 136,
  },
  masonry: {
    display: 'flex',
    margin: theme.spacing(0, -1.75),
  },
  gridColumn: {
    margin: theme.spacing(0, 2),
  },
  topFilter: {
    borderBottom: `1px solid ${theme.palette.divider}`,
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
    padding: theme.spacing(1.5, 1.5, 2.75),
    marginBottom: theme.spacing(4),
    borderRadius: theme.shape.cardBorderRadius,
    backgroundColor: theme.palette.type === 'light' ? theme.palette.surface[0] : theme.palette.surface[1],
    boxShadow: '0 25px 28px 10px #1111',
    maxWidth: 258,
    margin: 'auto',
  },
  loadBtn: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: -1,
  },
}));

export default useStyles;
