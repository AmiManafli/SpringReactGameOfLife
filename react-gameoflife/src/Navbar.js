import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import Button from '@material-ui/core/Button';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles((theme) => ({
    toolbar: {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbarTitle: {
      flex: 1,
    },
    toolbarSecondary: {
      justifyContent: 'space-between',
      overflowX: 'auto',
    },
    toolbarLink: {
      padding: theme.spacing(1),
      flexShrink: 0,
    },
  }));


function NavBar(props) {
    const classes = useStyles();
    const { sections, title } = props;

    return(
        <div>
        <AppBar position="static" color="default">
            <Toolbar className={classes.toolbar}>
                <Typography className={classes.toolbarTitle} variant="h3" align='center' color="textPrimary">
                    Game of Life
                </Typography>
                <IconButton aria-label="delete"><ToggleOnIcon fontSize="large"/></IconButton>
                <IconButton><InfoIcon fontSize="medium" /></IconButton>
            </Toolbar>
        </AppBar>
        </div>
    )
}

export default NavBar;