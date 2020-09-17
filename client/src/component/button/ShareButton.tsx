import * as React from 'react';
import { useState } from 'react';
import { IconButton, Snackbar } from '@material-ui/core';
import { Share } from '@material-ui/icons';
import * as copyToClipboard from 'copy-to-clipboard';

export default function ShareButton() {
  const [barVisibility, setBarVisibility] = useState<boolean>(false);

  function handleClick() {
    copyToClipboard(location.href);
    setBarVisibility(true);
  }

  function handleClose() {
    setBarVisibility(false);
  }

  return (
    <React.Fragment>
      <IconButton color='inherit' aria-label='Copy URL to clipboard' onClick={handleClick}>
        <Share />
      </IconButton>

      <Snackbar
        open={barVisibility}
        autoHideDuration={6000}
        onClose={handleClose}
        message='URLをクリップボードにコピーしました'
      />
    </React.Fragment>
  );
}
