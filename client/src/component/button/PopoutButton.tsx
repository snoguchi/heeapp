import * as React from 'react';
import { IconButton } from '@material-ui/core';
import { Launch } from '@material-ui/icons';

export default function PopoutButton() {
  function handleClick() {
    window.open(location.pathname, 'popout', 'resizable,scrollbars,width=300,height=650');
  }

  if (window.name === 'popout') {
    return null;
  }

  return (
    <IconButton color='inherit' aria-label='Popout' onClick={handleClick}>
      <Launch />
    </IconButton>
  );
}
