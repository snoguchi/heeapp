import * as React from 'react';
import { useDispatch } from 'react-redux';
import { sendEmotion, removeEmotion } from '../store/room';
import Tile from './Tile';
import EmotionSoundPlayer from './EmotionSoundPlayer';
import EmotionMeter from './EmotionMeter';
import { Emotion } from 'shared/api-interfaces';

export default function EmotionTile(emotion: Emotion) {
  const dispatch = useDispatch();

  function handleSendEmotion() {
    dispatch(sendEmotion({ emotionId: emotion.emotionId }));
  }

  function handleRemoveEmotion() {
    dispatch(removeEmotion({ emotionId: emotion.emotionId }));
  }

  return (
    <Tile onClick={handleSendEmotion} onClose={handleRemoveEmotion} content={emotion.count} label={emotion.label}>
      <EmotionSoundPlayer {...emotion} />
      {emotion.feverSoundUrl && <EmotionMeter {...emotion} />}
    </Tile>
  );
}
