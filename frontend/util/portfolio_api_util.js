export const createPortfolio = (payload) =>{
   
    return $.ajax({
        method: 'POST',
        url: `/api/users/${payload.portfolio.currentUser.id}/portfolios`,
        data: payload
    });
}

export const GetPortfolio = (payload) =>{
    
    return $.ajax({
        method: 'GET',
        url: `/api/users/${payload.id}/portfolios`,
        data: payload
    })
}

export const updatePortfolio = (portfolio) => {
    return $.ajax({
        method: "PATCH",
        url: `/api/users/${portfolio.user_id}/portfolios/${portfolio.id}`,
        data: {portfolio}
    })
}



