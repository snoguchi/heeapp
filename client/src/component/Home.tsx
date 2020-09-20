import * as React from 'react';
import { useEffect } from 'react';
import { useSelector } from '../store';
import { useDispatch } from 'react-redux';
import { createRoom } from '../store/room';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Box, Button, Container, Typography } from '@material-ui/core';
import Header from './Header';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    para: {
      margin: theme.spacing(2),
    },
  })
);

export default function Home() {
  const dispatch = useDispatch();
  const room = useSelector((state) => state.room);
  const classes = useStyles();

  useEffect(() => {
    if (room && room.roomId) {
      location.href = `/rooms/${room.roomId}`;
    }
  }, [room]);

  return (
    <Container disableGutters={true}>
      <Header />
      <Box textAlign='center'>
        <Typography variant='h5' className={classes.para}>
          あなたのテレビ会議に「へぇ」ボタンを
        </Typography>
        <Button variant='contained' color='primary' onClick={() => dispatch(createRoom())}>
          へぇボタンをつくる
        </Button>
      </Box>
    </Container>
  );
}
