import * as React from 'react';
import { useEffect } from 'react';
import { useSelector } from '../store';
import { useDispatch } from 'react-redux';
import { createRoom } from '../store/room';
import { Button, Container } from '@material-ui/core';
import Header from './Header';

export default function Home() {
  const dispatch = useDispatch();
  const room = useSelector((state) => state.room);

  useEffect(() => {
    if (room && room.roomId) {
      location.href = `/rooms/${room.roomId}`;
    }
  }, [room]);

  return (
    <Container disableGutters={true}>
      <Header />
      <Button variant='contained' color='primary' onClick={() => dispatch(createRoom())}>
        へぇボタンをつくる
      </Button>
    </Container>
  );
}
