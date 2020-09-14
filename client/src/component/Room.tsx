import * as React from 'react';
import { useEffect } from 'react';

import { useSelector } from '../store';
import { joinRoom, update } from '../store/room';
import api from '../store/api';

import { useDispatch } from 'react-redux';

import { Box, Container } from '@material-ui/core';
import Header from './Header';
import RoomCommands from './RoomCommands';
import EmotionCard from './EmotionCard';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    cardContainer: {
      display: 'flex',
      flexWrap: 'wrap',
    },
  })
);

export default function Room() {
  const dispatch = useDispatch();
  const room = useSelector((state) => state.room);
  const classes = useStyles();

  useEffect(() => {
    const [, , roomId] = location.pathname.split('/');
    if (roomId) {
      dispatch(joinRoom({ roomId }));
    }
    api.onUpdate((room) => {
      dispatch(update(room));
    });
  }, []);

  if (!room) {
    return null;
  }

  return (
    <Container disableGutters={true}>
      <Header>
        <RoomCommands />
      </Header>
      <Box className={classes.cardContainer}>
        {room.emotions.map((emotion) => (
          <EmotionCard {...emotion} key={emotion.emotionId} />
        ))}
      </Box>
    </Container>
  );
}
