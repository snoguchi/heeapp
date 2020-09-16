import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEmotion } from '../store/room';
import { Card, CardActionArea, CardContent, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import EmotionDialog from './EmotionDialog';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      borderStyle: 'dashed',
      color: 'lightgray',
    },
  })
);

export default function EmotionAdder() {
  const dispatch = useDispatch();
  const [dialogVisible, setDialogVisible] = useState(false);
  const classes = useStyles();

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
    <Card variant='outlined' className={classes.root}>
      <CardActionArea onClick={openDialog}>
        <CardContent>
          <Typography variant='h1' align='center'>
            +
          </Typography>
          <Typography variant='h5' align='center'>
            Add
          </Typography>
        </CardContent>
      </CardActionArea>
      <EmotionDialog title='音声を追加する' open={dialogVisible} onOK={handleOK} onCancel={handleCancel} />
    </Card>
  );
}
