class CreatePortfolios < ActiveRecord::Migration[5.2]
  def change
    create_table :portfolios do |t|
      t.integer :user_id, null: false
      t.integer :stock_id
      t.integer :num_stocks
      t.timestamps
    end
    add_index :portfolios, :user_id
    add_index :portfolios, :stock_id
  end

end
