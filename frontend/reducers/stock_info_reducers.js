import {RECEIVE_STOCK_INFO} from "../actions/stock_info_actions"



export const StockInfoReducer = (state = {}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_STOCK_INFO:
            return Object.assign({}, state, { [action.info.id]: action.info })
        default:
            return state;
    }
}