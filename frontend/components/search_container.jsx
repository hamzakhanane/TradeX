import Search from "./search";
import {connect} from "react-redux";
import {fetchAllStocks} from "../actions/stock_info_actions";

const mapStateToProps = (state,ownProps) =>{
    const stockName = ownProps.match.params.stockName;
    return({
       

    });
}

const mapDispatchToProps = (dispatch) =>{
    return({

    });
}