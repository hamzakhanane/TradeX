import * as StockInfoApi from '../util/stock_info_api_util';

export const RECEIVE_STOCK_INFO = "RECEIVE_STOCK_INFO";
export const RECEIVE_STOCK = "RECEIVE_STOCK";
export const RECEIVE_ALL_STOCKS = "RECEIVE_ALL_STOCKS";



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
    debugger
    return({
        type: RECEIVE_STOCK,
        stock
    })
}


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
