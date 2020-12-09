import React, {Component} from 'react';
import {Button, withStyles} from '@material-ui/core';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {ChevronLeft, ChevronRight, SaveAltTwoTone, Home as HomeIcon, EditTwoTone as EditIcon, EvStationTwoTone, SaveTwoTone, AddBoxTwoTone, CheckBoxTwoTone} from '@material-ui/icons';

/*
    DynamicButton API
        |NAME|          |TYPE|            |DEFAULT|    |DESCRIPTION|
        text            string                          will be the text inside of the button
        type            'glow'                          Sets styling type and icon of button
                        | 'home'
                        | 'home-glow'                   A glow button with home icon
                        | 'previous'
                        | 'next'
                        | 'edit'
                        | 'edit-glow'                   A glow button with edit icon
                        | 'save'
                        | 'review'
                        | 'organization'
                        | 'add'
                        | 'confirm'
        isDisabled      boolean             false       toggles the disabled attribute
        handleClick     function()                      passed in as onClick function
        linkURL         '/string'                       will add component={Link} and set $string as to='/$string'
*/

const styles = {
    Button:{
        transition: 'transform .2s ease-in-out',
        height: '36px',
        '&:hover': {
            transform: 'scale(1.03)',
        }
    },
    'Button--glow':{
        color: '#006dcc',
        backgroundColor: '#f1f1f1',
        '&:hover':{
          color: '#006dcc',
          backgroundColor: 'white', 
          boxShadow: '0 0 5px #c8ffff,-5px 0 10px #66fbfb, 5px 0 15px #049494'
        }
    },
    'Button--dark':{
        color: 'white',
        backgroundColor: '#1c2447',
        fontSize: '12px',
        borderRadius: '5px',
        position: 'absolute',
        right: '0px',
        '&:hover': {
            backgroundColor: '#243953',
        }
      },

      'Button--dark2':{
        color: 'white',
        backgroundColor: '#1c2447',
        fontSize: '12px',
        borderRadius: '5px',
        position: 'absolute',
        left: '0px',
        '&:hover': {
            backgroundColor: '#243953',
        }
      },

    'Button--editIconTransparent':{
        padding: '0px 6px',
        background: 'transparent',
        border: '1px solid grey',
    },
    'Button--previousIcon':{
        paddingLeft: '8px',
    }, 
    'Button--editIconGlow':{
        padding: '0px 6px',
        color: '#006dcc',
        backgroundColor: '#f1f1f1',
        '&:hover':{
          color: '#006dcc',
          backgroundColor: 'white', 
          boxShadow: '0 0 5px #c8ffff,-5px 0 10px #66fbfb, 5px 0 15px #049494'
        }
    },
    'Button--homeIcon':{
        paddingLeft: '8px',
    },
    'Button--homeIconGlow':{
        paddingLeft: '8px',
        color: '#006dcc',
        backgroundColor: '#f1f1f1',
        '&:hover':{
          color: '#006dcc',
          backgroundColor: 'white', 
          boxShadow: '0 0 5px #c8ffff,-5px 0 10px #66fbfb, 5px 0 15px #049494'
        }
    },
    'Button--primary':{
        paddingRight: "8px",
        backgroundColor: "#3f51b5",
        color: "white",
        '&:hover': {
            backgroundColor: '#757de8',
        }
    },
    'Button--primary--basic':{
        backgroundColor: "#3f51b5",
        color: "white",
        '&:hover': {
            backgroundColor: '#757de8',
        }
    },
    'Button--outlined':{
        color:'white',
        border: '1px solid white',
        backgroundColor: 'transparent',
        height: '40px',
        '&:hover': {
            backgroundColor: 'white',
            color: 'black',
        }
    },
    'Button--outlined--large':{
        fontSize: '26px',
        paddingBottom: '6px',
        '&:hover': {
            transform: 'scale(1.02)',
        }
    },
    'Button__textContainer':{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center'
    },

}

class DynamicButton extends Component{
    state = {
        inputProps: {},
        startIcon: '',
        endIcon: ''
    }
    componentDidMount(){
        //this object will hold input attributes from this.props for DynamicButton
        const inputProps = {onClick: this.props.handleClick, disabled: this.props.isDisabled};

        //add properties to inputProps depending on this.props.type
        switch(this.props.type){
            case 'edit':
                inputProps.variant = 'outlined'
                inputProps.size='small'
                break;
            case 'logOut':
                inputProps.variant = 'outlined'
                inputProps.size='medium'
                break;
            case 'organization':
                inputProps.variant = 'outlined'
                inputProps.size='medium'
                break;
            default:
                inputProps.variant='contained'
                inputProps.size='medium'
        }
    
        //add properties to inputProps depending on truthy/falsy this.props.linkURL
        if(this.props.linkURL){
            inputProps.component = Link
            inputProps.to= this.props.linkURL
        }
        
        //set starting values of icons to React Fragment
        let startIcon = <></>;
        let endIcon = <></>;

        //update values of icon depending on this.props.type
        switch(this.props.type){
            case 'add':
                startIcon = <AddBoxTwoTone/>;
                break;
            case 'confirm':
                startIcon = <CheckBoxTwoTone/>
                break;
            case 'previous':
                startIcon = <ChevronLeft/>;
                break;
            case 'next':
                endIcon = <ChevronRight/>;
                break;
            case 'review':
                endIcon = <EvStationTwoTone/>;
                break;
            case 'save':
                endIcon = <SaveTwoTone/>
                break;
            case 'edit':
            case 'edit-glow':
                startIcon = <EditIcon/>;
                break;
            case 'home':
            case 'home-glow':
                startIcon = <HomeIcon/>;
                break;
            case 'submit':
                startIcon = <SaveAltTwoTone/>;
                break;
            default:
                break;
        }

        //set input attribute object and icon values as state values
        this.setState({
            ...this.state,
            startIcon,
            endIcon,
            inputProps
        })
    }
    render(){
        const {classes} = this.props;

        //conditionally add classes and bundle classes together, from type prop value
        //this uses the classnames dependency: https://www.npmjs.com/package/classnames
        const buttonClasses = classNames(
            classes.Button, 
            {[classes['Button--glow']]: (this.props.type === 'glow')},
            {[classes['Button--dark']]: (this.props.type === 'dark')},
            {[classes['Button--dark2']]: (this.props.type === 'dark2')},
            {[classes['Button--previousIcon']]: (this.props.type === 'previous')},
            {[classes['Button--primary--basic']]: (this.props.type === 'add')},
            {[classes['Button--primary--basic']]: (this.props.type === 'confirm')},
            {[classes['Button--primary']]: (this.props.type === 'next')},
            {[classes['Button--primary']]: (this.props.type === 'review')},
            {[classes['Button--primary']]: (this.props.type === 'save')},
            {[classes['Button--primary']]: (this.props.type === 'submit')},
            {[classes['Button--outlined']]: (this.props.type === 'logOut')},
            {[classes['Button--homeIcon']]: (this.props.type === 'home')},
            {[classes['Button--homeIconGlow']]: (this.props.type === 'home-glow')},
            {[classes['Button--editIconTransparent']]: (this.props.type === 'edit')},
            {[classes['Button--editIconGlow']]: (this.props.type === 'edit-glow')},
            {[classes['Button--outlined']]: (this.props.type === 'organization')},
            {[classes['Button--outlined--large']]: (this.props.type === 'organization')},
            );
        return(
            <>
                {/*Spread conditional attributes from state*/}
                <Button className={buttonClasses} {...this.state.inputProps}>
                    <span className={classes.Button__textContainer}>
                        {/*Render held icon values, before/after props text*/}
                        {this.state.startIcon}
                        {this.props.text}
                        {this.state.endIcon}
                    </span>
                </Button>
            </>
        )
    }
}

DynamicButton.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DynamicButton);