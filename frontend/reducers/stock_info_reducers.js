import {RECEIVE_STOCK_INFO, RECEIVE_STOCK,RECEIVE_ALL_STOCKS, CREATE_TRANSACTION, CREATE_PORTFOLIO,GET_PORTFOLIO,GET_WATCHLIST} from "../actions/stock_info_actions"



export const StockInfoReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        
        case RECEIVE_ALL_STOCKS:
            return action.stocks;
        case RECEIVE_STOCK_INFO:
            return Object.assign({}, state, { [1]: action.info })
        case RECEIVE_STOCK:
            return Object.assign({},state,{[action.stock.id]:action.stock})
        case GET_WATCHLIST:
            return Object.assign({},state,{["watchlist"]:action.watchlist})
       
        case GET_PORTFOLIO:
            return Object.assign({},state,{["portfolio"]:action.portfolio})
        default:
            return state;
    }
}