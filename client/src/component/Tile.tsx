import * as React from 'react';
import { IconButton, Card, CardActionArea, CardContent, Typography, useMediaQuery } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { Theme, createStyles, makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      margin: theme.spacing(1),
      padding: 0,
      width: theme.spacing(20),
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        margin: theme.spacing(0.5),
      },
      textAlign: 'center',
    },
    primary: {},
    secondary: {
      borderStyle: 'dashed',
      color: 'lightgray',
    },
    actions: {
      position: 'absolute',
      top: 0,
      right: 0,
      zIndex: 10,
    },
  })
);

export interface TileProps {
  onClick: () => void;
  onClose?: () => void;
  content: string | number;
  label: string;
  primary?: boolean;
}

export const Tile: React.FC<TileProps> = ({ children, onClick, onClose = null, content, label, primary = true }) => {
  const classes = useStyles();
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));

  function Phone() {
    return (
      <CardContent>
        <Typography variant='h3' align='center' style={{ paddingRight: '10%' }} noWrap>
          {content}
        </Typography>
        <Typography
          variant='h6'
          align='center'
          noWrap
          style={{ position: 'absolute', bottom: '20px', width: '50%', right: 0 }}
        >
          {label}
        </Typography>
      </CardContent>
    );
  }

  function Tablet() {
    return (
      <CardContent>
        <Typography variant='h2' align='center' noWrap>
          {content}
        </Typography>
        <Typography variant='h5' align='center' noWrap>
          {label}
        </Typography>
      </CardContent>
    );
  }

  return (
    <Card
      variant={primary ? 'elevation' : 'outlined'}
      className={`${classes.root} ${primary ? classes.primary : classes.secondary}`}
    >
      {onClose && (
        <IconButton className={classes.actions} onClick={onClose} size='small'>
          <Close fontSize='small' style={{ color: 'lightgray' }} />
        </IconButton>
      )}
      <CardActionArea onClick={onClick}>{xs ? <Phone /> : <Tablet />}</CardActionArea>
      {children}
    </Card>
  );
};
