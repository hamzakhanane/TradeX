import React from "react";
import { connect } from "react-redux";
import {fetchStockInfo} from "../actions/stock_info_actions";
import StockInfo from "../components/stock_info"; 


const mapStateToProps = (state,ownProps)=>{
    // debugger
    const stock = state.entities.stocks[ownProps.stockId]
    return({
        stock
    });
}

const mapDispatchToProps = (dispatch)=>{
    return({
        fetchStockInfo: (ticker)=>dispatch(fetchStockInfo(ticker))

    });
}

export const StockInfoContainer = connect(mapStateToProps,mapDispatchToProps)(StockInfo);