import {RECEIVE_STOCK_INFO, RECEIVE_STOCK,RECEIVE_ALL_STOCKS} from "../actions/stock_info_actions"



export const StockInfoReducer = (state = {}, action) => {
    Object.freeze(state);
    
    switch (action.type) {

        case RECEIVE_ALL_STOCKS:
            return action.stocks;
        case RECEIVE_STOCK_INFO:
            return Object.assign({}, state, { [1]: action.info })
        case RECEIVE_STOCK:
            return Object.assign({},state,{[action.stock.id]:action.stock})
        default:
            
            return state;
    }
}