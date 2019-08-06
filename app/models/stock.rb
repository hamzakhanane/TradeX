# == Schema Information
#
# Table name: stocks
#
#  id           :bigint           not null, primary key
#  company_name :string           not null
#  ticker       :string           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Stock < ApplicationRecord
    validates :company_name, :ticker, presence: true, uniqueness: true

    has_many :watch_lists,
        primary_key: :id,
        foreign_key: :stock_id,
        class_name: "WatchList"
    
    has_many :portfolios,
        primary_key: :id,
        foreign_key: :stock_id,
        class_name: "Portfolio"

    def self.search_q(name)
        return where('company_name iLIKE ? or ticker iLIKE ?' ,"%#{name}%","%#{name}%")
    end




end
