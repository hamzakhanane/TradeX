import SessionForm from "./session_form";
import { signup, clearErrors } from "../actions/sessions_actions";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    // debugger
    return ({
        errors: state.errors.session,
        formType: "signup",

        // errors: ["cannot signup"]

    })
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return ({
        processForm: (user) => dispatch(signup(user)),
        clearErrors: () => dispatch(clearErrors())

    })
}

export const SignupFormContainer = connect(mapStateToProps, mapDispatchToProps)(SessionForm);