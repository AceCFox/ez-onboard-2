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

class Forgot extends Component {
  state = {
    email: "",
    invalidEmail: false,
    showError: false,
    messageFromServer: ''
  };



  //forgot password function
  sendEmail = (event) => {
    event.preventDefault();
    if (this.state.email === ''){
        this.setState({
            showError: false
        });
    } else{
        this.props.dispatch({ type: "FETCH_EMAIL",  payload: this.state.email}); 
    }
  }

  //input handler for all input fields
  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      //Add recovery fucntion here
        this.sendEmail();
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
          {(this.props.state.email === true)  && (
            <h2 role="alert">Success! an email has been sent with a link to reset your password. 
             It will expire in 20 minutes. Please follow the directions in the email or click "send link" to send a new link.</h2>
          )}
          {(this.props.state.email === false)  && (
            <h2 role="alert">oops that email does not exist in our database! Please check your spelling and try again, or click "new user" to make a new account.'</h2>
          )}
          <h2 className={classes.LoginPage__title}>
            Password Recovery
          </h2>
          <p className={classes.LoginPage__subTitle}>
            Enter your email to receive a link to reset your password:
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
          <Grid
            item
            align="center"
            className={classes.LoginPage__buttonContainer}
          >
            <DynamicButton
              type="glow"
              text="Send Link"
              handleClick={this.sendEmail}
            />
            <br/>
            <DynamicButton
              type="dark2"
              text="log in"
              handleClick={() =>
                this.props.dispatch({ type: "SET_TO_LOGIN_MODE" })
              }
            />
           
            <DynamicButton
              type="dark"
              text="New User"
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
  state
});

Forgot.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps)(Forgot));
