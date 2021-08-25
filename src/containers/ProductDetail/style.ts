import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      padding: theme.spacing(10, 0),
      marginBottom: 400,
    },
    avatar: {
      width:25,
      height: 25,
      display:'flex',
      marginRight: 20,
    },
    icon: {
      color: theme.palette.text.primary,
      marginRight: theme.spacing(2),
    },
    title: {
      margin: theme.spacing(3, 0),
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    box:{
      boxSizing: 'border-box',
      margin: '0px 0px 48px',
      minWidth: '0px',
      display: 'flex',
      '-webkit-box-pack': 'justify',
      'justify-content': 'space-between',
      '-webkit-box-align': 'center',
      alignItems: 'center',
    },
    auctionBox:{
      boxSizing: 'border-box',
      margin: '0px 0px 48px',
      minWidth: '0px',
      padding:0,
      fontSize: '30px'
    },
    headerNft: {
      marginRight: '10px',
      color: 'rgb(30, 35, 41)',
      fontSize: '40px',
      lineHeight: '48px',
      overflow: 'hidden',
      wordBreak: 'break-word',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      '-webkit-line-clamp': 2,
      '-webkit-box-orient': 'vertical',
      flex: '1 1 0%',
      textTransform: 'capitalize',
    },
    tag: {
      display: 'flex',
      alignItems: 'center',
    },
    row: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: theme.spacing(1, 0),
    },
    media:{
    },
    info:{

    },
    address:{
      boxSizing: 'border-box',
      margin: 0,
      minWidth: 0,
      fontSize: '12px',
      linHeight: '16px',
      color: theme.palette.text.primary,
      fontWeight: 500,
    },
    category:{
      fontWeight: 'bold',
    },
    contract:{
        marginTop : theme.spacing(10),
        display: 'flex',
        flexDirection: 'column',
    },
    description: {
      paddingTop: theme.spacing(6),
      color : theme.palette.text.primary,
    },
    addressTitle:{
      boxSizing: 'border-box',
      minWidth: 0,
      fontWeight: 400,
      fontSize: '12px',
      lineHeight: '16px',
      color: '#707A8A',
    },

    descriptionText:{
      fontSize: '14px',
      wordBreak: 'break-word',
      whiteSpace: 'pre-line',
      overflow: 'auto',
      maxHeight: 205,
      padding: 0,
    },
    owner:{
      display: 'flex',
      alignItems: 'center',
      fontSize: '12px',
      lineHeight: 1.5,
      color: theme.palette.text.primary,
      marginTop: theme.spacing(2.5)
    },
    btnGroup: {
      '& .MuiButton-outlined': {
        border: `1px solid ${theme.palette.surface[3]}`,
      },
    },
    flex: {
      display:'flex',
      flexDirection:'column',
      alignItems: 'start',
      justifyContent : 'center'
    },
    bold: {
      fontWeight: 'bold',
      margin: 0,
      padding: 0,
    },
    user:{
      display: 'flex',
      flexDirection: 'column',
      margin: 0,
      minWidth: 0,
      boxSizing: 'border-box',
    }
  }));

  export {useStyles};