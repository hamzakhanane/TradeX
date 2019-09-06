import React from "react";
import { Link } from 'react-router-dom';
import {SearchContainer} from "./search_container";
import {fetchQoutes} from "../util/stock_info_api_util";
import {DashboardChart} from "../components/dashboard-chart";
import {fetchDashBoardNews} from "../util/stock_info_api_util";
class DashBoard extends React.Component{

    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
        this.state = {
            portfolio:[],
            watchlists: [],
            current_value: 0,
            one_week:[],
            news: {},
            counter:0
        }
    }

    handleLogout(){
        this.props.logout(this.props.currentUser)
    }

    isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

    componentDidMount(){
        let total = 0;
        let {currentUser} = this.props;
       
        total += currentUser.buying_power;
        
        fetchDashBoardNews("aapl,msft,googl")
            .then((news) => {
         
                let arr = Object.values(news);
                let result_news = [];
                for(let i=0; i<arr.length; i++){
                    for(let j=0; j<arr[i].news.length; j++){
                        result_news.push(arr[i].news[j]);
            
                    }
            
                }
                this.setState({ news: result_news })
            });

        this.props.receivePortfolio(currentUser).then((resp) => {
            let arr = Object.values(resp.portfolio);
            let number_valid_stocks = 0;
            for(let i=0; i<arr.length; i++){
                if (arr[i].num_stocks > 0){
                    number_valid_stocks++;
                }
            }
        
            

            for(let i =0; i<arr.length; i++){

                if(arr[i].num_stocks>0){
                   
                    let obj = {};
                    obj["num_stocks"] = arr[i].num_stocks;
                    obj["stock_id"] = arr[i].stock_id;
                    this.props.fetchStock(arr[i].stock_id).then((resp)=>{
                    
                        obj["ticker"] = resp.stock.ticker;
                        fetchQoutes(resp.stock.ticker).then((resp)=>{
                            obj["currentPrice"]=resp.latestPrice;
                            total += resp.latestPrice * arr[i].num_stocks;
                            this.setState({ current_value: total.toFixed(0) });
                            let temp = this.state.counter;
                            this.setState({counter:temp+1});
                            if(this.state.counter===number_valid_stocks){
                                
                                let today = new Date();
                                if (today.getHours() >= 17 && (today.getDay() !== 5 || today.getDay()!== 6)) {
                                    this.props.getRecords(currentUser).then((resp) => {
                                        let arr = Object.values(resp.records);
                                        if(arr.length==0){
                                            let obj = {};
                                            obj["current_port_value"] = this.state.current_value;
                                            obj["created_at"] = new Date();
                                            obj["user_id"] = currentUser.id;
                                            let new_object = {}
                                            new_object["PortfolioRecord"] = obj;
                                            this.props.createRecord(new_object);
                                        }
                                        let last_date = new Date(arr[arr.length-1].created_at);
                                        if(last_date.getDay()!== today.getDay()){
                            
                                            let obj = {};
                                            obj["current_port_value"] = this.state.current_value;
                                            obj["created_at"] = new Date();
                                            obj["user_id"] = currentUser.id;
                                            let new_object={}
                                            new_object["PortfolioRecord"] = obj;
                                            this.props.createRecord(new_object);
                                        }

                                    })

                                }
                            
                            }
                            let temp_arr = this.state.portfolio;
                            let temp_arr2 = temp_arr.concat(obj);
                            this.setState({ portfolio: temp_arr2 })
                        });
                    })   
                }
            } 
           
        });

        this.props.getRecords(currentUser).then((resp)=>{
            debugger
            if(this.isEmpty(resp.records)){
                let obj = {};
                let week_data = [];
                obj["current_port_value"] = 0;
                obj["created_at"] = new Date();
                week_data.push(obj);
                this.setState({ one_week: week_data });
            }
            else{
                debugger

                let arr = Object.values(resp.records);
                let week_range = 0;
                if(arr.length>=6){
    
                    week_range = arr.length - 6;
                }else{
                    week_range = arr.length;
                }
                let week_data = [];
                for (let i = arr.length-1; i >= week_range-1; i--) {
    
                    let obj = {};
                    obj["current_port_value"] = arr[i].current_port_value;
                    obj["created_at"] = new Date(arr[i].created_at);
                    week_data.push(obj);
                }
                this.setState({ one_week: week_data.reverse() });

            }
            
        })


    
        this.props.receiveAllWatchLists(currentUser.id).then((resp)=>{
            let arr = Object.values(resp.watchlist);
            for(let i=0; i<arr.length; i++){
                let obj = {};
                obj["stock_id"] = arr[i].stock_id;
                this.props.fetchStock(arr[i].stock_id).then((resp) => {
                    obj["ticker"] = resp.stock.ticker;
                    fetchQoutes(resp.stock.ticker).then((resp) => {

                        obj["currentPrice"] = resp.latestPrice;
                        let temp_arr = this.state.watchlists;
                        let temp_arr2 = temp_arr.concat(obj);
                      
                        this.setState({ watchlists: temp_arr2 })
                    });
                })

            }
            

        })

      

       
       
        
    }

    render(){

        let current_change=0;
        let current_percent_change=0;
        const { news } = this.state;
        let len = news.length;
        let arr_news = []
        if (news.length > 1) {
          
            // if (news.length > 5) {
            //     len = 4;

            // }
            
            for (let i = 0; i < len; i++) {
                arr_news.push(
                    <div className="news-element">
                        <div className="headline-source">
                            <span className="source">{news[i].source}</span>
                            <span className="headline"> {news[i].headline}</span>
                        </div>

                        <span>
                            <a href={news[i].url}> <img src={news[i].image} className="news-image" />
                            </a>
                        </span>
                    </div>

                )
            }


        }

        // if(this.state.current_value !== 0 && this.state.one_week.length !== 0){
        //     
        //     current_change = this.state.current_value - this.state.week_data[this.state.week_data.length - 1].current_port_value;
        //     current_percent_change = (this.state.current_value - this.state.week_data[this.state.week_data.length - 1].current_port_value) / 100;
        // }
       
        let bought_stocks = this.state.portfolio.map(stockObj =>{

            return(

                <Link className="link-to-stock" to={`/stock/${stockObj.stock_id}`}>
               
                    <li className="stock-element">
                    <div className="currentPrice-ticker-container">
                        <span className="stock-ticker">{stockObj.ticker}</span>
                        <span className="price">${stockObj.currentPrice}</span>
                    </div>
                    <span className="num-stocks">{stockObj.num_stocks} Shares</span>
                    </li>
                </Link>

            );

        });

        let stocks_watchlist = this.state.watchlists.map(stockObj=>{
            return(
                <Link className="link-to-stock" to={`/stock/${stockObj.stock_id}`}>

                    <li className="stock-element">
                        <div className="currentPrice-ticker-container">
                            <span className="stock-ticker">{stockObj.ticker}</span>
                            <span className="price">${stockObj.currentPrice}</span>
                        </div>
                    </li>
                </Link>

            );
        })
        
        
            return (
                <div>
                    <div className="nav-container">


                        <ul className="navbar">
                            <li className="logo-container"><Link className="a_tag_dash" to="/dashboard">
                                <img className="logo_image_signup_dash" src={window.logoImage} />
                            </Link></li>

                            <li className="dash-search"><SearchContainer /></li>

                            <div className="logo-header">
                                <div className="linkedin">
                                    <a className="links-color" href="https://www.linkedin.com/in/khananehamza/"><i class="fab fa-linkedin-in"></i></a>

                                </div>
                                <div>
                                    <a className="links-color" href="https://github.com/hamzakhanane"><i class="fab fa-github"></i></a>

                                </div>
                            </div>


                            <li className="logout-dash">
                                <button className="SignIn_Button" onClick={this.handleLogout}>Logout</button>
                            </li>

                        </ul>
                    </div>
                    {/* <ul className="navbar">
                        <li className="logo-container"><Link className="a_tag_dash" to="/dashboard">
                            <img className="logo_image_signup_dash" src={window.logoImage} />
                        </Link></li>
                        
                        <li className="dash-search"><SearchContainer/></li>
                        <div className="logo-header">
                            <div className="linkedin">
                                <a className="links-color" href="https://www.linkedin.com/in/khananehamza/"><i class="fab fa-linkedin-in"></i></a>

                            </div>
                            <div>
                                <a className="links-color" href="https://github.com/hamzakhanane"><i class="fab fa-github"></i></a>

                            </div>
                        </div>
                        <li className="logout-dash">
                            <button className="SignIn_Button" onClick={this.handleLogout}>Logout</button>  
                        </li>
                        
                    </ul> */}

                    <div className="graph-portfolio-container">
                        <div className="graph-user">
                            <div>
                                <div>

                                    <DashboardChart className="chart" data={this.state.one_week} currentValue={this.state.current_value}
                                        change={current_change} percent_change={current_percent_change} />
                                </div>
                                <div className="chart-buttons">
                                    {/* <button>1D</button> */}
                                    <button>1W</button>
                                    {/* <button>1M</button> */}
                                    {/* <button>3M</button>
                                    <button>1Y</button> */}
                                </div>
                                <div>
                                    <div className="news-header-container">
                                        <span className="news-header">News</span>
                                    </div>

                                    <ul>
                                        {arr_news}
                                    </ul>
                                </div>

                            </div>
                        </div>
                        <div className="sidebar-container">
                            <div className="portfolio-box">
                                <div className="portfolio-container">
                                    <div className="portfolio-heading">
                                        <span className="stock-span">Stocks</span>
                                    </div>
                                   
                                    <div className="stock-list">
                                        <ul>{bought_stocks}</ul>
                                    </div>

                                    <div className="portfolio-heading-2">
                                        <span className="stock-span">WatchList</span>
                                    </div>

                                    <div className="stock-list">
                                        <ul>{stocks_watchlist}</ul>
                                    </div>

                
                                </div>
                                
                            </div>
                        </div>
                    

                    </div>

                    
                </div>
            );
    }
}

export default DashBoard;



