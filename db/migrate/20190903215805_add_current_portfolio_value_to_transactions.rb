class AddCurrentPortfolioValueToTransactions < ActiveRecord::Migration[5.2]
  def change
    add_column :transactions, :current_portfolio_value, :integer
  end
end
