# == Schema Information
#
# Table name: portfolios
#
#  id         :bigint           not null, primary key
#  user_id    :integer          not null
#  stock_id   :integer
#  num_stocks :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Portfolio < ApplicationRecord

    belongs_to :user,
        primary_key: :id,
        foreign_key: :user_id,
        class_name: "User"
    
    belongs_to :stock,
        primary_key: :id,
        foreign_key: :stock_id,
        class_name: "Stock"
    
    def self.get_num_stock(userId)
        
        arr = Portfolio.all.where(user_id: userId.to_i)
     
        return arr
    end

end
