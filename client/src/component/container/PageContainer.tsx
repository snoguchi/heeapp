import * as React from 'react';
import { Box, Container } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      minHeight: '100vh',
      flexDirection: 'column',
    },
    body: {
      flex: 1,
    },
  })
);

export default function PageContainer({ children, header, footer }) {
  const classes = useStyles();

  return (
    <Container className={classes.root} disableGutters={true}>
      <Box className={classes.body}>
        {header}
        {children}
      </Box>
      {footer}
    </Container>
  );
}
