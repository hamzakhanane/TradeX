import * as StockInfoApi from '../util/stock_info_api_util';

export const RECEIVE_STOCK_INFO = "RECEIVE_STOCK_INFO";


const receiveStockInfo = (info) => {
    return({
        type: RECEIVE_STOCK_INFO,
        info
    })
}


export const fetchStockInfo = () => dispatch => (
    StockInfoApi.fetchInfo().then(info => (
        dispatch(receiveStockInfo(info))
    ), err => (
        dispatch(receiveErrors(err.responseJSON))
    ))
);