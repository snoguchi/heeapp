import * as React from 'react';
import { useState } from 'react';
import { IconButton, Snackbar } from '@material-ui/core';
import { Box, Button, TextField, Dialog, DialogContent } from '@material-ui/core';
import { Share } from '@material-ui/icons';
import DialogTitleWithCloseButton from './DialogTitleWithCloseButton';
import * as QRCode from 'qrcode.react';
import * as copyToClipboard from 'copy-to-clipboard';

export default function ShareButton() {
  const [barVisibility, setBarVisibility] = useState<boolean>(false);
  const [dialogVisibility, setDialogVisibility] = useState<boolean>(false);

  function handleClick() {
    setDialogVisibility(true);
  }

  function handleBarClose() {
    setBarVisibility(false);
  }

  function handleDialogClose() {
    setDialogVisibility(false);
  }

  function handleCopy() {
    copyToClipboard(location.href);
    setBarVisibility(true);
  }

  return (
    <React.Fragment>
      <IconButton color='inherit' aria-label='Copy URL to clipboard' onClick={handleClick}>
        <Share />
      </IconButton>

      <Dialog open={dialogVisibility} onClose={handleDialogClose}>
        <DialogTitleWithCloseButton onClose={handleDialogClose}>共有</DialogTitleWithCloseButton>
        <DialogContent>
          <Box textAlign='center' padding={3}>
            <QRCode value={location.href} />
          </Box>
          <TextField
            type='url'
            defaultValue={location.href}
            fullWidth
            InputProps={{
              readOnly: true,
              endAdornment: (
                <Button onClick={handleCopy} color='primary'>
                  コピー
                </Button>
              ),
            }}
          />
        </DialogContent>
      </Dialog>

      <Snackbar
        open={barVisibility}
        autoHideDuration={6000}
        onClose={handleBarClose}
        message='URLをクリップボードにコピーしました'
      />
    </React.Fragment>
  );
}
