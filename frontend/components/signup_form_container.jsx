import SessionForm from "./session_form";
import { signup } from "../actions/sessions_actions";
import { connect } from "react-redux";

const mapStateToProps = (state, ownProp) => {
    return ({
        formType: "signup",
        errors: ["cannot signup"]

    })
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return ({
        processForm: (user) => dispatch(signup(user))

    })
}

export const SignupFormContainer = connect(mapStateToProps, mapDispatchToProps)(SessionForm);