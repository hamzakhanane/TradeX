@portfolio_records.each do |record|
    json.set! record.id do 
        json.extract! record, :id, :user_id, :current_port_value, :created_at, :updated_at
    end
end