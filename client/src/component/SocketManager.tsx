import { useEffect } from 'react';
import { joinRoom, updateRoom, raiseRoomError } from '../store/room';
import { useDispatch } from 'react-redux';
import api from '../lib/api';

export default function SocketManager() {
  const dispatch = useDispatch();

  useEffect(() => {
    const [, , roomId] = location.pathname.split('/');
    if (roomId) {
      dispatch(joinRoom({ roomId }));
    }
    api.onRoomUpdate(({ room }) => {
      dispatch(updateRoom(room));
    });
    api.onDisconnect((reason) => {
      console.error(`disconnected due to ${reason}`);
      dispatch(raiseRoomError(reason));
    });
  }, []);

  return null;
}
