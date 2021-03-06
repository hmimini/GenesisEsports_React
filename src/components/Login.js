/*  Hermes Mimini
 *  CST-452: Professor Mark Reha
 *  Version 4.0
 *  Sprint 4: 04/04/2021
 * 
 * This is the Login Form which ise used in LoginRegister.js
 */


//Imports necessary for this Project
import { Button } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import service from './../service/UserService';
import { useHistory } from 'react-router-dom';
import React from 'react';
import Cookies from 'universal-cookie';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

//Styles that are used in the login page
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

//default login function
//It will create a JSON object with just username and password and send it to spring
export default function Component(props) {

  const classes = useStyles();

  let history = useHistory();
  const cookies = new Cookies();

  const handleSubmit = async (event) => {
    event.preventDefault();
    let json = JSON.stringify({
      "username": props.username_login,
      "password": props.password_login
    });

    let status = await service.loginUser(json);
    //console.log(status)

    cookies.set('Id', status._id, { path: '/' })
    cookies.set('username', status.username, { path: '/' })
    cookies.set('password', status.password, { path: '/' })

    //if there is a result go to homepage
    if (status !== "") {
      history.push("/HomePage")
    } else {
      alert("Failed to Login/Register!")
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <ValidatorForm onSubmit={handleSubmit} onError={errors => console.log(errors)}>
          <TextValidator
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username_login"
            label="Username"
            name="username_login"
            autoComplete="username"
            autoFocus
            validators={['required']}
            errorMessages={['This field is required']}
            onChange={props.onChangeUsernameLogin}
            value={props.username_login}
          />
          <TextValidator
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password_login"
            label="Password"
            name="password_login"
            type="password"
            autoComplete="current-password"
            validators={['required']}
            errorMessages={['This field is required']}
            onChange={props.onChangePasswordLogin}
            value={props.password_login}
          />
          <TextField/>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        </ValidatorForm>
      </div>
    </Container>
  );
}