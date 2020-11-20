import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { sendEmotion, removeEmotion } from '../store/room';
import { Tile } from './Tile';
import { EmotionSoundPlayer } from './EmotionSoundPlayer';
import { EmotionMeter } from './EmotionMeter';
import { Emotion } from 'shared/api-interfaces';

export const EmotionTile: React.FC<Emotion> = (emotion: Emotion) => {
  const dispatch = useDispatch();
  const [t] = useTranslation();

  function handleSendEmotion() {
    dispatch(sendEmotion({ emotionId: emotion.emotionId }));
  }

  function handleRemoveEmotion() {
    dispatch(removeEmotion({ emotionId: emotion.emotionId }));
  }

  return (
    <Tile
      onClick={handleSendEmotion}
      //onClose={handleRemoveEmotion}
      content={emotion.count}
      label={t([`emotion/${emotion.emotionId}`, emotion.label])}
    >
      <EmotionSoundPlayer {...emotion} />
      {emotion.feverSoundUrl && <EmotionMeter {...emotion} />}
    </Tile>
  );
};
