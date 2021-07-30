import React, { createContext, useContext, useEffect, useState } from 'react';
import { oneOfType, object, array } from 'prop-types';
import { useLocation } from 'react-router-dom';
import { NFTObjectData } from '../../hooks/useApi';

export interface AudioProp {
  currentPlayingAudio: NFTObjectData;
  setCurrentPlayingAudio;
  isPlaying: boolean;
  setIsPlaying;
}
export const AudioContext = createContext({} as AudioProp);

export const AudioProvider = props => {
  const enrichedAudio = useAudioProvider();
  return <AudioContext.Provider value={enrichedAudio}>{props.children}</AudioContext.Provider>;
};

AudioProvider.propTypes = {
  children: oneOfType([object, array]).isRequired,
};

export const useAudio = () => useContext(AudioContext);

const useAudioProvider = () => {
  const [currentPlayingAudio, setCurrentPlayingAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  return { currentPlayingAudio, setCurrentPlayingAudio, isPlaying, setIsPlaying };
};
