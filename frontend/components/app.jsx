import React from 'react';
import {SplashContainer} from "./splash_container"
import {Route, Switch} from "react-router-dom";
import {LoginFormContainer} from "./login_form_container";
import {SignupFormContainer} from "./signup_form_container";
import {AuthRoute} from "../util/route_util"


const App = () => (
    <div>
        <Switch>
        <AuthRoute path="/login" component={LoginFormContainer} />
        <AuthRoute path="/signup" component={SignupFormContainer} />
        <Route path="/" component={SplashContainer} />
        </Switch>
    </div>
);

export default App;