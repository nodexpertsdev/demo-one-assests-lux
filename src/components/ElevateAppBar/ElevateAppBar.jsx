import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
      marginLeft: '85%',
    },
}));

export default function ElevateAppBar(props) {
  const { appName, onSave,children } = props;
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
        <AppBar>
            <Toolbar>
            <Typography variant="h6">{appName}</Typography>
            <Button
                variant="contained"
                color="default"
                size="small"
                onClick={onSave}
                className={classes.button}
                startIcon={<SaveIcon />}
            >
                Save
            </Button>
            </Toolbar>
        </AppBar>
      <Toolbar />
      {children}
    </React.Fragment>
  );
}

ElevateAppBar.propTypes = {
    appName: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

