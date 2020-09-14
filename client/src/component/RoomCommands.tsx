import * as React from 'react';
import { useDispatch } from 'react-redux';

import { useSelector } from '../store';
import { mute, unmute } from '../store/config';

import { Box, IconButton, Tooltip } from '@material-ui/core';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import ShareIcon from '@material-ui/icons/Share';
import LaunchIcon from '@material-ui/icons/Launch';

import * as copyToClipboard from 'copy-to-clipboard';

export default function Tools() {
  const dispatch = useDispatch();
  const config = useSelector((state) => state.config);

  return (
    <Box>
      {config.mute ? (
        <Tooltip title='音声がミュートされています' arrow open={true} placement='left'>
          <IconButton color='inherit' aria-label='Unmute' onClick={() => dispatch(unmute())}>
            <VolumeOffIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <IconButton color='inherit' aria-label='Mute' onClick={() => dispatch(mute())}>
          <VolumeUpIcon />
        </IconButton>
      )}

      <IconButton color='inherit' aria-label='Copy URL to clipboard' onClick={() => copyToClipboard(location.href)}>
        <ShareIcon />
      </IconButton>
      <IconButton color='inherit' aria-label='Popout'>
        <LaunchIcon />
      </IconButton>
    </Box>
  );
}
