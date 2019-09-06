import React from "react";
import {fetchInfo,fetchQoutes,fetchCharts,fetchNews} from "../util/stock_info_api_util";

import {Chart} from "./chart";
import BuySellForm from "./buy_sell_form"
import { Link } from 'react-router-dom';
import { SearchContainer } from "./search_container";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';


import {createTransaction} from "../actions/stock_info_actions";

class StockInfo extends React.Component{

    constructor(props){
        super(props);
        this.state = {
        stockinfo: {}, 
        qoute:{},
        currentPrice:0,
        priceChange:0,
        percentChange: 0,
        chart_timeframe: "month",
        watchlist_arr: {},
        charts:{
            "1D":[],
            "1W":[],
            "1M": [],
            "3M": [],
            "1Y": [],
        },
        news:{},
        watchlist_message: "Add To WatchList"
    };
        this.oneDay = this.oneDay.bind(this);
        this.oneMonth = this.oneMonth.bind(this);
        this.oneWeek = this.oneWeek.bind(this);
        this.oneYear = this.oneYear.bind(this);
        this.threeMonths = this.threeMonths.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.updateWatchList = this.updateWatchList.bind(this);
        this.changeButtonMessage = this.changeButtonMessage.bind(this);
        
   
    }
    changeButtonMessage(){
      
        const watchlist_obj = this.props.watchlist;
        if (typeof watchlist_obj !== 'undefined') {
            let arr = Object.values(watchlist_obj);
            for (let i = 0; i < arr.length; i++) {
                if (Number(this.props.match.params.stockId) === Number(arr[i].stock_id)) {
                    this.setState({ watchlist_message: "Remove From WatchList" });
                    break;
                }
            }
        }
    }

    handleLogout() {
        this.props.logout(this.props.currentUser)

       
    }

    updateWatchList(){
        
       
        if (this.state.watchlist_message === "Add To WatchList"){
            
            let watchlist ={};
            watchlist["currentUser"] =this.props.currentUser;
            watchlist["stock_id"] = this.props.stock.id;
            let obj = {};
            obj["watchlist"]= watchlist;
            // this.setState({ watchlist_message: "Remove From WatchList" });
            this.props.createWatchList(obj).then((resp)=>{
               
            })
            this.setState({ watchlist_message: "Remove From WatchList" });

        }
        else{
            const watchlist_obj = this.props.watchlist;
            let arr = Object.values(watchlist_obj);
            for (let i = 0; i < arr.length; i++) {
                if (Number(this.props.match.params.stockId) === Number(arr[i].stock_id)) {
                    let obj = {};
                    obj["watchlist_id"] = arr[i].id;
                    obj["user_id"] = arr[i].user_id;
                    let payload ={};
                    payload["watchlist"]= obj;
                    // this.setState({ watchlist_message: "Add To WatchList" });
                    this.props.deleteWatchList(payload).then((resp)=>{
                       
                    })
                    this.setState({ watchlist_message: "Add To WatchList" });
                    break;
                }
            }

   

        }
    }


    oneDay(){

    }

    oneWeek(){
        this.setState({ chart_timeframe: "week" });
    }
    

    oneMonth(){
        this.setState({chart_timeframe:"month"});
        // const stockId = this.props.match.params.stockId;
        // this.props.fetchStock(stockId).then((resp) => {
        //     const ticker = resp.stock.ticker
        //       fetchCharts(ticker, "1M")
        //             .then(charts => {
        //                 const newData = Object.assign({}, this.state.charts);
        //                 newData["1M"] = this.structureData(charts);
        //                 this.setState({ charts: newData })
              
        //             });
        //         }
        // )
    }
    
    oneYear(){
        this.setState({ chart_timeframe: "year" });
        // const stockId = this.props.match.params.stockId;
        // this.props.fetchStock(stockId).then((resp) => {
        //     const ticker = resp.stock.ticker
        //     fetchCharts(ticker, "1Y")
        //         .then(charts => {
        //             const newData = Object.assign({}, this.state.charts);
        //             newData["1Y"] = this.structureData(charts);
        //             this.setState({ charts: newData })
        //         });
        // }
        // )
    }

    threeMonths(){
        this.setState({ chart_timeframe: "3months" });
    }



    componentDidUpdate(prevProps, prevState) {
        const stockId = this.props.match.params.stockId;
        if (stockId !== prevProps.match.params.stockId) {
            this.setState({
                stockinfo: {},
                qoute: {},
                new:{},
                chart_timeframe: "month",
                charts: {
                    "1D": [],
                    "1M": [],
                    "1W": [],
                    "3M": [],
                    "1Y": [],
                }
                
            });
           
            this.props.fetchStock(stockId).then((resp) => {
                const ticker = resp.stock.ticker
                fetchInfo(ticker)
                    .then(stockinfo => this.setState({ stockinfo }));
                fetchQoutes(ticker)
                    .then(qoute => this.setState({ qoute }));
                fetchNews(ticker)
                    .then(news => this.setState({news}));
                fetchCharts(ticker, "5D")
                    .then(charts => {
                        const newData = Object.assign({}, this.state.charts);
                        newData["1W"] = this.structureData(charts);
                        this.setState({ charts: newData })
                    });
                fetchCharts(ticker, "1M")
                    .then(charts => {
                        const newData = Object.assign({}, this.state.charts);
                        newData["1M"] = this.structureData(charts);
                        this.setState({ charts: newData })
                    });
                fetchCharts(ticker, "1Y")
                    .then(charts => {
                        const newData = Object.assign({}, this.state.charts);
                        newData["1Y"] = this.structureData(charts);
                        this.setState({ charts: newData })
                    });
                // fetchCharts(ticker, "5Y")
                //     .then(charts => {
                //         const newData = Object.assign({}, this.state.charts);
                //         newData["5Y"] = this.structureData(charts);
                //         this.setState({ charts: newData })
                //     });
                fetchCharts(ticker, "3M")
                    .then(charts => {
                        const newData = Object.assign({}, this.state.charts);
                        newData["3M"] = this.structureData(charts);
                        this.setState({ charts: newData })
                    });
            })
        }
    }


    

    componentDidMount(){
        const stockId = this.props.match.params.stockId;
        let { currentUser } = this.props;
       
        this.props.receiveAllWatchLists(this.props.currentUser.id).then((resp)=>{
            this.changeButtonMessage();
        })
        
       
       
        this.props.fetchStock(stockId).then((resp) => {
            
            const ticker = resp.stock.ticker
            fetchInfo(ticker)
                .then(stockinfo => this.setState({ stockinfo }));
            fetchQoutes(ticker)
                .then(qoute => this.setState({ qoute }));
            fetchNews(ticker)
                .then(news => this.setState({ news }));
            
            
            fetchCharts(ticker, "5D")
                    .then(charts => {
                        const newData = Object.assign({}, this.state.charts);
                        newData["1W"] = this.structureData(charts);
                        this.setState({charts: newData})
                    });
            fetchCharts(ticker, "1M")
                .then(charts => {
                    const newData = Object.assign({}, this.state.charts);
                    newData["1M"] = this.structureData(charts);
                    this.setState({ charts: newData })
                });
            fetchCharts(ticker, "1Y")
                .then(charts => {
                    const newData = Object.assign({}, this.state.charts);
                    newData["1Y"] = this.structureData(charts);
                    this.setState({ charts: newData })
                });
            // fetchCharts(ticker, "5Y")
            //     .then(charts => {
            //         const newData = Object.assign({}, this.state.charts);
            //         newData["5Y"] = this.structureData(charts);
            //         this.setState({ charts: newData })
            //     });
            fetchCharts(ticker, "3M")
                .then(charts => {
                    const newData = Object.assign({}, this.state.charts);
                    newData["3M"] = this.structureData(charts);
                    this.setState({ charts: newData })
                });
        })


    }



    findMinClosing(data){
       
        let resultarr = data.map(data => data.close);
        const resultarr2 = resultarr.filter(Number);
        let result = Math.min.apply(Math, resultarr2);
        
        return result

    }

    findMaxClosing(data){
        let resultarr = data.map(data => data.close);
        let result = Math.max.apply(Math, resultarr);
        return result

    }

    structureData(data){
        
        let newdata = [];
        for(let i=0; i<data.length; i++){
            let obj = {
               
            };
            obj["date"]= data[i].date
            obj["open"] = data[i].open
            obj["close"] = data[i].close
            newdata.push(obj);
           
        }
        return newdata;
       
    }

  



    

    render(){
        
        const {stockinfo} = this.state; 
        const {qoute} = this.state;
        const {chart_timeframe } = this.state;
        let active="button-color"
        const {news} = this.state;
        // let watchlist_message= "Add To WatchList";
        
        
        const { currentPrice} = this.state;
        const day_char = this.state.charts["1D"];
        const week_char = this.state.charts["1W"];
        const three_month_char = this.state.charts["3M"];
        const year_char = this.state.charts["1Y"];
        const month_char = this.state.charts["1M"];

        
        
       
        
        let data;
        if(chart_timeframe==="month"){
            data = month_char;
        }
        else if (chart_timeframe === "year"){
            data = year_char;
        }
        else if(chart_timeframe ==="week"){
            data = week_char;
        }

        else if(chart_timeframe==="3months"){
            data = three_month_char;
        }
    
        // const min_closing = this.findMinClosing(month_char);
        // const max_closing = this.findMaxClosing(month_char);
        let latest_price = 0;

        // let arr_news= 
        
        let len = news.length;
        let arr_news=[]
        
        if(news.length>1){
            if (news.length > 5){
                len = 4;

            }
            for(let i=0; i <len; i++){
                arr_news.push(
                    <div className="news-element">
                        <div className="headline-source">
                            <span className="source">{news[i].source}</span>
                            <span className="headline"> {news[i].headline}</span>
                        </div>
                        
                        <span>
                            <a href={news[i].url}> <img src={news[i].image} className="news-image"/>
                            </a>
                        </span>
                    </div>

                )
            }
           

        }

    

       
        return(
            
            <div className="background">
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
                
                
           


           
            <div className="content-container"> 
                <div className="info-container">
                    
                    <div className="name-container">
                        <h2 className="header-name">{stockinfo.companyName}</h2>
                    </div>
                    <div>

                        <Chart className="chart" data={data} openingPrice={qoute.latestPrice} 
                        change={qoute.change} percent_change={qoute.changePercent} />
                    </div>
                    <div className="chart-buttons">
                        <button className={active} onClick={this.oneDay}>1D</button>
                        <button className={active}  onClick={this.oneWeek}>1W</button>
                        <button className={active}  onClick={this.oneMonth}>1M</button>
                        <button className={active}  onClick={this.threeMonths}>3M</button>
                        <button className={active}  onClick={this.oneYear}>1Y</button>
                    </div>
                    <div className="description-parent">
                        <div className="about-container">
                            <h3 className="about-header">About</h3>
                        </div>
                        <div className="descriptionContainer">
                            <p>{stockinfo.description}</p>
                            {/* <button onclick={this.readMore} id="myBtn">Read more</button> */}
                        </div>

                        <div className="tags-container">
                            <div className="tags-container-top">

                           
                                <div id="tag-container-item">
                                    <p id="label-header">CEO</p>
                                    <p>{stockinfo.CEO}</p>
                                </div>
                                

                                <div id="tag-container-item" className="employee">
                                    <p id="label-header">Employees</p>
                                    <p>{stockinfo.employees}</p>
                                </div>

                                <div id="tag-container-item" className="marketcap">
                                    <p id="label-header">Market Cap</p>
                                    <p>{qoute.marketCap}</p>
                                </div>

                                <div id="tag-container-item" className="volume">
                                    <p id="label-header">Volume</p>
                                    <p>{qoute.avgTotalVolume}</p>
                                </div>
                            </div>


                            <div className="tags-container-bottom">

                            


        
                                <div id="tag-container-item" >
                                    <p id="label-header">52 Week High</p>
                                    <p>{qoute.week52High}</p>
                                </div>

                                <div id="tag-container-item" className="low">
                                    <p id="label-header">52 Week Low</p>
                                    <p>{qoute.week52Low}</p>
                                </div>

                                <div id="tag-container-item" className="openPrice">
                                    <p id="label-header">Open Price</p>
                                    <p>{qoute.open}</p>
                                </div>

                                <div id="tag-container-item" className="hightoday">
                                    <p id="label-header">High Today</p>
                                    <p>{qoute.high}</p>
                                </div>
                            </div>

                            

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

                
                <div className="buy-sell-container">
                    <div className="form-box">
                        <BuySellForm className="form-container" currentUser={this.props.currentUser} StockObject={this.props.stock} StockName={stockinfo.symbol} CurrentPrice={qoute.latestPrice} createTransaction ={this.props.createTransaction} updateUser = {this.props.update} 
                        createPortfolio={this.props.createPortfolio} receivePortfolio={this.props.receivePortfolio} updatePortfolio={this.props.updatePortfolio}/>
                    </div>

                    <div className="watchlist-button-container">
                        <button className="watchlist-button" onClick={this.updateWatchList}>{this.state.watchlist_message}</button>
                    </div>
                </div>

                {/* <div>
                    <div>
                        <button className="watchlist-button" onClick={this.updateWatchList}>{this.state.watchlist_message}</button>
                    </div>
                </div> */}
            </div> 

                
            

            </div>
        );



    }

}

export default StockInfo;