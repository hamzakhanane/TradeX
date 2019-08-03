import { combineReducers } from 'redux';
import { usersReducer } from './users_reducer';
import {StockInfoReducer} from "./stock_info_reducers"

export const entitiesReducer = combineReducers({
    users: usersReducer,
    stocks : StockInfoReducer
});