import * as React from 'react';
import { useState, useEffect, useRef } from 'react';

import { useSelector } from '../store';

import { useDispatch } from 'react-redux';
import { sendEmotion } from '../store/room';

import { Card, CardActionArea, CardContent, LinearProgress, Typography } from '@material-ui/core';

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import { Emotion } from 'shared/api-interfaces';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
      padding: 0,
      width: theme.spacing(24),
    },
  })
);

export default function EmotionTile(emotion: Emotion) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const config = useSelector((state) => state.config);

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

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => dispatch(sendEmotion({ emotionId: emotion.emotionId }))}>
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
