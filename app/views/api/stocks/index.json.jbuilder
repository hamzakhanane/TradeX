@stocks.each do |stock|
     json.set! stock.id do 
        json.extract! stock, :id, :company_name, :ticker
     end
end