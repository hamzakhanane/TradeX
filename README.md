# TradeX
 TradeX, a Robinhood clone, is a popular application for users to buy/sell stocks all commission-free. Users can maintain a portfolio and can buy/sell stocks any time within their buying power.
 
 [Live Demo](https://trade--x.herokuapp.com/#/)
 
 
## Technologies
 * FrontEnd: React, Redux, HTML/CSS
 * BackEnd: Ruby On Rails, PostgreSQL
 * IEX API
 * Recharts
  
## Features
 * Complete User Authentication, login/logout/signup functionality. Saving encrypted passwords in the database using BCrypt.
 * User is able to search for any stock listed on NYSE and NASDAQ using the name or the ticker.
 * Real time price and historic price data for every stock.
 * Buy/Sell feature for any stock. User is able to view their portfolio with real time prices.
 * Users are able to add/delete and stocks in their watchlist.
 * Users are able to view their historical portfolio chart on the dashboard.
 * News for every company on the stock show page
 
 ## Stock Show Page/ Buy/Sell Form
 

  <a href="https://imgflip.com/gif/3bx081"><img src="https://i.imgflip.com/3bx081.gif" title="made at imgflip.com"/></a>
  
  ## Auto Complete Search Bar
  * A search bar for users to search for any stocks listed on NASDAQ and NYSE. 
  * sample code snippet for search bar
  ```
  constructor(props){
        super(props);
        this.state = {
            searched_stock:[],
            search_q: "",
        }

        this.queryUpdate = this.queryUpdate.bind(this);

        
    }

    componentDidUpdate(prevProps){

        if(prevProps.stocks !== this.props.stocks){
            this.setState({ searched_stock: [] });
        }
    }

    componentDidMount(){
        
        this.props.fetchAllStocks(this.state.search_q).then(stocks => this.setState({ searched_stock:this.props.stocks }));
        
    }

    queryUpdate(e) { 
        if(this.state.search_q.length===0){
            this.setState({ searched_stock: [] })
        }
        this.setState({
                search_q: e.target.value, 
            
        },
            () => this.props.fetchAllStocks(this.state.search_q).then(stocks=>this.setState({ searched_stock: this.props.stocks }))
        );
    }


  ```

    
