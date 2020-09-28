import * as React from 'react';
import Header from './Header';
import MuteButton from './button/MuteButton';
import ShareButton from './button/ShareButton';
import PopoutButton from './button/PopoutButton';

export default function RoomHeader() {
  return (
    <Header>
      <MuteButton />
      <ShareButton />
      <PopoutButton />
    </Header>
  );
}
