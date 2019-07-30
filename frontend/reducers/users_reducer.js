import { RECEIVE_CURRENT_USER } from '../actions/sessions_actions'
import { merge } from 'lodash'

export const usersReducer = function (state = {}, action) {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return merge({}, state, { [action.currentUser.id]: action.currentUser });

        default:
            return state;
    }
};