import * as React from 'react';
import { useEffect } from 'react';
import { useSelector } from '../store';
import { useDispatch } from 'react-redux';
import { joinRoom } from '../store/room';
import { Alert } from '@material-ui/lab';
import { PageContainer } from './PageContainer';
import { RoomHeader } from './RoomHeader';
import { RoomFooter } from './RoomFooter';
import { FlexContainer } from './FlexContainer';
import { EmotionTile } from './EmotionTile';
import { EmotionAddTile } from './EmotionAddTile';

export const RoomPage: React.FC = () => {
  const room = useSelector((state) => state.room);
  const dispatch = useDispatch();

  useEffect(() => {
    const [, , roomId] = location.pathname.split('/');
    if (roomId) {
      dispatch(joinRoom({ roomId }));
    }
  }, []);

  return (
    <PageContainer header={<RoomHeader />} footer={<RoomFooter />}>
      {room && room.error && <Alert severity='error'>{room.error}</Alert>}
      <FlexContainer>
        {room?.emotions?.map((emotion) => (
          <EmotionTile {...emotion} key={emotion.emotionId} />
        ))}
        <EmotionAddTile />
      </FlexContainer>
    </PageContainer>
  );
};
