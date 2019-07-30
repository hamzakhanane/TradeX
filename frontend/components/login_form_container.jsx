import SessionForm from "./session_form";
import { login } from "../actions/sessions_actions";
import { connect } from "react-redux";

const mapStateToProps = (state, ownProp) => {
    return ({
        formType: "login",
        errors: ["cannot login with invalid credentials"]

    })
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return ({
        processForm: (user) => dispatch(login(user))

    })
}

export const LoginFormContainer = connect(mapStateToProps, mapDispatchToProps)(SessionForm);
