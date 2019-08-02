import React from 'react';
import ReactDOM from 'react-dom';
import {login,signup,logout} from "./actions/sessions_actions";
import configureStore from "./store/store";
import Root from './components/root';
import {fetchStockInfo} from "./actions/stock_info_actions"
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


});