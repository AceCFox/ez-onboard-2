import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Paper, withStyles, TextField, Button } from "@material-ui/core";
import {ChevronLeft, EvStation} from '@material-ui/icons';
import PropTypes from "prop-types";
import zefNetPro from './Images/zefpro.png';
import wallMount from './Images/wallMountStylized.jpg';
import singleHead from './Images/singleHeadStylized.jpg';
import dualHead from './Images/dualHeadStylized.jpg';
import { Link } from "react-router-dom";
import DynamicButton from '../Buttons/DynamicButton';

const styles = (theme) => ({
  paper: {
    padding: theme.spacing(2),
    borderRadius: "5px",
  },
  reviewButton: { 
    width: "162px" 
  },
  borderedBox: {
    border: "solid #e3e3e3 3px",
    maxWidth: "515px",
    height: "150px",
    display: "flex",
    borderRadius: '5px'
  },
  image: {
    maxHeight: "145px",
    maxWidth: "145px",
  },
  centerFont: {
    paddingLeft: "15px",
    textAlign: "center",
    color: "black",
    fontFamily: "Crimson Text, Open Sans, sans-serif",
    maxWidth: "inherit",
  },
  form:{
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
    fontFamily: "Crimson Text, Open Sans, sans-serif",
    width: "400px",
  }
});

class DeviceName extends Component {
  state = {
    chargerName: "",
    installationDate: "",
  };

  componentDidMount = ()=> {
    if( this.props.reduxState.device.name !== '' ){
        this.setState({
            ...this.state,
            chargerName: this.props.reduxState.device.name,
            installationDate: this.props.reduxState.device.date,
        })
    }
  } 

  chooseDeviceImage = ()=>{
    let deviceImage;
    switch(this.props.reduxState.device.type.id){
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
  }

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

      this.props.history.push("/deviceReview"); //change this
    } else {
      alert("Oops! Please enter both a name and installation date for your device");
    }
  };

  handlePrevious = () => {
    this.props.history.push("/deviceSerial");
  };

  render() {
    const { classes } = this.props;
    return (
        <Grid item xs={12} style={{ maxWidth: "1000px" }} align="center">
          <Paper className={classes.paper} elevation={3}>
            <div className={classes.borderedBox}>
              
              <div>
                <img
                  src={this.chooseDeviceImage()}
                  className={classes.image}
                  alt = {this.props.reduxState.device.type.name}
                />
                {/* Image should be changed */}
              </div>

              <div>
                <div>
                  <h1 className={classes.centerFont}>Name your Device</h1>
                </div>
                <div>
                  <h3 className={classes.centerFont}>Good names should be short and memorable and descriptive..</h3>
                </div>
              </div>
            </div>
            <form
            className={classes.form}
            >
              <div>
                <TextField
                  required
                  style={{margin:'25px auto 0px auto'}}
                  className={classes.textField}
                  label="Charger Name:"
                  margin="normal"
                  variant="outlined"
                  value={this.state.chargerName || "" }
                  onChange={this.handleInputChangeFor("chargerName")}
                />
              </div>
              <div>
                <TextField
                  required
                  type="Date"
                  style={{margin:'10px auto 0px auto' }}
                  className={classes.textField}
                  label=""
                  margin="normal"
                  variant="outlined"
                  value={this.state.installationDate || ""}
                  onChange={this.handleInputChangeFor("installationDate")}
                />
              </div>
              <div className={classes.buttonDiv}>
                <DynamicButton type='previous' text='Previous' linkURL='/deviceSerial'/>
                
                {this.state.chargerName && this.state.installationDate ?
                    <DynamicButton key={'name-enabled-next'} type='review' text='Review Device' handleClick={this.handleNext}/>
                        :
                    <DynamicButton key={'name-disabled-next'} type='review' text='Review Device' isDisabled={true}/>
                  }
              </div>
            </form>
          </Paper>
        </Grid>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  reduxState,
});

DeviceName.propTypes = {
  classes: PropTypes.object.isRequired,
};

// this allows us to use <App /> in index.js
export default withStyles(styles)(connect(mapStateToProps)(DeviceName));
