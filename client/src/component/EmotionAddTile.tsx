import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEmotion } from '../store/room';
import TileItem from './TileItem';
import EmotionDialog from './EmotionDialog';

export default function EmotionAdder() {
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
    <TileItem onClick={openDialog} content='+' label='Add' primary={false}>
      <EmotionDialog title='音声を追加する' open={dialogVisible} onOK={handleOK} onCancel={handleCancel} />
    </TileItem>
  );
}
