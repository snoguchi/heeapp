import * as React from 'react';
import { useSelector } from '../store';
import { mute, unmute } from '../store/config';
import { useDispatch } from 'react-redux';
import { Box, IconButton, Tooltip } from '@material-ui/core';
import { VolumeUp, VolumeOff, Share, Launch } from '@material-ui/icons';
import * as copyToClipboard from 'copy-to-clipboard';

export default function Tools() {
  const dispatch = useDispatch();
  const config = useSelector((state) => state.config);

  return (
    <Box>
      {config.mute ? (
        <Tooltip title='音声がミュートされています' arrow open={true} placement='left'>
          <IconButton color='inherit' aria-label='Unmute' onClick={() => dispatch(unmute())}>
            <VolumeOff />
          </IconButton>
        </Tooltip>
      ) : (
        <IconButton color='inherit' aria-label='Mute' onClick={() => dispatch(mute())}>
          <VolumeUp />
        </IconButton>
      )}

      <IconButton color='inherit' aria-label='Copy URL to clipboard' onClick={() => copyToClipboard(location.href)}>
        <Share />
      </IconButton>
      <IconButton color='inherit' aria-label='Popout' disabled>
        <Launch />
      </IconButton>
    </Box>
  );
}
