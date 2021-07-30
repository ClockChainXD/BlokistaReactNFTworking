import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  content: {},
  root: {},
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(4, 0),
  },
  masonry: {
    display: 'flex',
    margin: theme.spacing(0, -1.75),
  },
  gridColumn: {
    margin: theme.spacing(0, 2),
  },
  viewButton: {
    width: theme.spacing(12),
  },
  imageWrapper: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.surface[1],
    height: 88,
  },
  artistWrapper: {
    cursor: 'pointer',
  },
}));

export default useStyles;
