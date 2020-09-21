import { useEffect, useRef } from 'react';
import { useSelector } from '../store';
import { Emotion } from 'shared/api-interfaces';

export default function EmotionPlayer(emotion: Emotion) {
  const config = useSelector((state) => state.config);

  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) {
      if (!config.mute) {
        const src = emotion.feverSoundUrl && emotion.feverCount >= 10 ? emotion.feverSoundUrl : emotion.soundUrl;
        const audio = new Audio(src);
        audio.volume = 0.05;
        audio.play();
      }
    } else {
      mounted.current = true;
    }
  }, [emotion.count]);

  return null;
}
