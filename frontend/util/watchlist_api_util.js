export const createWatchList = (payload) => {
    return $.ajax({
        method: 'POST',
        url: `/api/users/${payload.watchlist.currentUser.id}/watchlists`,
        data: payload
    });
}



export const deleteWatchList = (payload) => {
    
    return $.ajax({
        method: "DELETE",
        url: `/api/users/${payload.watchlist.user_id}/watchlists/${payload.watchlist.watchlist_id}`,
    })
}

export const getWatchList = (payload)=>{
    return $.ajax({
        method: "GET",
        url: `/api/users/${payload}/watchlists`,
        data: payload
    })
}



