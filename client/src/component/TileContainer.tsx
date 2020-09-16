import * as React from 'react';
import { Box } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        padding: 0,
        width: theme.spacing(24),
      },
    },
  })
);

export default function Room({ children }) {
  const classes = useStyles();

  return <Box className={classes.root}>{children}</Box>;
}
