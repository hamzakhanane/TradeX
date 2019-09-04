import React from "react";
import { Link } from 'react-router-dom';
import {SearchContainer} from "./search_container";
import {fetchQoutes} from "../util/stock_info_api_util";
class DashBoard extends React.Component{

    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
        this.state = {
            portfolio:[],
            watchlists: [],
            current_value: 0
        }
    }

    handleLogout(){
        this.props.logout(this.props.currentUser)
    }

    refactorDateTime(trans){
        for (let i = 0; i < trans.length; i++) {
            const refactored_time = new Date(trans[i].created_at);
            trans[i].created_at = refactored_time;
        }

        return trans;

    }

    getDayData(trans){
        let current_day = {};
        var d = new Date()
        for(let i=0; i<trans.length; i++){
            
            if ((d.getDay() === trans[i].created_at.getDay()) && (d.getMonth() === trans[i].created_at.getMonth())){
                
                current_day[i] = trans[i];
            }
        }

        return current_day;
        
       
    }



    componentDidMount(){
        let total = 0;
        let {currentUser} = this.props;
       
        total += currentUser.buying_power;
        this.props.getTransactions(currentUser.id).then((resp)=>{
            
            let trans = this.refactorDateTime(Object.values(resp.transaction));
            let currentDay= this.getDayData(trans);
            
        })

        this.props.receivePortfolio(currentUser).then((resp) => {
            let arr = Object.values(resp.portfolio);
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
                            this.setState({ current_value: total });
                            let temp_arr = this.state.portfolio;
                            let temp_arr2 = temp_arr.concat(obj);
                            this.setState({ portfolio: temp_arr2 })
                        });
                        
                      
                    })
                    
                }
            }
            // this.setState({ current_value: total });
           
           

        });
    
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
                    <ul className="navbar">
                        <li className="logo-container"><Link className="a_tag_dash" to="/dashboard">
                            <img className="logo_image_signup_dash" src={window.logoImage} />
                        </Link></li>
                        
                        <li className="dash-search"><SearchContainer/></li>
                        

                        <li className="logout-dash">
                            <button className="SignIn_Button" onClick={this.handleLogout}>Logout</button>  
                        </li>
                        
                    </ul>

                    <div className="graph-portfolio-container">
                        <div className="graph-user">
                            <div>
                                {/* <span>Graph</span>  */}
                                <span>${this.state.current_value.toFixed(3)}</span>
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



