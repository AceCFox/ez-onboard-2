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

class LoginPage extends Component {
  state = {
    email: "",
    invalidEmail: false,
    password: "",
  };

  //forgot password function
  forgot = (event) => {
    event.preventDefault();
    this.props.dispatch({ type: "SET_TO_FORGOT_MODE" })
  }

  //handles login 
  login = (event) => {
    event.preventDefault();

    if (this.state.email && this.state.password &&!this.state.invalidEmail) {
      this.props.dispatch({
        type: "LOGIN",
        payload: {
          email: this.state.email.toLowerCase(),
          password: this.state.password,
        },
      });
      this.props.history.push("/home");
    } else {
      this.props.dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  }; // end login

  //input handler for all input fields
  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.login(event);
    }
  };

//validates email input
  checkEmail = (e) => {
    const value = e.target.value;
    if (value.includes("@") && value.includes(".")) {
      this.setState({
        invalidEmail: false,
      });
    } else {
      this.setState({
        invalidEmail: true,
      });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid container justify="center" alignItems="center">
        <Grid item xs={12} className={classes.LoginPage} align="center">
          {this.props.errors.loginMessage && (
            <h2 role="alert">{this.props.errors.loginMessage}</h2>
          )}

          <h2 className={classes.LoginPage__title}>
            Welcome to ZEFNET EZ Onboarding!{" "}
          </h2>
          <p className={classes.LoginPage__subTitle}>
            The first stop for a new ZEF Energy customer
          </p>
          <TextField
            className={classes.BottomBuffer}
            required
            variant="filled"
            error={this.state.invalidEmail}
            onBlur={this.checkEmail}
            label="Email Address"
            name="email"
            value={this.state.email}
            onChange={this.handleInputChangeFor("email")}
            InputProps={{ classes: { root: classes.TextField } }}
            inputProps={{ maxLength: 100, className: classes.TextField }}
            InputLabelProps={{ style: { color: "white" } }}
          />
          <br />
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
          <Grid
            item
            align="center"
            className={classes.LoginPage__buttonContainer}
          >
            <DynamicButton
              type="dark2"
              text="Forgot password?"
              handleClick = {this.forgot}
            />
            <DynamicButton
              type="glow"
              text="Sign in"
              handleClick={this.login}
            />
            <DynamicButton
              type="dark"
              text="New User?"
              handleClick={() =>
                this.props.dispatch({ type: "SET_TO_REGISTER_MODE" })
              }
            />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  errors: state.errors,
});

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps)(LoginPage));
