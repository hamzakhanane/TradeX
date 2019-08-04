import React from "react";
import { connect } from "react-redux";
import {fetchStockInfo,fetchStock} from "../actions/stock_info_actions";
import StockInfo from "../components/stock_info"; 


const mapStateToProps = (state,ownProps)=>{
   
    const stockId = ownProps.match.params.stockId;
    const stocks = state.entities.stocks
    return({
        stock: stocks[stockId],
    });
}

const mapDispatchToProps = (dispatch)=>{
    return({
        fetchStockInfo: (ticker)=>dispatch(fetchStockInfo(ticker)),
        fetchStock: (id) => dispatch(fetchStock(id))

    });
}

export const StockInfoContainer = connect(mapStateToProps,mapDispatchToProps)(StockInfo);