import * as React from 'react';

import { Link, Toolbar, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
  })
);

export default function Header(props) {
  const classes = useStyles();

  return (
    <Toolbar>
      <Typography variant='h5' className={classes.title}>
        <Link href='/' color='inherit'>
          HeeApp
        </Link>
      </Typography>
      {props.children}
    </Toolbar>
  );
}
