import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    zIndex: 10,
    '& p':{
      textAlign:'center',
      color: theme.palette.type=='light' ? 'black' : '#fff',
      borderRadius:'30%',
      fontFamily:'ComicSans',
  textShadow:' 0 0 7px #fff,0 0 10px #fff,0 0 21px #fff,0 0 42px #0fa,0 0 82px #0fa,0 0 92px #0fa,0 0 102px #0fa,0 0 151px #0fa;'
    }
  },
  timer:{
    display: 'flex',
    boxSizing: 'border-box',
    margin: '8px 0px 0px',
    minWidth: '0px',
    fontSize: '14px',
    '& div':{
      boxSizing: 'border-box',
      margin: '0px 6px 0px 0px',
      minWidth: '0px',
      textAlign: 'center',
      width: '24px',
      height: '24px',
      lineHeight: '24px',
      borderRadius:'4px',
      background: 'rgb(30, 35, 41)',
      color: 'rgb(255, 255, 255)',
      fontSize: '16px',
      fontWeight:'600',
    },
}
}));

export default useStyles;