import * as React from 'react';
import { useEffect } from 'react';
import { useSelector } from '../store';
import { joinRoom, update } from '../store/room';
import { useDispatch } from 'react-redux';
import { Container } from '@material-ui/core';
import Header from './Header';
import TileContainer from './TileContainer';
import RoomCommands from './RoomCommands';
import EmotionTile from './EmotionTile';
import EmotionAdder from './EmotionAdder';
import api from '../store/api';

export default function Room() {
  const dispatch = useDispatch();
  const room = useSelector((state) => state.room);

  useEffect(() => {
    const [, , roomId] = location.pathname.split('/');
    if (roomId) {
      dispatch(joinRoom({ roomId }));
    }
    api.onRoomUpdate(({ room }) => {
      dispatch(update(room));
    });
    api.onDisconnect((reason) => {
      console.error(`disconnected due to ${reason}`);
    });
  }, []);

  return (
    <Container disableGutters={true}>
      <Header>
        <RoomCommands />
      </Header>
      <TileContainer>
        {room &&
          room.emotions.map((emotion) => (
            <EmotionTile emotion={emotion} mine={api.clientId === emotion.createdBy} key={emotion.emotionId} />
          ))}
        <EmotionAdder />
      </TileContainer>
    </Container>
  );
}
