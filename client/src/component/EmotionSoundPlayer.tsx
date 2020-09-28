import { useEffect, useRef } from 'react';
import { useSelector } from '../store';
import { Emotion } from 'shared/api-interfaces';
import { Howl, Howler } from 'howler';

export default function EmotionSoundPlayer(emotion: Emotion) {
  const isMute = useSelector((state) => state.config.isMute);

  const sound = useRef(null);
  useEffect(() => {
    if (emotion.soundUrl) {
      sound.current = new Howl({
        src: emotion.soundUrl,
        volume: 0.05,
        html5: emotion.soundUrl.charAt(0) !== '/',
      });
    }
  }, [emotion.soundUrl]);

  const feverSound = useRef(null);
  useEffect(() => {
    if (emotion.feverSoundUrl) {
      feverSound.current = new Howl({
        src: emotion.feverSoundUrl,
        volume: 0.05,
        html5: emotion.soundUrl.charAt(0) !== '/',
      });
    }
  }, [emotion.feverSoundUrl]);

  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) {
      const s = emotion.feverSoundUrl && emotion.feverCount >= 10 ? feverSound : sound;
      s.current.play();
    } else {
      mounted.current = true;
    }
  }, [emotion.count]);

  useEffect(() => {
    Howler.mute(isMute);
  }, [isMute]);

  return null;
}
