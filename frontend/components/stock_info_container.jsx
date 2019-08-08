import React from "react";
import { connect } from "react-redux";
import {fetchStockInfo,fetchStock} from "../actions/stock_info_actions";
import StockInfo from "../components/stock_info"; 
import { logout } from "../actions/sessions_actions";



const mapStateToProps = (state, ownProps)=>{
   
    const stockId = ownProps.match.params.stockId;
    const stocks = state.entities.stocks
    let user = state.entities.users[state.session.id];
   
    return({
        stock: stocks[stockId],
        currentUser: user
    });
}

const mapDispatchToProps = (dispatch)=>{
    return({
        fetchStockInfo: (ticker)=>dispatch(fetchStockInfo(ticker)),
        fetchStock: (id) => dispatch(fetchStock(id)),
        logout: () => dispatch(logout())

    });
}

export const StockInfoContainer = connect(mapStateToProps,mapDispatchToProps)(StockInfo);

