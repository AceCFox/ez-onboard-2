import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, TextField } from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import DynamicButton from "../Buttons/DynamicButton";

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
    invalidEmail: false,
    password: "",
    confirmPasswordk: "",
    updated: false,
  };

  componentDidMount() {
    this.props.dispatch({ type: "SET_TO_RESET_MODE" })
  }

  reset = (event) => {
    event.preventDefault();
    alert('reset button clicked. Actual logic to follow:');
    this.setState({
      updated: true,
    })
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

  render() {
    const { classes } = this.props;
    return (
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
              Your password has been successfully reset. Please try logging in again!
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
    );
  }
}

const mapStateToProps = (state) => ({
  state,
});

Reset.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps)(Reset));