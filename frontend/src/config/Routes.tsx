import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
//stores
import { SubmitedPropertiesProvider } from '../store/submitedProperties';
import { GlobalProvider } from '../store/globalStore';
import { AuthenticationProvider } from '../store/authenticationStore';
//containers, components
import Dashboard from "../containers/dashboard/dashboard";
import SubmitedProperties from '../containers/submitedProperties/submitedProperties';

import MainLayout from "../MainLayout/mainLayout";
import SnackBar from "../components/SnackBar/SnackBar";
import Login from "../containers/auth/login/login";
import Signup from "../containers/auth/signup/signup";
import SingleSubmitedProperty from '../containers/singleSubmitedProperty/singleSubmitedProperty';
import AddProperties from '../containers/addProperties/addProperties';
import { isTokenValid } from '../utils/tokenActions';
import { EPropertyTypes } from "../interfaces/EPropertyTypes";
export default function Routes() {

  useEffect(() => {
  }, [])

  const addPropertiesRoutes = (
    <React.Fragment>
      <Route
        path="/dashboard/addApartment"
        exact
        component={() => { return <AddProperties isModify={false} propertyType={EPropertyTypes.APARTMENT} /> }}
      />
      <Route
        path="/dashboard/addHouse"
        exact
        component={() => { return <AddProperties isModify={false} propertyType={EPropertyTypes.HOUSE} /> }}
      />
      <Route
        path="/dashboard/addLand"
        exact
        component={() => { return <AddProperties isModify={false} propertyType={EPropertyTypes.LANDANDCOMMERCIAL} /> }}
      />
    </React.Fragment>
  );

  const submitedPropertiesRoutes = (
    <React.Fragment>
      <SubmitedPropertiesProvider>
        <Route
          path="/dashboard/submitedProperties"
          exact
          component={SubmitedProperties}
        />
        <Route
          path="/dashboard/submitedProperties/:shortId"
          exact
          component={SingleSubmitedProperty}
        />
      </SubmitedPropertiesProvider>
    </React.Fragment>
  );

  const authRouts = [
    <Route key="/" path="/" exact component={Login} />,
    <Route key="login" path="/login" exact component={() => { return <AuthenticationProvider><Login /></AuthenticationProvider> }} />,
    <Route key="signup" path="/signup" exact component={() => { return <AuthenticationProvider><Signup /></AuthenticationProvider> }} />
  ];

  return (
    <Router>
      <MainLayout>
        <GlobalProvider>
          <Switch>
            {authRouts}
            <Route
              path="/dashboard"
              exact={false}
              component={() => {
                //TODO remove '!'
                if (!isTokenValid()) {
                  return (
                    <Switch>
                      <Dashboard>
                        {submitedPropertiesRoutes}
                        {addPropertiesRoutes}
                      </Dashboard>
                    </Switch>
                  );
                }
                return <Redirect to="/login" />;
              }}
            />
          </Switch>
        </GlobalProvider>
        <SnackBar />
      </MainLayout>
    </Router>
  );
}
