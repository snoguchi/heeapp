import * as React from 'react';
import { useSelector } from '../store';
import { mute, unmute } from '../store/config';
import { useDispatch } from 'react-redux';
import { IconButton, Tooltip } from '@material-ui/core';
import { VolumeOff, VolumeUp } from '@material-ui/icons';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    tooltip: {
      margin: 0,
      fontSize: '1em',
    },
  })
);

export const MuteButton: React.FC = () => {
  const dispatch = useDispatch();
  const isMute = useSelector((state) => state.config.isMute);
  const classes = useStyles();

  function handleUnmute() {
    dispatch(unmute());
  }

  function handleMute() {
    dispatch(mute());
  }

  if (isMute) {
    return (
      <Tooltip title='音声がミュートされています' classes={classes} arrow open={true}>
        <IconButton color='inherit' aria-label='Unmute' onClick={handleUnmute}>
          <VolumeOff />
        </IconButton>
      </Tooltip>
    );
  } else {
    return (
      <IconButton color='inherit' aria-label='Mute' onClick={handleMute}>
        <VolumeUp />
      </IconButton>
    );
  }
};
