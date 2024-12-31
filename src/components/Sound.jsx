import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import snowfall from '../assets/snowfall.mp3';

const SOUND_TRACKS = {
  snowfall: snowfall,
};

const Sound = ({ currentTrack, isPlaying }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    audioRef.current = new Audio(SOUND_TRACKS[currentTrack]);
    audioRef.current.loop = true;
    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  }, []);

  return null;
};

Sound.propTypes = {
  currentTrack: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired
};

export default Sound;