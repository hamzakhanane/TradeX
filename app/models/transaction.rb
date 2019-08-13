# == Schema Information
#
# Table name: transactions
#
#  id         :bigint           not null, primary key
#  user_id    :integer          not null
#  stock_id   :integer          not null
#  num_stocks :float            not null
#  total_cost :float            not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Transaction < ApplicationRecord

    validates :user_id, :stock_id, :num_stocks, :total_cost, presence: true


    belongs_to :user,
        primary_key: :id,
        foreign_key: :user_id,
        class_name: "User"
    
    belongs_to :stock,
        primary_key: :id,
        foreign_key: :stock_id,
        class_name: "Stock"

end
