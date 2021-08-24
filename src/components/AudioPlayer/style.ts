import { makeStyles } from '@material-ui/core/styles';

const useButtonStyles = makeStyles(theme => ({
  root: {
    cursor: 'pointer',
    '& svg': {
      position: 'absolute',
      display: 'none',
    },
  },
  btnHolderFill: {
    fill: theme.palette.type === 'light' ? theme.palette.surface[0] : theme.palette.surface[1],
  },
  button: {
    zIndex: 9999,
    position: 'absolute',
    display: 'block',
    top: 20,
    left: 10,
    width: 48,
    height: 48,
    borderRadius: 48,
    backgroundColor: '#fff',
    lineHeight: 50,
    textAlign: 'center',
    '&:after': {
      position: 'absolute',
      top: 17,
      zIndex: 1,
      left: 19,
      content: '""',
      width: 0,
      height: 0,
      borderTop: '8px solid transparent',
      borderBottom: '8px solid transparent',
      borderLeft: '14px solid #f90064',
      transition: 'all .3s',
    },
    '&.playing::after': {
      content: '""',
      border: '8px solid #f90064 !important',
      left: 16,
      top: 16,
    },
  },
}));

const usePlayerStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    background: '#2d3138',
    zIndex: 999,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  audioInfo: {
    display: 'flex',
    gap: 16,
    background: '#f90064',
    padding: '20px 50px 20px 30px',
    width: '35%',
  },
  audioBanner: {
    borderRadius: '50%',
    overflow: 'hidden',
    objectFit: 'cover',
    width: 80,
    height: 80,
  },
  closeAudio: {
    position: 'absolute',
    right: 2,
    top: -28,
    padding: 5,
    background: '#2e3138',
    borderRadius: 10,
    cursor: 'pointer',
    '& svg': {
      fill: '#EEE',
    },
  },

  audioName: {
    fontSize: 22,
    color: '#fff',
    textDecoration: 'none',
    margin: '0 0 3px 0',
    fontWeight: 600,
    lineHeight: 'normal',
  },
  ownerName: {
    color: '#EEE',
  },
  audioOwner: {
    background: 'rgb(0 0 0 / 35%)',
    display: 'inline-block',
    fontSize: 10,
    color: '#fff',
    borderRadius: 120,
    padding: '1px 10px',
    margin: 0,
  },
  player: {
    position: 'relative',
    width: '65%',
    paddingright: 30,
    padding: '20px 50px 20px 30px',
    color: '#FFF',
    '& span': {
      left: -21,
      top: 'calc(50% - 20px)',
      border: '5px solid #222',
      '&::after': {
        top: 12,
        left: 15,
      },
      '&.playing::after': {
        top: 11,
        left: 11,
      },
    },
  },
  currentTime: {
    position: 'absolute',
    left: '3.8em',
    top: '30%',
  },
  duration: {
    position: 'absolute',
    right: '2.8em',
    top: '30%',
  },
  volumeControl: {
    position: 'absolute',
    right: '0.8em',
    top: '-21px',
    '& span': {
      border: 'none',
      left: 0,
    },
    '&:hover > span': {
      opacity: 1,
    },
  },
  volumeControlSlider: {
    left: '-8px !important',
    color: '#fff !important',
    opacity: 0,
    top: '80px !important',
  },
  seekbar: {
    height: 6,
    backgroundcolor: '#6B6B6B',
    cursor: 'pointer',
    zIndex: 1,
    top: '50%',
    right: '6.875em',
    left: '6.875em',
    marginTop: 25,
    position: 'absolute',
  },
  seekbarWidth: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: ' #6B6B6B',
    zIndex: 1,
  },
  playedSeekbarLength: {
    background: 'transparent',
    border: 'none !important',
    zIndex: 2,
    height: '100%',
    left: '0px !important',
    position: 'absolute',
    color: '#FFF !important',
    '& span': {
      border: 'none',
      left: 0,
    },
  },
}));

export { useButtonStyles, usePlayerStyles };
