import * as React from 'react';
import { useSelector } from '../store';
import { Box, Typography } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      margin: theme.spacing(1),
      color: 'lightgray',
    },
  })
);

export const RoomFooter: React.FC = () => {
  const room = useSelector((state) => state.room);
  const classes = useStyles();

  return (
    <Box className={classes.footer} textAlign='right'>
      {room && (
        <Typography variant='body2'>
          Created at {new Date(room.createdAt).toLocaleString()}, {room.numberOfActiveConnections} active connections
        </Typography>
      )}
    </Box>
  );
};
