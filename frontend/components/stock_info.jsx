import React from "react";
import {fetchInfo,fetchQoutes,fetchCharts} from "../util/stock_info_api_util"
import {Chart} from "./chart";
import { Link } from 'react-router-dom';
import { SearchContainer } from "./search_container";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

class StockInfo extends React.Component{

    constructor(props){
        super(props);
        this.state = {
        stockinfo: {}, 
        qoute:{}, 
        currentPrice:0,
        priceChange:0,
        percentChange: 0,
        charts:{
            "1D":[],
            "1M": [],
            "3M": [],
            "1Y": [],
            "5Y": []
        }
    };
        this.readMore = this.readMore;
        // this.CustomTooltip = this.CustomTooltip.bind(this);
        // this.changePrice = this.changePrice.bind(this);
   
    }




    componentDidUpdate(prevProps, prevState) {
        const stockId = this.props.match.params.stockId;
        if (stockId !== prevProps.match.params.stockId) {
            this.setState({
                stockinfo: {},
                qoute: {},
                charts: {
                    "1D": [],
                    "1M": [],
                    "3M": [],
                    "1Y": [],
                    "5Y":[]
                }
                
            });
           
            this.props.fetchStock(stockId).then((resp) => {
                const ticker = resp.stock.ticker
                fetchInfo(ticker)
                    .then(stockinfo => this.setState({ stockinfo }));
                fetchQoutes(ticker)
                    .then(qoute => this.setState({ qoute }));
                // fetchCharts(ticker, "1D")
                //     .then(charts => {
                //         const newData = Object.assign({}, this.state.charts);
                //         newData["1D"] = this.structureData(charts);
                //         this.setState({ charts: newData })
                //     });
                // fetchCharts(ticker, "1M")
                //     .then(charts => {
                //         const newData = Object.assign({}, this.state.charts);
                //         newData["1M"] = this.structureData(charts);
                //         this.setState({ charts: newData })
                //     });
                // fetchCharts(ticker, "1Y")
                //     .then(charts => {
                //         const newData = Object.assign({}, this.state.charts);
                //         newData["1Y"] = this.structureData(charts);
                //         this.setState({ charts: newData })
                //     });
                // fetchCharts(ticker, "5Y")
                //     .then(charts => {
                //         const newData = Object.assign({}, this.state.charts);
                //         newData["5Y"] = this.structureData(charts);
                //         this.setState({ charts: newData })
                //     });
                // fetchCharts(ticker, "3M")
                //     .then(charts => {
                //         const newData = Object.assign({}, this.state.charts);
                //         newData["3M"] = this.structureData(charts);
                //         this.setState({ charts: newData })
                //     });
            })
        }
    }


    

    componentDidMount(){
        const stockId = this.props.match.params.stockId;
       
        this.props.fetchStock(stockId).then((resp) => {
            const ticker = resp.stock.ticker
            fetchInfo(ticker)
                .then(stockinfo => this.setState({ stockinfo }));
            fetchQoutes(ticker)
                .then(qoute => this.setState({ qoute }));
            // fetchCharts(ticker, "1D")
            //         .then(charts => {
            //             const newData = Object.assign({}, this.state.charts);
            //             newData["1D"] = this.structureData(charts);
            //             this.setState({charts: newData})
            //         });
            // fetchCharts(ticker, "1M")
            //     .then(charts => {
            //         const newData = Object.assign({}, this.state.charts);
            //         newData["1M"] = this.structureData(charts);
            //         this.setState({ charts: newData })
            //     });
            // fetchCharts(ticker, "1Y")
            //     .then(charts => {
            //         const newData = Object.assign({}, this.state.charts);
            //         newData["1Y"] = this.structureData(charts);
            //         this.setState({ charts: newData })
            //     });
            // fetchCharts(ticker, "5Y")
            //     .then(charts => {
            //         const newData = Object.assign({}, this.state.charts);
            //         newData["5Y"] = this.structureData(charts);
            //         this.setState({ charts: newData })
            //     });
            // fetchCharts(ticker, "3M")
            //     .then(charts => {
            //         const newData = Object.assign({}, this.state.charts);
            //         newData["3M"] = this.structureData(charts);
            //         this.setState({ charts: newData })
            //     });
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

    readMore() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("myBtn");

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        btnText.innerHTML = "Read more";
        moreText.style.display = "none";
    } else {
        dots.style.display = "none";
        btnText.innerHTML = "Read less";
        moreText.style.display = "inline";
    }

    }



    

    render(){
        // debugger
        const {stockinfo} = this.state; 
        // debugger
        const {qoute} = this.state;
        // debugger
        const { currentPrice} = this.state;
        const day_char = this.state.charts["1D"];

        
        // const month_char = this.state.charts["1M"];
        // debugger
        const month_char = [{ date: "2019-07-05", open: 135.94, close: 137.06}
        ,{ date: "2019-07-08", open: 136.4, close: 136.96 }
        ,{ date: "2019-07-09", open: 136, close: 136.46 }
        ,{ date: "2019-07-10", open: 137.13, close: 137.85 }
        ,{ date: "2019-07-11", open: 138.2, close: 138.4 }
        ,{ date: "2019-07-12", open: 138.85, close: 138.9 }
        ,{ date: "2019-07-15", open: 139.44, close: 138.9 }
        ,{ date: "2019-07-16", open: 138.96, close: 137.08 }
        ,{ date: "2019-07-17", open: 137.7, close: 136.27 }
        ,{ date: "2019-07-18", open: 135.55, close: 136.42 }
        ,{ date: "2019-07-19", open: 140.22, close: 136.62 }
        ,{ date: "2019-07-22", open: 137.41, close: 138.43 }
        ,{ date: "2019-07-23", open: 139.76, close: 139.29 }
        ,{ date: "2019-07-24", open: 138.9, close: 140.72 }
        ,{ date: "2019-07-25", open: 140.43, close: 140.19 }
        ,{ date: "2019-07-26", open: 140.37, close: 141.34 }
        ,{ date: "2019-07-29", open: 141.5, close: 141.03 }
        ,{ date: "2019-07-30", open: 140.14, close: 140.35 }
        ,{ date: "2019-07-31", open: 140.33, close: 136.27 }
        ,{ date: "2019-08-01", open: 137, close: 138.06 }
        ,{ date: "2019-08-02", open: 138.09, close: 136.9 }];
        const year_char = this.state.charts["1Y"];
        const three_month_char = this.state.charts["3M"];
        const five_year_char = this.state.charts["5Y"];
        const min_closing = this.findMinClosing(month_char);
        const max_closing = this.findMaxClosing(month_char);
        let latest_price = 0;
    

        
        // debugger
        return(
            
            <div>
                
                <ul className="navbar">
                    <li className="logo-container"><Link className="a_tag_dash" to="/dashboard">
                        <img className="logo_image_signup_dash" src={window.logoImage} />
                    </Link></li>

                    <li className="dash-search"><SearchContainer /></li>


                    <li className="logout-dash">
                        <button onClick={this.handleLogout}>Logout</button>
                    </li>

                </ul>
               <div className="content-container">
                  
                    <div className="name-container">
                        <h2 className="header-name">{stockinfo.companyName}</h2>
                    </div>
                    <div>

                    
                        <Chart className="chart" data={month_char} openingPrice={qoute.latestPrice} minClosing={min_closing} maxClosing={max_closing} 
                        change={qoute.change} percent_change={qoute.changePercent} />
                    </div>
                    <div className="chart-buttons">
                        <button>1D</button>
                        <button>1W</button>
                        <button>1M</button>
                        <button>3M</button>
                        <button>1Y</button>
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
                            <div className="description-tag1">
                                <div>
                                    <p className="ceo-label">CEO</p>
                                    <p>{stockinfo.CEO}</p>
                                </div>
                                

                                <div className="employee">
                                    <p className="employee-label">Employees</p>
                                    <p>{stockinfo.employees}</p>
                                </div>
                                <div className="marketcap">
                                    <p className="marketcap-label">Market Cap</p>
                                    <p>{qoute.marketCap}</p>
                                </div>

                                <div className="volume">
                                    <p>Volume</p>
                                    <p>{qoute.avgTotalVolume}</p>
                                </div>


                            </div>

                            <div className="description-tag2">
                                <div>
                                    <p>52 Week High</p>
                                    <p>{qoute.week52High}</p>
                                </div>

                                <div className="low">
                                    <p>52 Week Low</p>
                                    <p>{qoute.week52Low}</p>
                                </div>

                                <div className="openPrice">
                                    <p>Open Price</p>
                                    <p>{qoute.open}</p>
                                </div>

                                <div className="hightoday">
                                    <p>High Today</p>
                                    <p>{qoute.high}</p>
                                </div>

                            </div>

                        </div>
                       
                        {/* <div className="description-tag3">
                            <p>Low Today{qoute.low}</p>
                            <p>Average Volume{qoute.avgTotalVolume}</p>
                            <p>Price Earning Ratio{qoute.peRatio}</p>

                        </div> */}
                        

                    </div>
                </div> 

            </div>
        );



    }

}

export default StockInfo;