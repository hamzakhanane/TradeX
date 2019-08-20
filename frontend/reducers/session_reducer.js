import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER, UPDATE_USER} from '../actions/sessions_actions';

const preloadState = {
    id: null,
};

export const sessionReducer = (state = preloadState, action) => {
    Object.freeze(state);

    
    switch (action.type) {

        case UPDATE_USER:
            return Object.assign({}, state, action.currentUser)

        case RECEIVE_CURRENT_USER:
            return Object.assign({}, state, action.currentUser)

        case LOGOUT_CURRENT_USER:
            return preloadState;

        default:
            return state;
    }
}