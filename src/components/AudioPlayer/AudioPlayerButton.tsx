import { useButtonStyles } from './style';
import { useAudio } from '../../utils/hooks/useAudio';
import clsx from 'clsx';

export default function AudioPlayerButton({ product, showBottomBg = true }) {
  const { currentPlayingAudio, setCurrentPlayingAudio, setIsPlaying, isPlaying } = useAudio();
  const classes = useButtonStyles();
  let style = currentPlayingAudio?.baseID === product?.baseID ? 'playing' : '';
  if (currentPlayingAudio?.baseID === product?.baseID && !isPlaying) {
    style = '';
  }
  function playAudio(event) {
    setCurrentPlayingAudio(product);
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
    event.stopPropagation();
    return false;
  }

  return (
    <div className={classes.root} onClick={playAudio}>
      <span className={clsx(classes.button, style)}></span>
      {showBottomBg && (
        <svg xmlns="http://www.w3.org/2000/svg" width="278" height="34" viewBox="0 0 278 34">
          <path
            className={classes.btnHolderFill}
            d="M207,122H-71c0-31.515.266-33.979.269-34H-38.69a28.936,28.936,0,0,0,28.149,22A28.937,28.937,0,0,0,17.608,88H206.731C206.743,88.116,207,91.144,207,122Z"
            transform="translate(71 -88)"
            fill="#fff"
          />
        </svg>
      )}
    </div>
  );
}
