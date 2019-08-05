import React from "react";
import DashBoard from "./dashboard";
import {connect} from "react-redux";
import {logout} from "../actions/sessions_actions";

const mapStateToProps = ({ session, entities: { users } }) => {
    debugger
    return {
        currentUser: users[session.id]
    };
};

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
});


export const DashBoardContainer =  connect(
    mapStateToProps,
    mapDispatchToProps
)(DashBoard);