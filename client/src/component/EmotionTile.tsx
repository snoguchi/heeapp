import * as React from 'react';
import { useDispatch } from 'react-redux';
import { sendEmotion, removeEmotion } from '../store/room';
import TileItem from './TileItem';
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
    <TileItem
      onClick={handleSendEmotion}
      onClose={handleRemoveEmotion}
      content={emotion.count}
      label={emotion.label}
    >
      <EmotionSoundPlayer {...emotion} />
      {emotion.feverSoundUrl && <EmotionMeter {...emotion} />}
    </TileItem>
  );
}
