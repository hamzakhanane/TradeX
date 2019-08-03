export const fetchInfo = (ticker) => {
    return $.ajax({
        method: "GET",
        url: `https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=${window.iexAPIKeySecret}`,
        // data: {ticker}
    });
}

// https://api.iextrading.com/1.0/stock/${query}/batch?types=quote,stats,company,news,chart&range=5y`


// export const fetchChart = () => {
//     return $.ajaxs({
//         method: "GET",
//         url: `https://cloud.iexapis.com/stable/stock/aapl/chart5y?chartIEXOnly=true&token=${window.iexAPIKeySecret}`
//     });
// }


//https://cloud.iexapis.com/stable/tops?token=${window.iexAPIKeySecret}&symbols=googl

// https://cloud.iexapis.com/stable/stock/aapl/quote?token=${window.iexAPIKeySecret}