import React from 'react';
import {SplashContainer} from "./splash_container"
import {Route, Switch} from "react-router-dom";
import {LoginFormContainer} from "./login_form_container";
import {SignupFormContainer} from "./signup_form_container";
import {AuthRoute} from "../util/route_util"
import {StockInfoContainer} from "../components/stock_info_container";


const App = () => (
    <div>
        <Switch>
        <AuthRoute path="/login" component={LoginFormContainer} />
        <AuthRoute path="/signup" component={SignupFormContainer} />
        <AuthRoute path="/stock/:stockId" component={StockInfoContainer} />

        <Route path="/" component={SplashContainer} />
        </Switch>
    </div>
);

export default App;