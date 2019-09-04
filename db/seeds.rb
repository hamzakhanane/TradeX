# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'csv'

# User.destroy_all
# Stock.destroy_all
# Transaction.destroy_all
# Portfolio.destroy_all
# demo = User.create(username: "demoUser", first_name:"demo", last_name:"user", password:"hunter12", buying_power: 25435 )

PortfolioRecord.destroy_all
PortfolioRecord.create(user_id:14, current_port_value:26456, created_at: "2019-08-26 17:00:50", updated_at: "2019-08-26 17:00:50")
PortfolioRecord.create(user_id:14, current_port_value:25200, created_at: "2019-08-27 17:00:50", updated_at: "2019-08-28 17:00:50")
PortfolioRecord.create(user_id:14, current_port_value:29237, created_at: "2019-08-28 17:00:50", updated_at: "2019-08-28 17:00:50")
PortfolioRecord.create(user_id:14, current_port_value:25180, created_at: "2019-08-29 17:00:50", updated_at: "2019-08-29 17:00:50")
PortfolioRecord.create(user_id:14, current_port_value:24567, created_at: "2019-08-30 17:00:50", updated_at: "2019-08-30 17:00:50")
PortfolioRecord.create(user_id:14, current_port_value:29400, created_at: "2019-09-02 17:00:50", updated_at: "2019-09-02 17:00:50")
PortfolioRecord.create(user_id:14, current_port_value:28321, created_at: "2019-09-03 17:00:50", updated_at: "2019-09-03 17:00:50")
# csv_text = File.read(Rails.root.join('lib', 'seeds', 'companylist.csv'))
# csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
# csv.each do |row|
#   s = Stock.new
#   s.company_name = row['Name']
#   s.ticker = row['Symbol']
#   s.save
  
# end

# csv_text = File.read(Rails.root.join('lib', 'seeds', 'companylist2.csv'))
# csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
# csv.each do |row|
#   s = Stock.new
#   s.company_name = row['Name']
#   s.ticker = row['Symbol']
#   s.save
  
# end