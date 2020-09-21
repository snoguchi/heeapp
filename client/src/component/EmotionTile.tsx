import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { sendEmotion, removeEmotion } from '../store/room';
import { IconButton, Card, CardActionArea, CardContent, LinearProgress, Typography } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import EmotionPlayer from './EmotionPlayer';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Emotion } from 'shared/api-interfaces';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: 'relative',
    },
    actions: {
      position: 'absolute',
      top: 0,
      right: 0,
      zIndex: 10,
    },
  })
);

export default function EmotionTile(emotion: Emotion) {
  const dispatch = useDispatch();
  const classes = useStyles();

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
    <Card className={classes.root}>
      <EmotionPlayer {...emotion} />
      {emotion.createdBy !== null && (
        <IconButton className={classes.actions} onClick={handleRemoveEmotion}>
          <Close />
        </IconButton>
      )}
      <CardActionArea onClick={handleSendEmotion}>
        <CardContent>
          <Typography variant='h1' align='center' noWrap>
            {emotion.count}
          </Typography>
          <Typography variant='h5' align='center' noWrap>
            {emotion.label}
          </Typography>
        </CardContent>
      </CardActionArea>
      {emotion.feverSoundUrl && (
        <LinearProgress
          variant='determinate'
          color={feverCount < 10 ? 'primary' : 'secondary'}
          value={Math.min(feverCount * 10, 100)}
        />
      )}
    </Card>
  );
}
