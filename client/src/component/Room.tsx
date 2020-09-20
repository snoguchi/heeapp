import * as React from 'react';
import { useEffect } from 'react';
import { useSelector } from '../store';
import { useDispatch } from 'react-redux';
import { joinRoom } from '../store/room';
import { Box, Container, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Header from './Header';
import MuteButton from './button/MuteButton';
import ShareButton from './button/ShareButton';
import PopoutButton from './button/PopoutButton';
import TileContainer from './TileContainer';
import EmotionTile from './EmotionTile';
import EmotionAddTile from './EmotionAddTile';

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
    footer: {
      margin: theme.spacing(1),
      color: 'lightgray',
    },
  })
);

export default function Room() {
  const room = useSelector((state) => state.room);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    const [, , roomId] = location.pathname.split('/');
    if (roomId) {
      dispatch(joinRoom({ roomId }));
    }
  }, []);

  return (
    <Container className={classes.root} disableGutters={true}>
      <Header>
        <MuteButton />
        <ShareButton />
        <PopoutButton />
      </Header>
      <Box className={classes.body}>
        {room && room.error && <Alert severity='error'>{room.error}</Alert>}
        <TileContainer>
          {room &&
            room.emotions &&
            room.emotions.map((emotion) => <EmotionTile {...emotion} key={emotion.emotionId} />)}
          <EmotionAddTile />
        </TileContainer>
      </Box>
      <Box className={classes.footer} textAlign='right'>
        {room && (
          <Typography variant='body2'>
            Created at {new Date(room.createdAt).toLocaleString()}, {room.numberOfActiveConnections} active connections
          </Typography>
        )}
      </Box>
    </Container>
  );
}
