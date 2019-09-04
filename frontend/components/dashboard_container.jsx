import React from "react";
import DashBoard from "./dashboard";
import {connect} from "react-redux";
import {logout} from "../actions/sessions_actions";
import {receivePort,fetchStock, receiveAllWatchLists, createWatchList, GetTransactions,GetRecords,CreateRecord} from "../actions/stock_info_actions";


const mapStateToProps = ({ session, entities: { users } }) => {
    
    return {
        currentUser: users[session.id]
    };
};

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    receivePortfolio: (currentUser) => dispatch(receivePort(currentUser)),
    fetchStock: (id) => dispatch(fetchStock(id)),
    receiveAllWatchLists: (currentUser) => dispatch(receiveAllWatchLists(currentUser)),
    getTransactions: (userId) => dispatch(GetTransactions(userId)),
    getRecords: (userId) => dispatch(GetRecords(userId)),
    createRecord: (payload) => dispatch(CreateRecord(payload))
})


export const DashBoardContainer =  connect(
    mapStateToProps,
    mapDispatchToProps
)(DashBoard);