import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Grid, Paper, withStyles, Dialog, DialogActions, DialogContent, DialogContentText, Button} from '@material-ui/core';
import PropTypes from 'prop-types';
import DynamicButton from '../Buttons/DynamicButton';

const styles = theme => ({ 
  Paper:{
    padding: theme.spacing(2),
    borderRadius: '5px',
  },
  Left:{
    width: '75px'
  },
  ButtonContainer:{
    marginTop: '1rem',
    position: 'relative',
    minWidth: '95%'
  },
  Titles: {
    fontWeight: 800,
  },
  Information: {
    fontWeight: 300,
    display: 'inline-block',
    wordBreak: 'break-word'
  },
  InformationMarginBottom: {
    fontWeight: 300,
    marginBottom: '5px'
  },
  FlexContainerColumn: {
    display: 'flex',
    flexDirection: 'column', 
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'left',
    width: '350px',
    padding: '1rem 1.5rem 1rem 0',
  },
  CenterText: {
      textAlign: 'center'
  }
})

class DeviceReview extends Component {
    componentDidMount() {
        this.props.dispatch({ type: "GET_SERIAL_NUMBERS" });
      }

    state =  {
        open: false
    }

    saveDevice = () => {
        const postObject = {
            name: this.props.state.device.name,
            installation_date: this.props.state.device.date,
            serial_number: this.props.state.device.serial.number,
            serial_number2: this.props.state.device.serial2,
            type_id: this.props.state.device.type.id,
            breaker_id:this.props.state.device.breaker.id,
            org_id:this.props.state.organization.id,
            id: this.props.state.device.id,     
        };
        // call saga that posts the new device if required fields filled
        if(postObject.name && postObject.installation_date
            && postObject.serial_number && postObject.type_id 
            && postObject.breaker_id)
        {   
            //post the new device, or update if navigated here from submit page
            if ( postObject.id ) {
                this.props.dispatch({ type: "UPDATE_DEVICE", payload: postObject });
            } else{
                this.props.dispatch({ type: "ADD_DEVICE", payload: postObject });        
            }
            this.props.dispatch({ type: "CLEAR_DEVICE" });
            this.props.history.push("/OrganizationHome");
        } else { this.setState({open: true}) }
    }

    handleClose = () => {
        this.setState({open: false});
      };

    render() {
      const {classes} = this.props;
      return (
          <Grid container direction='row' justify='center' alignContent='center' alignItems='center' >
              {/* Dialog runs if adding/saving device without all required info */}
                <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="missing-information"
                aria-describedby="missing-information-required-for-device"
                >
                    <DialogContent>
                        <DialogContentText id="missing-required-information-use-edit-buttons-to-add">
                            Oops, you have not filled all required fields for this device. 
                            Please click "edit" next to the empty field to go back and add
                            required information before saving this device.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        OK
                    </Button>
                    </DialogActions>
                </Dialog>
            <Paper className = {classes.Paper}>
                <Grid item align='center'>
                    <h1 style={{marginBottom: '20px'}}>Let's make sure all this information is correct!</h1>
                </Grid>

                <Grid item align='center' xs={12}>
                    <Grid container direction = 'row' alignItems = 'center' justify = 'space-between'>
                    <div className = {classes.Left}/>                  
                        <h2>Hosting Location</h2> 
                        <DynamicButton type='edit' text="Edit" linkURL='/hostSelect'/>
                    </Grid>
                </Grid>

                <Grid item xs={12} align='center' style={{backgroundColor: 'lightgrey'}}>
                        <div className={classes.FlexContainerColumn}>
                            <div className={classes.CenterText}>
                                <p className={classes.Titles}>
                                    Address:
                                </p>
                                <p className={classes.Information}>
                                    {this.props.state.device.site.address}
                                </p>
                            </div>
                        </div>                    
                </Grid>
                    
                <Grid item align='center' xs={12}>
                    <h2>Local Contact for Location</h2>
                </Grid>

                <Grid item align='center' xs={12} style={{backgroundColor: 'lightgrey'}}>
                    <div className={classes.FlexContainerColumn}>
                        <div className={classes.CenterText}>
                            <p className={classes.Titles}>
                                First Name:
                            </p>
                            <p className={classes.InformationMarginBottom}>
                                {this.props.state.device.site.first_name}
                            </p>
                            <p className={classes.Titles}>
                                Second Name:
                            </p>
                            <p className={classes.InformationMarginBottom}>
                                {this.props.state.device.site.second_name}
                            </p>
                            <p className={classes.Titles}>
                                Phone Number:
                            </p>
                            <p className={classes.InformationMarginBottom}>
                                {this.props.state.device.site.phone}
                            </p>
                            <p className={classes.Titles}>
                                Email Address:
                            </p>
                            <p className={classes.Information}>
                                {this.props.state.device.site.email}
                            </p>
                        </div>
                    </div> 
                </Grid>
                
                <Grid item align='center' xs={12}>
                    <Grid container direction = 'row' alignItems = 'center' justify = 'space-between'>
                        <div className = {classes.Left}/> 
                        <h2>Breaker Information</h2> 
                        <DynamicButton type='edit' text="Edit" linkURL='/breakerSelect'/>
                    </Grid>
                </Grid>

                <Grid item align='center' xs={12} style={{backgroundColor: 'lightgrey'}}>
                
                <div className={classes.FlexContainerColumn}>
                    <div className={classes.CenterText}>
                        <p className={classes.Titles}>
                            Breaker Name:
                        </p>
                        <p className={classes.InformationMarginBottom}>
                            {this.props.state.device.breaker.name}
                        </p>
                        <p className={classes.Titles}>
                            Breaker Limit:
                        </p>
                        <p  className={classes.InformationMarginBottom}>
                            {this.props.state.device.breaker.limit}
                        </p>
                        <p className={classes.Titles}>
                            Breaker Description:
                        </p>
                        <p className={classes.Information}>
                            {this.props.state.device.breaker.description}
                        </p>
                    </div>
                </div> 
                </Grid>

                <Grid item align='center' xs={12}>
                    <Grid container direction = 'row' alignItems = 'center' justify = 'space-between'>
                        <div className = {classes.Left}/> 
                        <h2>Device Type</h2> 
                        <DynamicButton type='edit' text="Edit" linkURL='/deviceType'/>
                    </Grid>
                </Grid>

                <Grid item align='center' xs={12} style={{backgroundColor: 'lightgrey'}}>
                    <div className={classes.FlexContainerColumn}>
                        <div className={classes.CenterText}>
                            <p className={classes.Titles}>
                                Device Type:
                            </p>
                            <p className={classes.Information}>
                                {this.props.state.device.type.name}
                            </p>
                        </div>
                    </div> 
                </Grid>

                <Grid item align='center' xs={12}>
                    <Grid container direction='row' alignItems='center' justify='space-between'>
                        <div className = {classes.Left}/> 
                        <h2>Device Information</h2> 
                        <DynamicButton type='edit' text="Edit" linkURL='/deviceSerial'/>
                    </Grid>
                </Grid>

                <Grid item align='center' xs={12} style={{backgroundColor: 'lightgrey'}}>
                    <div className={classes.FlexContainerColumn}>
                        <div className={classes.CenterText}>
                            {this.props.state.device.serial2 ?
                                <>
                                    <p className={classes.Titles}>Serial Number One:</p>
                                    <p className={classes.InformationMarginBottom}>{this.props.state.device.serial.number}</p>
                                    <p className={classes.Titles}>Serial Number Two:</p>
                                    <p className={classes.Information}>{this.props.state.device.serial2}</p>
                                </>
                                :
                                <>
                                    <p className={classes.Titles}>Serial Number:</p>
                                    <p className={classes.Information}>{this.props.state.device.serial.number}</p>
                                </>
                            }
                        </div>
                    </div> 
                </Grid>

                <Grid item align='center' xs={12}>
                    <Grid container direction = 'row' alignItems = 'center' justify = 'space-between'>
                        <div className = {classes.Left}/> 
                        <h2>Additional Information</h2> 
                        <DynamicButton type='edit' text="Edit" linkURL='/deviceName'/>
                    </Grid>
                </Grid>

                <Grid item align='center' xs={12} style={{backgroundColor: 'lightgrey'}}>
                    <div className={classes.FlexContainerColumn}>
                        <div className={classes.CenterText}>
                            <p className={classes.Titles}>
                                Charger Name:
                            </p>
                            <p className={classes.InformationMarginBottom}>
                                {this.props.state.device.name}
                            </p>
                            <p className={classes.Titles}>
                                Installation Date:
                            </p>
                            <p className={classes.Information}>
                                {this.props.state.device.date}
                            </p>
                        </div>
                    </div> 
                </Grid>

                <Grid item align='center' className={classes.ButtonContainer}>
                    <div style={{position: 'absolute', float: 'Left'}}>
                        <DynamicButton type='previous' text='Previous' linkURL='/deviceName'/>
                    </div>
                       {this.props.state.device.id?
                       <DynamicButton key = 'savebutton' type='confirm' text='Save Device Changes' handleClick={this.saveDevice}/> 
                       :
                       <DynamicButton key = 'addbutton' type='confirm' text='Add This Device' handleClick={this.saveDevice}/> 
                        }
                </Grid>
            </Paper> 
          </Grid>
      );
    }
  }
  
  DeviceReview.propTypes = {
      classes: PropTypes.object.isRequired,
  };

  const mapStateToProps = state => ({
      state
  })
  
  export default withStyles(styles)(connect(mapStateToProps)(DeviceReview));