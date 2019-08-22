# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'csv'

User.destroy_all
Stock.destroy_all
Transaction.destroy_all
Portfolio.destroy_all
User.create(username: "demoUser", first_name:"demo", last_name:"user", password:"hunter12", buying_power: 25435 )


csv_text = File.read(Rails.root.join('lib', 'seeds', 'companylist.csv'))
csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
csv.each do |row|
  s = Stock.new
  s.company_name = row['Name']
  s.ticker = row['Symbol']
  s.save
  
end

csv_text = File.read(Rails.root.join('lib', 'seeds', 'companylist2.csv'))
csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
csv.each do |row|
  s = Stock.new
  s.company_name = row['Name']
  s.ticker = row['Symbol']
  s.save
  
end