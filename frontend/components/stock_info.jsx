import React from "react";
import {fetchInfo,fetchQoutes,fetchCharts} from "../util/stock_info_api_util"

class StockInfo extends React.Component{

    constructor(props){
        super(props);
        this.state = {stockinfo: {}, 
        qoute:{}, 
        charts:{
            "1D":[],
            "1M": [],
            "1Y": []
        }
    };
    }

    componentDidMount(){
        const stockId = this.props.match.params.stockId;
       
        this.props.fetchStock(stockId).then((resp) => {
            const ticker = resp.stock.ticker
            fetchInfo(ticker)
                .then(stockinfo => this.setState({ stockinfo }));
            fetchQoutes(ticker)
                .then(qoute => this.setState({ qoute }));
            fetchCharts(ticker, "1D")
                    .then(charts => {
                        const newData = Object.assign({}, this.state.charts);
                        newData["1D"] = charts;
                        this.setState({charts: newData})
                    });
            fetchCharts(ticker, "1M")
                .then(charts => {
                    const newData = Object.assign({}, this.state.charts);
                    newData["1M"] = charts;
                    this.setState({ charts: newData })
                });
            fetchCharts(ticker, "1Y")
                .then(charts => {
                    const newData = Object.assign({}, this.state.charts);
                    newData["1Y"] = charts;
                    this.setState({ charts: newData })
                });
        })


    }

    // componentDidUpdate(prevPropsx, prevState) {
    //     const stockId = this.props.match.params.stockId;
    //     if (stockId !== prevProps.match.params.stockId) {
    //         this.setState({
    //             intervalFunction: null,
    //             stockinfo: {},
    //             qoute:{}
    //         });

    //         this.props.fetchStock(stockId).then((resp) => {
    //             const ticker = resp.stock.ticker
    //             fetchInfo(ticker)
    //                 .then(stockinfo => this.setState({ stockinfo }));
    //         })

    //         this.props.fetchStock(stockId).then((resp) => {
    //             const ticker = resp.stock.ticker
    //             fetchQoutes(ticker)
    //                 .then(qoute => this.setState({ qoute }));
    //         });
  
    //     }
    // }

    

    



    

    render(){
        const {stockinfo} = this.state; 
        const {qoute} = this.state;
        const day_char = this.state.charts["1D"];
        const month_char = this.state.charts["1M"];
        const year_char = this.state.charts["1Y"];

        debugger
        return(
            <div>
                <div>
                    <h2>{stockinfo.companyName}</h2>
                    <p>{qoute.latestPrice}</p>
                    <p>{qoute.change}{qoute.changePercent}</p>
                </div>



                <div>
                    <h3>About</h3>
                    <p>{stockinfo.symbol}</p>
                    <p>{stockinfo.description}</p>
                    <p>CEO{stockinfo.CEO}</p>
                    <p>Employees{stockinfo.employees}</p>
                    <p>Market Cap {qoute.marketCap}</p>
                    <p>Volume {qoute.volume}</p>
                    <p>52 Week High{qoute.week52High}</p>
                    <p>52 Week Low{qoute.week52Low}</p>
                    <p>Open Price{qoute.open}</p>
                    <p>High Today{qoute.high}</p>
                    <p>Low Today{qoute.low}</p>
                    <p>Average Volume{qoute.avgTotalVolume}</p>
                    <p>Price Earning Ratio{qoute.peRatio}</p>

                </div>

            </div>
        );



    }

}

export default StockInfo;