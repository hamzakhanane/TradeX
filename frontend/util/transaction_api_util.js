export const GetTransactions = (payload) => {
    return $.ajax({
        method: 'GET',
        url: `/api/users/${payload}/transactions`,
        data: payload
    })
}