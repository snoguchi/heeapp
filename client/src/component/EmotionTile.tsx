import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useSelector } from '../store';
import { useDispatch } from 'react-redux';
import { sendEmotion, removeEmotion } from '../store/room';
import { IconButton, Card, CardActionArea, CardContent, LinearProgress, Typography } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { createStyles, makeStyles } from '@material-ui/core/styles';

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

export default function EmotionTile({ emotion, mine }) {
  const dispatch = useDispatch();
  const config = useSelector((state) => state.config);
  const classes = useStyles();

  const [fever, setFever] = useState(0);
  useEffect(() => {
    const timerId = setTimeout(() => setFever(0), emotion.feverEndAt - Date.now());
    setFever(emotion.fever);
    return () => clearTimeout(timerId);
  }, [emotion.fever]);

  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) {
      if (!config.mute) {
        const src = emotion.feverSoundUrl && emotion.fever >= 10 ? emotion.feverSoundUrl : emotion.soundUrl;
        const audio = new Audio(src);
        audio.volume = 0.05;
        audio.play();
      }
    } else {
      mounted.current = true;
    }
  }, [emotion.total]);

  function handleSendEmotion() {
    dispatch(sendEmotion({ emotionId: emotion.emotionId }));
  }

  function handleRemoveEmotion() {
    dispatch(removeEmotion({ emotionId: emotion.emotionId }));
  }

  return (
    <Card className={classes.root}>
      {mine && (
        <IconButton className={classes.actions} onClick={handleRemoveEmotion}>
          <Close />
        </IconButton>
      )}
      <CardActionArea onClick={handleSendEmotion}>
        <CardContent>
          <Typography variant='h1' align='center'>
            {emotion.total}
          </Typography>
          <Typography variant='h5' align='center'>
            {emotion.label}
          </Typography>
        </CardContent>
      </CardActionArea>
      {emotion.feverSoundUrl && (
        <LinearProgress
          variant='determinate'
          color={fever < 10 ? 'primary' : 'secondary'}
          value={Math.min(fever * 10, 100)}
        />
      )}
    </Card>
  );
}
