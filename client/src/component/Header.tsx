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
    beta: {
      fontSize: '30%',
    },
  })
);

export const Header: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <Toolbar className={classes.root}>
      <Typography variant='h5' className={classes.title}>
        <Link href='/' color='inherit' underline='none'>
          HeeApp
        </Link>
        <sup className={classes.beta}>BETA</sup>
      </Typography>
      {children}
    </Toolbar>
  );
};
