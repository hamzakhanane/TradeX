@transactions.each do |transaction|
     json.set! transaction.id do 
        json.extract! transaction, :id, :stock_id, :user_id, :num_stocks, :total_cost, :created_at, :updated_at
     end
end