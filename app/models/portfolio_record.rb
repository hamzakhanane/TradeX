# == Schema Information
#
# Table name: portfolio_records
#
#  id                 :bigint           not null, primary key
#  user_id            :integer          not null
#  current_port_value :integer          not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#

class PortfolioRecord < ApplicationRecord

    belongs_to :user,
        primary_key: :id,
        foreign_key: :user_id,
        class_name: "User"

    def self.get_user_records(userId)
        arr = PortfolioRecord.all.where(user_id: userId.to_i)
        return arr
    end

end
