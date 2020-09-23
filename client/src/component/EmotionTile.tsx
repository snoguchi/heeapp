import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { sendEmotion, removeEmotion } from '../store/room';
import { LinearProgress } from '@material-ui/core';
import EmotionPlayer from './EmotionPlayer';
import TileItem from './TileItem';
import { Emotion } from 'shared/api-interfaces';

export default function EmotionTile(emotion: Emotion) {
  const dispatch = useDispatch();

  const [feverCount, setFeverCount] = useState(0);
  useEffect(() => {
    const timerId = setTimeout(() => setFeverCount(0), emotion.feverEndAt - Date.now());
    setFeverCount(emotion.feverCount);
    return () => clearTimeout(timerId);
  }, [emotion.feverCount]);

  function handleSendEmotion() {
    dispatch(sendEmotion({ emotionId: emotion.emotionId }));
  }

  function handleRemoveEmotion() {
    dispatch(removeEmotion({ emotionId: emotion.emotionId }));
  }

  return (
    <TileItem
      onClick={handleSendEmotion}
      onClose={emotion.createdBy !== null && handleRemoveEmotion}
      content={emotion.count}
      label={emotion.label}
    >
      <EmotionPlayer {...emotion} />
      {emotion.feverSoundUrl && (
        <LinearProgress
          variant='determinate'
          color={feverCount < 10 ? 'primary' : 'secondary'}
          value={Math.min(feverCount * 10, 100)}
        />
      )}
    </TileItem>
  );
}
