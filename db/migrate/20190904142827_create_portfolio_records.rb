class CreatePortfolioRecords < ActiveRecord::Migration[5.2]
  def change
    create_table :portfolio_records do |t|
      t.integer :user_id, null: false
      t.integer :current_port_value, null: false
      t.timestamps
    end
     add_index :portfolio_records, :user_id
  end
end
