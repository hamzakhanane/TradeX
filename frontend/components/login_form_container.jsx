import SessionForm from "./session_form";
import { login, clearErrors } from "../actions/sessions_actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state, ownProp) => {
    return ({
        formType: "login",
        errors: state.errors.session,

    })
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return ({
        processForm: (user) => dispatch(login(user)),
        clearErrors: () => dispatch(clearErrors())

    })
}

export const LoginFormContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(SessionForm));
