class RemoveCurrentPortfolioValueFromTransactions < ActiveRecord::Migration[5.2]
  def change
    remove_column :transactions, :current_portfolio_value, :integer
  end
end
