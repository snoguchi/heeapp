import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateRoom, updateEmotion, raiseRoomError } from '../store/room';
import api from '../lib/api';

export default function SocketManager() {
  const dispatch = useDispatch();

  useEffect(() => {
    api.onRoomUpdate(({ room }) => {
      dispatch(updateRoom(room));
    });
    api.onEmotionUpdate(({ emotion }) => {
      dispatch(updateEmotion(emotion));
    });
    api.onDisconnect((reason) => {
      console.error(`disconnected due to ${reason}`);
      dispatch(raiseRoomError(reason));
    });
  }, []);

  return null;
}
