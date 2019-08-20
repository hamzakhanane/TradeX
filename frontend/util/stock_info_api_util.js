export const fetchStock = (id) => {
    return $.ajax({
        method: 'GET',
        url: `/api/stocks/${id}`
    });
};

export const fetchAllStocks = (query) =>{
    return $.ajax({
        method: "GET",
        url: `/api/stocks/search/${query}`,
        data: {query}

    })
}

export const fetchCharts = (ticker, timeframe) => {
    return $.ajax({
        method: "GET",
        url: `https://cloud.iexapis.com/stable/stock/${ticker}/chart/${timeframe}?chartIEXOnly=true&token=${window.iexAPIKeySecret}`
    })
}

export const fetchInfo = (ticker) => {
    return $.ajax({
        method: "GET",
        url: `https://cloud.iexapis.com/stable/stock/${ticker}/company/batch?&types=quote&token=${window.iexAPIKeySecret}`,
    });
}

export const fetchQoutes = (ticker)=>{
    return $.ajax({
        method: "",
        url: `https://cloud.iexapis.com/stable/stock/${ticker}/quote/batch?&types=quote&token=${window.iexAPIKeySecret}`
    })
}

export const fetchNews = (ticker)=>{
    return $.ajax({
        method: "",
        url: `https://cloud.iexapis.com/stable/stock/${ticker}/news/batch?&types=quote&token=${window.iexAPIKeySecret}`
    })
}

export const createTransaction = (payload) => {

    return $.ajax({
        url: `/api/users/${payload.transaction.currentUser.id}/transactions`,
        method: "POST",
        data: payload 
    });

}

