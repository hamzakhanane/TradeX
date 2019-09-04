import * as StockInfoApi from '../util/stock_info_api_util';
import * as PortfolioApi from '../util/portfolio_api_util';
import * as TransactionApi from '../util/transaction_api_util';
import * as WatchListApi from '../util/watchlist_api_util';
import * as RecordApi from '../util/portfolio_record_api_util';

export const RECEIVE_STOCK_INFO = "RECEIVE_STOCK_INFO";
export const RECEIVE_STOCK = "RECEIVE_STOCK";
export const RECEIVE_ALL_STOCKS = "RECEIVE_ALL_STOCKS";
export const CREATE_TRANSACTION = "CREATE_TRANSACTION";
export const CREATE_PORTFOLIO = "CREATE_PORTFOLIO";
export const UPDATE_PORTFOLIO = "UPDATE_PORTFOLIO";
export const GET_PORTFOLIO = "GET_PORTFOLIO";
export const GET_WATCHLIST = "GET_WATCHLIST";
export const CREATE_WATCHLIST = "CREATE_WATCHLIST";
export const DELETE_WATCHLIST = "DELETE_WATCHLIST";
export const GET_ALL_TRANSACTIONS = "GET_ALL_TRANSACTIONS";
export const CREATE_PORTFOLIO_RECORD = "CREATE_PORTFOLIO_RECORD";
export const GET_PORTFOLIO_RECORDS = "GET_PORTFOLIO_RECORDS";



const recieveTransaction = (transaction)=>{
    
    return({
        type: CREATE_TRANSACTION,
        transaction

    })
}

const receiveAllPortfolioRecords = (records)=>{
    return({
        type: GET_PORTFOLIO_RECORDS,
        records
    })
}

const getPortfolioRecord = (record) =>{
    return({
        type: CREATE_PORTFOLIO_RECORD,
        record
    })
}

const receiveAllTransactions = (transaction)=>{
    return({
        type: GET_ALL_TRANSACTIONS,
        transaction
    })

}

const getWatchList = (watchlist) =>{
    
    
    return({
        type: GET_WATCHLIST,
        watchlist
    })
}

const removeWatchList = (watchlist) =>{
    return({
        type: DELETE_WATCHLIST,
        watchlist
    })
}

const receiveWatchList = (watchlist) => {
    return({
        type: CREATE_WATCHLIST,
        watchlist
    })
}

const updatePortfolio = (portfolio)=>{
    return({
        type: UPDATE_PORTFOLIO,
        portfolio
    })
}

const getPortfolio = (portfolio) =>{
    return({
        type: GET_PORTFOLIO,
        portfolio
    })
}

const receivePortfolio = (portfolio) =>{
    return({
        type: CREATE_PORTFOLIO,
        portfolio
    })
}
const receiveAllStocks = (stocks)=>{
    return({
        type: RECEIVE_ALL_STOCKS,
        stocks
    })
}
const receiveStockInfo = (info) => {
    return({
        type: RECEIVE_STOCK_INFO,
        info
    })
}

const receiveStock = (stock)=>{
   
    return({
        type: RECEIVE_STOCK,
        stock
    })
}

export const receiveAllWatchLists = (user) => (dispatch) =>(
    WatchListApi.getWatchList(user).then(watchlist=>(
        dispatch(getWatchList(watchlist))
    ))
)



export const deleteWatchList = watchlist => dispatch => (
    WatchListApi.deleteWatchList(watchlist).then(watchlist => (
        dispatch(removeWatchList(watchlist))
    ))
);

export const createWatchList = (payload) => dispatch =>(
    WatchListApi.createWatchList(payload).then(watchlist=>(
        dispatch(receiveWatchList(watchlist))
    ))
);

export const receivePort = (user) => dispatch =>(
    PortfolioApi.GetPortfolio(user).then(portfolio =>(
        dispatch(getPortfolio(portfolio))
    ))
);


export const createPortfolio = (payload) => dispatch => (
    PortfolioApi.createPortfolio(payload).then(portfolio => (
        dispatch(receivePortfolio(portfolio))
    ))
);

export const updatePort = portfolio => dispatch => (
    PortfolioApi.updatePortfolio(portfolio).then(portfolio => (
        dispatch(updatePortfolio(portfolio))
    ))
);


export const createTransaction = (payload) => dispatch =>(
    StockInfoApi.createTransaction(payload).then(transaction=>(
        dispatch(recieveTransaction(transaction))
    ))
);

export const GetTransactions = (userId) => dispatch =>(
    TransactionApi.GetTransactions(userId).then(transactions=>(
        dispatch(receiveAllTransactions(transactions))
    ))
);

export const GetRecords = (userId) => dispatch =>(
    RecordApi.GetPortfolioRecords(userId).then(records=>(
        dispatch(receiveAllPortfolioRecords(records))
    ))

);

export const CreateRecord = (payload) => dispatch=>(
    RecordApi.createPortfolioRecord(payload).then(record=>(
        dispatch(getPortfolioRecord(record))
    ))
);


export const fetchAllStocks = (query) => dispatch =>(
    StockInfoApi.fetchAllStocks(query).then(stocks=>(
        dispatch(receiveAllStocks(stocks))
    ))
);


export const fetchStockInfo = (ticker) => dispatch => (
    StockInfoApi.fetchInfo(ticker).then(info => (
        dispatch(receiveStockInfo(info))
    )
    )
);

export const fetchStockQoute = (ticker) => dispatch=>(
    StockInfoApi.fetchQoutes(ticker).then(info =>(dispatch(receiveStockInfo(info))
    )
    )
)

export const fetchStock = (id) => dispatch => (
    StockInfoApi.fetchStock(id).then((stock) =>
        dispatch(receiveStock(stock)))
);
