import * as StockInfoApi from '../util/stock_info_api_util';

export const RECEIVE_STOCK_INFO = "RECEIVE_STOCK_INFO";
export const RECEIVE_STOCK = "RECEIVE_STOCK"


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
