import React from "react";
import { connect } from "react-redux";
import {fetchStockInfo,fetchStock,createTransaction, createPortfolio, receivePort,updatePort, createWatchList, deleteWatchList} from "../actions/stock_info_actions";
import StockInfo from "../components/stock_info"; 
import { logout, update} from "../actions/sessions_actions";



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
        createTransaction: (transaction) => dispatch(createTransaction(transaction)),
        fetchStockInfo: (ticker)=>dispatch(fetchStockInfo(ticker)),
        fetchStock: (id) => dispatch(fetchStock(id)),
        logout: () => dispatch(logout()),
        update: (user) => dispatch(update(user)),
        createPortfolio: (portfolio) => dispatch(createPortfolio(portfolio)),
        receivePortfolio: (portfolio) => dispatch(receivePort(portfolio)),
        updatePortfolio: (portfolio) => dispatch(updatePort(portfolio)),
        createWatchList: (watchlist) => dispatch(createWatchList(watchlist)),
        deleteWatchList: (watchlist) => dispatch(deleteWatchList(watchlist))
        


    });
}

export const StockInfoContainer = connect(mapStateToProps,mapDispatchToProps)(StockInfo);

