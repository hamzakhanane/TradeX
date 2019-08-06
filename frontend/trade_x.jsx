import React from 'react';
import ReactDOM from 'react-dom';
import {login,signup,logout} from "./actions/sessions_actions";
import configureStore from "./store/store";
import Root from './components/root';
import {fetchStockInfo,fetchAllStocks} from "./actions/stock_info_actions"
import {fetchInfo,fetchCharts} from "./util/stock_info_api_util"
document.addEventListener('DOMContentLoaded', () => {
    // const store = configureStore();
    let store;
    if (window.currentUser) {
        const preloadedState = {
            entities: {
                users: { [window.currentUser.id]: window.currentUser }
            },
            session: { id: window.currentUser.id }
        };
        store = configureStore(preloadedState);
        delete window.currentUser;
    } else {
        store = configureStore();
    }
    const root = document.getElementById('root');
    ReactDOM.render(<Root store={store} />, root);
    window.getState = store.getState;
    window.dispatch = store.dispatch;
    window.login = login;
    window.logout = logout;
    window.signup = signup;
    window.fetchStockInfo = fetchStockInfo;
    window.fetchInfo = fetchInfo;
    window.fetchCharts = fetchCharts;
    window.fetchAllStocks = fetchAllStocks;


});