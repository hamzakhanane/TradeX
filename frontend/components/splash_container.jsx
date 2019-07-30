import React from "react";
import Splash from "./splash";
import { connect } from "react-redux";
import { login, signup, logout } from "../actions/sessions_actions";



const mapStateToProps = (state) => {
    let user = state.entities.users[state.session.id];
    return ({
        user: user,

    })

}

const mapDispatchToProps = (dispatch) => {
    return ({
        logout: () => dispatch(logout()),
        login: (currentUser) => dispatch(login(currentUser)),
        signup: (currentUser) => dispatch(signup(currentUser))


    })
}

export const SplashContainer = connect(mapStateToProps, mapDispatchToProps)(Splash);