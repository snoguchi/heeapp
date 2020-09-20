import * as React from 'react';
import { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

export default function EmotionDialog({ title, open, onOK, onCancel, ...props }) {
  const [soundUrl, setSoundUrl] = useState<string>(props.soundUrl || '');
  const [label, setLabel] = useState<string>(props.label || '');

  function handleSoundUrlChange(e) {
    setSoundUrl(e.target.value);
  }

  function handleLabelChange(e) {
    setLabel(e.target.value);
  }

  function handleOK() {
    onOK({ soundUrl, label: label || 'Custom' });
  }

  function handlePlay() {
    const audio = new Audio(soundUrl);
    audio.volume = 0.05;
    audio.play();
  }

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          margin='dense'
          label='Audio URL'
          type='url'
          value={soundUrl}
          fullWidth
          required
          autoFocus
          onChange={handleSoundUrlChange}
          InputProps={{
            endAdornment: (
              <Button onClick={handlePlay} color='primary' disabled={!soundUrl}>
                Play
              </Button>
            ),
          }}
        />
        <TextField margin='dense' label='Label' type='text' value={label} fullWidth onChange={handleLabelChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color='primary'>
          Cancel
        </Button>
        <Button onClick={handleOK} variant='contained' color='primary' disabled={!soundUrl} disableElevation>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
