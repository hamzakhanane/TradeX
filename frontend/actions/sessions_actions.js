export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";
export const UPDATE_USER = "UPDATE_USER";
import * as SessionApiUtil from "../util/session_api_util";


const receiveCurrentUser = (currentUser) => {
    return {
        type: RECEIVE_CURRENT_USER,
        currentUser
    }
}

const updateUser = (currentUser) =>{
    return{
        type: UPDATE_USER,
        currentUser
    }
}

const logoutCurrentUser = () => {
    return {
        type: LOGOUT_CURRENT_USER,
    }
}

const receiveErrors = (errors) => {
    return {
        type: RECEIVE_ERRORS,
        errors
    }
}

export const clearErrors = ()=>{
    return{
        type: CLEAR_ERRORS
    }
}



export const update = currentUser => dispatch =>(
    SessionApiUtil.updateUser(currentUser).then(user=>(
        dispatch(updateUser(user))
    ))
);
export const login = currentUser => dispatch => (
    SessionApiUtil.login(currentUser).then(user => (
        dispatch(receiveCurrentUser(user))
    ), err => (
        dispatch(receiveErrors(err.responseJSON))
    ))
);



export const signup = currentUser => dispatch => (
    SessionApiUtil.signup(currentUser).then(user => (
        dispatch(receiveCurrentUser(user))
    ), err => (
        dispatch(receiveErrors(err.responseJSON))
    ))
);


export const logout = () => {
    return dispatch => {
        return SessionApiUtil.logout().then(() => {
            return dispatch(logoutCurrentUser());
        });
    };
};