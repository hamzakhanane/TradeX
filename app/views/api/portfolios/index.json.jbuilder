@portfolios.each do |portfolio|
     json.set! portfolio.id do 
        json.extract! portfolio, :id, :stock_id, :user_id, :num_stocks
     end
end