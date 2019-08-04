export const fetchStock = (id) => {
    return $.ajax({
        method: 'GET',
        url: `/api/stocks/${id}`
    });
};

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

