import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEmotion } from '../store/room';
import { Tile } from './Tile';
import { EmotionDialog } from './EmotionDialog';

export const EmotionAddTile: React.FC = () => {
  const dispatch = useDispatch();
  const [dialogVisible, setDialogVisible] = useState(false);

  function openDialog() {
    setDialogVisible(true);
  }

  function handleCancel() {
    setDialogVisible(false);
  }

  function handleOK({ soundUrl, label }) {
    console.log({ soundUrl, label });
    setDialogVisible(false);
    dispatch(addEmotion({ soundUrl, label, feverSoundUrl: null }));
  }

  return (
    <Tile onClick={openDialog} content='+' label='Add' primary={false}>
      <EmotionDialog title='音声を追加する' open={dialogVisible} onOK={handleOK} onCancel={handleCancel} />
    </Tile>
  );
};
