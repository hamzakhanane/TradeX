import Search from "./search";
import {connect} from "react-redux";
import {fetchAllStocks} from "../actions/stock_info_actions";
import SearchComponent from "./search";

const mapStateToProps = (state,ownProps) =>{
   
    const stocks = state.entities.stocks
    return({
        stocks: stocks
    })
   
}

const mapDispatchToProps = (dispatch) =>{
    return({
        fetchAllStocks: (query) => dispatch(fetchAllStocks(query))
    });
}

export const SearchContainer = connect(mapStateToProps,mapDispatchToProps)(SearchComponent);