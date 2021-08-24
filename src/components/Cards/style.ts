import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
    card : {
      position: 'relative',
      width: 258,
      height: 350, 
      margin: '.2em .4vw',
      borderRadius: 20,
      overflow: 'hidden',
      textDecoration: 'none',
      '&:hover':{
          '& $overlay': {
              transform : 'translateY(0)',
              backgroundColor: theme.palette.type === 'light' ? theme.palette.surface[1] : theme.palette.surface[0],
          },
          '& $header': {
              transform: 'translateY(0%)',
              backgroundColor : 'transparent',
          },
          '& $buttonOverlay':{
            opacity: 1
          }
      }
    },
    container:{
      margin: '0 15px',
      display: 'flex',
      maxWidth: 100,
      maxHeight: 100,
      flexDirection: 'column',
    },
    media: {
      width: '100%',
      height: '60%',
    },
    overlay:{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1,
      borderRadius: '',   
      backgroundColor: theme.palette.type === 'light' ? theme.palette.surface[1] : theme.palette.surface[0],
      transform: 'translateY(100%)',
      transition: '.2s ease-in-out',
    },
    header: {
      position: 'relative',
      display: 'flex',
      paddingTop: 15,
      backgroundColor : 'transparent',
      transition: '.2s ease-in-out',
    },
    title: {
        fontSize: '1em',
        margin: '0 0 .3em',
        color: '#6A515E',
        display: 'flex',
        width: "100%",
        justifyContent: 'space-between',
    },
    itemHeader : {
      textAlign: 'center',
      paddingBottom: theme.spacing(3),
      display:'flex',
      flexDirection:'column',
    },
    tagline: {
        fontSize: '.7em ',
        color: '#D7BCA',
        textAlign:'start',
    },
    minBidPrice: {
      color: theme.palette.info.main
    },
    visibilityNone: {
      visibility: 'hidden',
    },
    avatarGroup:{
      marginLeft: theme.spacing(1.1),
    },
    avatar: {
      width:35,
      height: 35,
    },
    purchaseBtn: {
      height: 26,
      borderRadius: 3,
      width: 103,
      textTransform: 'uppercase',
      fontWeight: 'bold',
      fontSize: 10,
    },
    favoriteBtn: {
      background: theme.palette.surface[0],
      padding: 7,
      boxShadow: '0 4px 8px 6px #3333',
      '&:hover': {
        background: `${theme.palette.surface[0]}90`,
      },
    },
    bidButton: {
      padding: '5px 14px',
    },
    buttonOverlay:{
      position:'absolute',
      width:'100%',
      opacity:0,
      top: 0,
    },
    fire: {
      marginLeft: theme.spacing(0.25),
    },
    price: {
      color: theme.palette.text.primary,
      height:200,
    },
    icon: {
      width : '12px',
      height: '12px',
      marginLeft: 6,
    },
    bidIcon:{
      marginRight: theme.spacing(1),
    },
    timer: {
      marginTop: 20,
    }
}));
  

export {useStyles};