import * as React from 'react';
import { Header } from './Header';
import { LangButton } from './LangButton';
import { MuteButton } from './MuteButton';
import { ShareButton } from './ShareButton';
import { PopoutButton } from './PopoutButton';

export const RoomHeader: React.FC = () => {
  return (
    <Header>
      <LangButton />
      <MuteButton />
      <ShareButton />
      <PopoutButton />
    </Header>
  );
};
