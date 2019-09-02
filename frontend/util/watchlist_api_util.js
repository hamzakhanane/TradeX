export const createWatchList = (payload) => {
    return $.ajax({
        method: 'POST',
        url: `/api/users/${payload.watchlist.currentUser.id}/watchlists`,
        data: payload
    });
}



export const deleteWatchList = (wachlist) => {
    return $.ajax({
        method: "DELETE",
        url: `/api/users/${wachlist.user_id}/watchlists/${portfolio.id}`,
    })
}

export const getWatchList = (payload)=>{
    return $.ajax({
        method: "GET",
        url: `/api/users/${payload.id}/watchlists`,
        data: payload
    })
}



