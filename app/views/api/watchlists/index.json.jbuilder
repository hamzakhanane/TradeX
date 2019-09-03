@watchlists.each do |watchlist|
     json.set! watchlist.id do 
        json.extract! watchlist, :id, :stock_id, :user_id
     end
end