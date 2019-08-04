# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Stock.destroy_all
User.create(username: "demoUser", first_name:"demo", last_name:"user", password:"hunter12", buying_power: 25435 )
Stock.create(company_name: "Apple Inc", ticker:"AAPL")
Stock.create(company_name: "Microsoft Corporation", ticker:"MSFT")
Stock.create(company_name: "Google", ticker:"GOOGL")
Stock.create(company_name: "Google", ticker:"GOOGL")
Stock.create(company_name: "Facebook Inc", ticker:"FB")
Stock.create(company_name: "Berkshire Hathaway Inc", ticker:"BRK.B")
Stock.create(company_name: "Johnson & Johnson", ticker:"JNJ")
Stock.create(company_name: "JPMorgan Chase & Co", ticker:"JPM")
Stock.create(company_name: "ExxonMobil Corporation", ticker:"XOM")
Stock.create(company_name: "Wal-Mart Stores Inc", ticker:"WMT")
Stock.create(company_name: "Royal Dutch Shell plc (ADR)", ticker:"RDS-B")
Stock.create(company_name: "Visa Inc", ticker:"V")
Stock.create(company_name: "Procter & Gamble Co", ticker:"PG")
Stock.create(company_name: "Chevron Corporation", ticker:"CVX")
Stock.create(company_name: "Dell Technologies Inc", ticker:"CVX")
Stock.create(company_name: "Pfizer Inc", ticker:"PFE")
Stock.create(company_name: "Home Depot Inc", ticker:"HD")
Stock.create(company_name: "Intel Corporation", ticker:"INTC")
Stock.create(company_name: "Taiwan Semiconductor Mfg. Co. Ltd", ticker:"TSM")
Stock.create(company_name: "Oracle Corporation", ticker:"ORCL")














Stock.create(company_name: "Amazon.com, Inc", ticker:"AMZN")