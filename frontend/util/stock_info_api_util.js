export const fetchStock = (id) => {
    return $.ajax({
        method: 'GET',
        url: `/api/stocks/${id}`
    });
};

export const fetchInfo = (ticker) => {
    return $.ajax({
        method: "GET",
        url: `https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=${window.iexAPIKeySecret}`,
    });
}

