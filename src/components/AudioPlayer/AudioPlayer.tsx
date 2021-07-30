import { usePlayerStyles } from './style';
import { useAudio } from '../../utils/hooks/useAudio';
import AudioPlayerButton from './AudioPlayerButton';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { calculateTime } from './AudioHelper';
import VolumeUp from '@material-ui/icons/VolumeUp';
import { useGetNFTUserFullDetail } from '../../hooks/useApi';
import { truncateWalletString } from '../../utils/index';
import HighlightOff from '@material-ui/icons/HighlightOff';
import Slider from '@material-ui/core/Slider';

let audioObj;
export default function AudioPlayer() {
  const { currentPlayingAudio, setCurrentPlayingAudio, isPlaying, setIsPlaying } = useAudio();
  const [duration, setDuration] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const nftUserFullDetail = useGetNFTUserFullDetail(currentPlayingAudio?.ownerAddress) || {};
  useEffect(() => {
    if (currentPlayingAudio?.assetUrl && currentPlayingAudio?.assetUrl !== audioObj?.src) {
      // audioObj?.pause();
      // audioObj?.remove();
      // setIsPlaying(false);
      initAudio();
    }
  }, [currentPlayingAudio]);

  useEffect(() => {
    if (audioObj) {
      if (isPlaying) {
        audioObj.play();
      } else {
        audioObj.pause();
      }
    }
  }, [isPlaying]);
  const classes = usePlayerStyles();

  if (!currentPlayingAudio) {
    return null;
  }

  function initAudio() {
    audioObj?.pause();
    setIsPlaying(true);
    audioObj = new Audio();

    audioObj.addEventListener('loadeddata', () => {
      setDuration(calculateTime(audioObj.duration));
    });
    audioObj.addEventListener('timeupdate', () => {
      const time = calculateTime(audioObj.currentTime);
      setCurrentTime(time);
      const played = (audioObj.currentTime / audioObj.duration) * 100;
      setProgress(played);
    });
    audioObj.src = currentPlayingAudio.assetUrl;
    audioObj.load();
    audioObj.play();
  }
  function closeAudio() {
    audioObj.pause();
    setIsPlaying(false);
    setCurrentPlayingAudio(null);
  }

  function AudioInfo() {
    return (
      <div className={classes.audioInfo}>
        <a href="javascript:void(0);" className="player-thumb post-thumb">
          <img
            width="160"
            height="160"
            src={currentPlayingAudio.bannerImage || '/assets/images/default-audio.jpeg'}
            className={classes.audioBanner}
            alt="image description"
          />
        </a>
        <div className="player-txt">
          <h4 className={classes.audioName}>{currentPlayingAudio.name}</h4>
          <div className={classes.ownerName}>{nftUserFullDetail.userProfile?.displayName}</div>

          <span className={classes.audioOwner}>
            {truncateWalletString(nftUserFullDetail.userProfile?.walletAddress)}
          </span>
        </div>
        <span className={classes.closeAudio} onClick={closeAudio}>
          <HighlightOff />
        </span>
      </div>
    );
  }
  if (!currentPlayingAudio) {
    return null;
  }
  function handleChange(event, newValue) {
    audioObj.currentTime = (newValue / 100) * audioObj.duration;
  }
  function volumeChange(event, newVolume) {
    audioObj.volume = newVolume / 100;
  }
  return (
    <div className={classes.root}>
      <AudioInfo />
      <div className={classes.player}>
        <AudioPlayerButton product={currentPlayingAudio} showBottomBg={false} />
        <div className={classes.currentTime}>{currentTime} </div>
        <div className={classes.seekbar}>
          <Slider className={classes.playedSeekbarLength} value={progress} onChange={handleChange} />

          {/* <div className={classes.seekbarWidth}></div>
          <div className={classes.playedSeekbarLength} style={{ width: `${progress}%` }}></div> */}
        </div>
        <div className={classes.duration}>{duration}</div>
        <div className={classes.volumeControl}>
          <Slider className={classes.volumeControlSlider} value={audioObj?.volume} onChange={volumeChange} />
          <VolumeUp />
        </div>
      </div>
    </div>
  );
}
