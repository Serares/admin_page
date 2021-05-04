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
import { ApartmentProvider } from '../store/apartmentStore';
import { HouseProvider } from '../store/houseStore';
import { LandProvider } from '../store/landStore';
//containers, components
import Dashboard from "../containers/dashboard/dashboard";
import SubmitedProperties from '../containers/submitedProperties/submitedProperties';
import AdminProperties from '../containers/getAdminProperties/getAdminProperties';
import MainLayout from "../MainLayout/mainLayout";
import SnackBar from "../components/SnackBar/SnackBar";
import Login from "../containers/auth/login/login";
import Signup from "../containers/auth/signup/signup";
import SingleSubmitedProperty from '../containers/singleSubmitedProperty/singleSubmitedProperty';
import SingleAdminProperty from '../containers/singleAdminProperty/singleAdminProperty';
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
        component={() => { return <ApartmentProvider isModify={false}><SingleAdminProperty propertyType={EPropertyTypes.APARTMENT} /></ApartmentProvider> }}
      />
      <Route
        path="/dashboard/addHouse"
        exact
        component={() => { return <HouseProvider isModify={false}><SingleAdminProperty propertyType={EPropertyTypes.HOUSE} /></HouseProvider> }}
      />
      <Route
        path="/dashboard/addLand"
        exact
        component={() => { return <LandProvider isModify={false}><SingleAdminProperty propertyType={EPropertyTypes.LANDANDCOMMERCIAL} /></LandProvider> }}
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

  const viewAdminPropertiesRoutes = [
    <Route
      path="/dashboard/properties"
      exact
      component={AdminProperties}
    />,
    <Route
      path="/dashboard/properties/apartment/:shortId"
      exact
      component={() => { return <ApartmentProvider isModify={true}><SingleAdminProperty propertyType={EPropertyTypes.APARTMENT} /></ApartmentProvider> }}
    />,
    <Route
      path="/dashboard/properties/house/:shortId"
      exact
      component={() => { return <HouseProvider isModify={true}><SingleAdminProperty propertyType={EPropertyTypes.HOUSE} /></HouseProvider> }}
    />,
    <Route
      path="/dashboard/properties/land/:shortId"
      exact
      component={() => { return <LandProvider isModify={true}><SingleAdminProperty propertyType={EPropertyTypes.LANDANDCOMMERCIAL} /></LandProvider> }}
    />,
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
                if (isTokenValid()) {
                  return (
                    <Switch>
                      <Dashboard>
                        {submitedPropertiesRoutes}
                        {addPropertiesRoutes}
                        {viewAdminPropertiesRoutes}
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
