import * as React from 'react';
import { Box } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
  })
);

export default function FlexContainer({ children }) {
  const classes = useStyles();

  return <Box className={classes.root}>{children}</Box>;
}
