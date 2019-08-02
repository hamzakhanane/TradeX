# == Schema Information
#
# Table name: watch_lists
#
#  id         :bigint           not null, primary key
#  user_id    :integer          not null
#  stock_id   :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class WatchList < ApplicationRecord
    validates :user_id, presence: true


    belongs_to :user,
        primary_key: :id,
        foreign_key: :user_id,
        class_name: "User"
    
    belongs_to :stock,
        primary_key: :id,
        foreign_key: :stock_id,
        class_name: "Stock"
    


end
