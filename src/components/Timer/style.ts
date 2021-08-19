import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display:'flex',
    zIndex: 1,
    color:'#fff',
    backgroundColor: '#663dff',
    backgroundImage: 'linear-gradient(319deg, #663dff 0%, #aa00ff 37%, #cc4499 100%)',
    borderRadius: '10px',
    padding: '10px 10px 0 ',
    '& p':{
      marginRight:'5px',
    },
    '& span':{
      width:'100%',
      display:'flex',
    }
  },
}));

export default useStyles;