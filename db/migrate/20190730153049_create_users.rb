class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :username, null: false
      t.string  :password_digest, null: false
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :session_token, null: false
      t.float :buying_power, null: false
      t.timestamps
    end
    add_index :users, :session_token
    add_index :users, :username
  end
end
