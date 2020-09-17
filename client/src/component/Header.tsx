import * as React from 'react';
import { Link, Toolbar, Typography } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(3),
    },
    title: {
      flexGrow: 1,
    },
  })
);

export default function Header(props) {
  const classes = useStyles();

  return (
    <Toolbar className={classes.root}>
      <Typography variant='h5' className={classes.title}>
        <Link href='/' color='inherit'>
          HeeApp
        </Link>
      </Typography>
      {props.children}
    </Toolbar>
  );
}
