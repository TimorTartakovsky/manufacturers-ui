import React from 'react';
import { CssBaseline, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

const Copyright = () => (
    <Typography variant="body2" color="textSecondary">
        {'Copyright © '}
        <Link color="inherit" href="">
            Manufactorer
        </Link>{' '}
        {new Date().getFullYear()} {'.'}
    </Typography>
);

const useStyles = makeStyles((theme) => ({
root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
},
main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
},
footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    borderTop: '1px solid',
    borderTopColor:
    theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
},
}));
  

const Fotter = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
          <CssBaseline />
          <footer className={classes.footer}>
            <Grid container justify="center" alignContent="center">
                <Grid item>
                    <Typography variant="body1">My sticky footer can be found here.</Typography>
                    <Copyright />
                </Grid>
            </Grid>
          </footer>
        </div>
      );
}

export default Fotter;
