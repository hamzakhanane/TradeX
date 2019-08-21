export const createPortfolio = (payload) =>{
    return $.ajax({
        method: 'POST',
        url: `/api/users/${payload.portfolio.currentUser.id}/portfolios`,
        data: payload
    });

}