import React, { Component } from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { connect } from "react-redux";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import WelcomeScreen from "../WelcomeScreen/WelcomeScreen";
import CreateOrganization from "../Organization/CreateOrganization";
import ViewOrganization from "../Organization/ViewOrganization";
import OrganizationHomeScreen from "../Organization/HomeScreen";
import EditOrganization from "../Organization/EditOrganization";
import HostSelect from "../Device/HostSite/Select";
import DeviceSelectType from "../Device/DeviceSelectType";
import DeviceSerial from "../Device/DeviceSerial";
import DeviceName from "../Device/DeviceName";
import DevicePrep from "../Device/DevicePrep";
import BreakerSelect from "../Device/Breaker/Select";
import {
  CssBaseline,
  MuiThemeProvider,
  createMuiTheme,
  Grid,
} from "@material-ui/core";
import DeviceReview from "../Device/DeviceReview";
import AddUser from "../AddUser/AddUser";
import "./App.css";
import Submit from "../Submit/Submit";
import Completed from "../Submit/Completed";
import 'typeface-inter';

const theme = createMuiTheme({
  typography: {
    fontFamily: 
      '"Inter", sans-serif',
  },
});


class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: "FETCH_USER" });
    
  }


  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <CssBaseline />
          <Grid
            container
            justify="center"
            alignItems="center"
            className="background"
          >
            <div>
              <Switch>
                {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
                <Redirect exact from="/" to="/home" />
                <ProtectedRoute exact path="/home" component={WelcomeScreen} />

                <ProtectedRoute
                  exact
                  path="/organizationHome"
                  component={OrganizationHomeScreen}
                />
                <ProtectedRoute
                  exact
                  path="/createOrganization"
                  component={CreateOrganization}
                />
                <ProtectedRoute exact path="/home" component={WelcomeScreen} />
                <ProtectedRoute
                  exact
                  path="/hostSelect"
                  component={HostSelect}
                />
                <ProtectedRoute
                  exact
                  path="/editOrganization"
                  component={EditOrganization}
                />

                <ProtectedRoute
                  exact
                  path="/viewOrganization"
                  component={ViewOrganization}
                />

                <ProtectedRoute
                  exact
                  path="/devicePrep"
                  component={DevicePrep}
                />

                <ProtectedRoute
                  exact
                  path="/deviceType"
                  component={DeviceSelectType}
                />

                <ProtectedRoute
                  exact
                  path="/deviceSerial"
                  component={DeviceSerial}
                />

                <ProtectedRoute
                  exact
                  path="/deviceName"
                  component={DeviceName}
                />

                <ProtectedRoute
                  exact
                  path="/breakerSelect"
                  component={BreakerSelect}
                />

                <ProtectedRoute
                  exact
                  path="/deviceReview"
                  component={DeviceReview}
                />

                <ProtectedRoute exact path="/addUser" component={AddUser} />

                <ProtectedRoute exact path="/submit" component={Submit} />
                <ProtectedRoute exact path="/completed" component={Completed} />

                {/* If none of the other routes matched, we will show a 404. */}
                <Route render={() => <h1>404</h1>} />
              </Switch>
            </div>
          </Grid>
        </Router>
      </MuiThemeProvider>
    );
  }
}
const mapStateToProps = (reduxState) => ({
  reduxState,
});

export default connect(mapStateToProps)(App);
