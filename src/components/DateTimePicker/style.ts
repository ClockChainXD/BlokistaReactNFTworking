import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  root: {
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
