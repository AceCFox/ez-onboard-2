import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Grid,
  Paper,
  withStyles,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from "@material-ui/core";
import PropTypes from "prop-types";
import zefNetPro from "./Images/zefpro.png";
import wallMount from "./Images/wallMountStylized.jpg";
import singleHead from "./Images/singleHeadStylized.jpg";
import dualHead from "./Images/dualHeadStylized.jpg";
import DynamicButton from "../Buttons/DynamicButton";

const styles = (theme) => ({
  paper: {
    padding: theme.spacing(2),
    borderRadius: "5px",
  },
  borderedBox: {
    border: "solid #e3e3e3 3px",
    maxWidth: "515px",
    height: "150px",
    display: "flex",
    borderRadius: "5px",
  },
  image: {
    maxHeight: "145px",
    maxWidth: "145px",
  },
  centerFont: {
    paddingLeft: "15px",
    textAlign: "center",
    color: "black",
    fontFamily: "inter, Open Sans, sans-serif",
    maxWidth: "inherit",
  },
  form: {
    background: "transparent",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    padding: "0px",
  },
  buttonDiv: {
    display: "flex",
    width: "515px",
    justifyContent: "space-between",
    align: "center",
    marginTop: "20px",
  },
  textField: {
    fontFamily: "Inter, Open Sans, sans-serif",
    width: "400px",
  },
});

//component can be viewed at /deviceName
class DeviceName extends Component {
  state = {
    chargerName: "",
    installationDate: "",
    open: false,
  };

  componentDidMount = () => {
    if (this.props.reduxState.device.name !== "") {
      this.setState({
        ...this.state,
        chargerName: this.props.reduxState.device.name,
        installationDate: this.props.reduxState.device.date,
      });
    }
  };

  chooseDeviceImage = () => {
    let deviceImage;
    switch (this.props.reduxState.device.type.id) {
      case 1:
        deviceImage = wallMount;
        break;
      case 2:
        deviceImage = singleHead;
        break;
      case 3:
        deviceImage = dualHead;
        break;
      case 4:
        deviceImage = zefNetPro;
        break;
      default:
        deviceImage = dualHead;
    }
    return deviceImage;
  };

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  handleNext = () => {
    if (this.state.chargerName && this.state.installationDate !== "") {
      this.props.dispatch({
        type: "SET_NAME",
        payload: this.state.chargerName,
      });
      this.props.dispatch({
        type: "SET_DATE",
        payload: this.state.installationDate,
      });

      this.props.history.push("/deviceReview");
    } else {
      this.setState({ ...this.state, open: true });
    }
  };

  handlePrevious = () => {
    this.props.history.push("/deviceSerial");
  };

  handleClose = () => {
    this.setState({ ...this.state, open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid item xs={12} style={{ maxWidth: "1000px" }} align="center">
        {/* Dialog runs if clicked review Device without name and date filled */}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="missing-info"
          aria-describedby="device-name-and-date-required"
        >
          <DialogContent>
            <DialogContentText id="device-name-and-date-required">
              Oops! Please enter both a name and installation date for your
              device
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Paper className={classes.paper} elevation={3}>
          <div className={classes.borderedBox}>
            <div>
              <img
                src={this.chooseDeviceImage()}
                className={classes.image}
                alt={this.props.reduxState.device.type.name}
              />
              {/* Image changes based on device type */}
            </div>

            <div>
              <div>
                <h1 className={classes.centerFont}>Name your Device</h1>
              </div>
              <div>
                <h3 className={classes.centerFont}>
                  Good names should be short, memorable, and descriptive.
                </h3>
              </div>
            </div>
          </div>
          <form className={classes.form}>
            <div>
              <TextField
                required
                style={{ margin: "25px auto 0px auto" }}
                className={classes.textField}
                label="Charger Name:"
                margin="normal"
                variant="filled"
                value={this.state.chargerName || ""}
                onChange={this.handleInputChangeFor("chargerName")}
                inputProps={{maxLength: 100}}
              />
            </div>

            <div>
              <TextField
                required
                type="Date"
                style={{ margin: "10px auto 0px auto" }}
                className={classes.textField}
                margin="normal"
                variant="filled"
                value={this.state.installationDate || ""}
                onChange={this.handleInputChangeFor("installationDate")}
                label = 'Installation Date'
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className={classes.buttonDiv}>
              <DynamicButton
                type="previous"
                text="Previous"
                linkURL="/deviceSerial"
              />
              {/* conditionally render active button if name and date fields filled */}
              {this.state.chargerName && this.state.installationDate ? 
                <DynamicButton
                  key={"name-enabled-next"}
                  type="review"
                  text="Review Device"
                  handleClick={this.handleNext}
                />
              : 
                <DynamicButton
                  key={"name-disabled-next"}
                  type="review"
                  text="Review Device"
                  isDisabled={true}
                />
              }
            </div>
          </form>
        </Paper>
      </Grid>
    );
  }
}

//map readux state to this.props.reduxState
const mapStateToProps = (reduxState) => ({
  reduxState,
});

DeviceName.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps)(DeviceName));
