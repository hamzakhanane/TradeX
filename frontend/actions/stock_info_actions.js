import * as StockInfoApi from '../util/stock_info_api_util';
import * as PortfolioApi from '../util/portfolio_api_util';

export const RECEIVE_STOCK_INFO = "RECEIVE_STOCK_INFO";
export const RECEIVE_STOCK = "RECEIVE_STOCK";
export const RECEIVE_ALL_STOCKS = "RECEIVE_ALL_STOCKS";
export const CREATE_TRANSACTION = "CREATE_TRANSACTION";
export const CREATE_PORTFOLIO = "CREATE_PORTFOLIO";



const recieveTransaction = (transaction)=>{
    
    return({
        type: CREATE_TRANSACTION,
        transaction

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

export const createPortfolio = (payload) => dispatch => (
    PortfolioApi.createPortfolio(payload).then(portfolio => (
        dispatch(receivePortfolio(portfolio))
    ))
);


export const createTransaction = (payload) => dispatch =>(
    StockInfoApi.createTransaction(payload).then(transaction=>(
        dispatch(recieveTransaction(transaction))
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
