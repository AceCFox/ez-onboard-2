import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, TextField } from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import DynamicButton from "../Buttons/DynamicButton";
import { withRouter } from "react-router-dom";

const styles = (theme) => ({
  BottomBuffer: {
    marginBottom: "1rem",
  },
  LoginPage__buttonContainer: {
    marginBottom: "150px",
    position: "relative",
    maxWidth: "400px",
  },
  LoginPage: {
    color: "white",
  },
  LoginPage__title: {
    fontSize: "30px",
  },
  LoginPage__subTitle: {
    fontSize: "20px",
    marginBottom: "2rem",
  },
  TextField: {
    "--text-color": "#fff",
    "--dark-background": "#1c2447",
    "--focus-background": "#244d6e",
    width: "400px",
    color: "var(--text-color)",
    border: "1px solid var(--text-color)",
    backgroundColor: "var(--dark-background)",
    caretColor: "var(--text-color)",
    "&:focus": {
      backgroundColor: "var(--focus-background)",
    },
    "&:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 40px var(--dark-background) inset",
      "-webkit-text-fill-color": "var(--text-color)",
      "&:focus": {
        WebkitBoxShadow: "0 0 0 30px var(--focus-background) inset",
      },
    },
  },
});

class Reset extends Component {
  state = {
    email: "",
    password: "",
    confirmPassword: "",
    updated: false,
    passwordErr: false,
    confirmPasswordErr: false,
    tooShortModal: false,
    mismatchModal: false,
    disableInput: false,
  };

  componentDidMount() {
    this.props.dispatch({ type: "SET_TO_RESET_MODE" })
    //check if timeout has occured
    const id = this.props.match.params.id 
    console.log('token = ', id);
    this.props.dispatch({type: "CHECK_TIMEOUT", payload: id })
  }


  reset = (event) => {
    event.preventDefault();
    const password = this.state.password;
    const token = this.props.match.params.id;
    const dispatchPayload = {
      password: password,
      token: token,
    }
    console.log(`reset token: `, token);
    if (password.length < 6 ) {
      //To do: replace alert with MUI modal
      alert('oops, password is too short, must be at least 6 chacters long...');
      this.setState({
        passwordErr: true
      })
    } else if (password !== this.state.confirmPassword){
      //replace this with another modal
      alert ('oops! Passwords do not match...')
      this.setState({
        confirmPasswordErr: true,
      })
    } else {
      this.props.dispatch({ type: "UPDATE_PASSWORD",  payload: dispatchPayload});
      //this is where the route fires
      this.setState({
        updated: true,
        passwordErr: false,
        confirmPasswordErr: false,
        disableInput: true,
      })
    }
  }

  loginButton = (event) => {
    event.preventDefault();
    this.props.dispatch({ type: "SET_TO_LOGIN_MODE" });
    this.props.history.push('/home')
  }

  //input handler for all input fields
  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.reset(event)
    }
  };

  forgotButton = (event) => {
    event.preventDefault();
    this.props.dispatch({ type: "SET_TO_FORGOT_MODE" });
    this.props.history.push('/home')
  }

  render() {
    const { classes } = this.props;
    return (
      <>
      {/* If timeone reached, error message below will render */}
      { this.props.state.timeout?
      
        <Grid container justify="center" alignItems="center">
          <Grid item xs={12} className={classes.LoginPage} align="center">
            <h2 className={classes.LoginPage__title}>
              Oops, your reset link has expired!{" "}
            </h2>
            <p className={classes.LoginPage__subTitle}>
              Please click the button below and reenter your email address to request a new link:
            </p>
              <DynamicButton
                type="glow"
                text="Get New Link"
                handleClick={this.forgotButton}
              />
            </Grid>
          </Grid>
        
        :
        <Grid container justify="center" alignItems="center">
          <Grid item xs={12} className={classes.LoginPage} align="center">
            <h2 className={classes.LoginPage__title}>
              ZEF onboarding Password Reset{" "}
            </h2>
            <p className={classes.LoginPage__subTitle}>
              Please enter a new password to be associated with your account:
            </p>
            <TextField
              className={classes.BottomBuffer}
              required
              variant="filled"
              type="password"
              label="Password"
              name="password"
              disabled = {this.state.disableInput}
              error = {this.state.passwordErr}
              value={this.state.password}
              onChange={this.handleInputChangeFor("password")}
              InputProps={{ classes: { root: classes.TextField } }}
              inputProps={{ maxLength: 1000, className: classes.TextField }}
              InputLabelProps={{ style: { color: "white" } }}
              onKeyDown={this.handleKeyDown}
            />
            <br/>
            <TextField
              className={classes.BottomBuffer}
              required
              variant="filled"
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              error = {this.state.confirmPasswordErr}
              disabled = {this.state.disableInput}
              value={this.state.confirmPassword}
              onChange={this.handleInputChangeFor("confirmPassword")}
              InputProps={{ classes: { root: classes.TextField } }}
              inputProps={{ maxLength: 1000, className: classes.TextField }}
              InputLabelProps={{ style: { color: "white" } }}
              onKeyDown={this.handleKeyDown}
            />
            { this.state.updated?
            <Grid
              item
              align="center"
              className={classes.LoginPage__buttonContainer}
            >
              <p className={classes.LoginPage__subTitle}>
                Your password has been successfully reset! Please try logging in again:
              </p>
              <DynamicButton
                type="glow"
                text="Sign in"
                handleClick={this.loginButton}
              />
            </Grid>
            :
            <Grid
              item
              align="center"
              className={classes.LoginPage__buttonContainer}
            >
              <DynamicButton
                type="glow"
                text="Update password"
                handleClick={this.reset}
              />
            </Grid>
            }
          </Grid>
        </Grid>
      }
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  state,
});

Reset.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(connect(mapStateToProps)(Reset)));
