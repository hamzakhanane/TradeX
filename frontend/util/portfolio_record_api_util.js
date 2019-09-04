export const createPortfolioRecord = (payload) => {

    return $.ajax({
        method: 'POST',
        url: `/api/users/${payload.id}/portfoliorecords`,
        data: payload
    });
}

export const GetPortfolioRecords = (payload) => {
   
    return $.ajax({
        method: 'GET',
        url: `/api/users/${payload.id}/portfoliorecords`,
        data: payload
    })
}