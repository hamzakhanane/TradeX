import React from "react";
import {withRouter} from "react-router-dom";


class BuySellForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            totalCost:0,
            numShares:null,
            message: "",
            button_text: "BUY",
            portfolio:{}
             
        }
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clickSell = this.clickSell.bind(this);
        this.clickBuy = this.clickBuy.bind(this);
        
        
    }



   

    // componentDidUpdate(prevProps, prevState) {
    //     debugger
    //     // const stockId = this.props.match.params.stockId;
    //     // if (stockId !== prevProps.match.params.stockId) {
    //     //     this.setState({
    //     //         totalCost: 0,
    //     //         numShares: 0,
    //     //         message: "",
    //     //         button_text: "BUY",
    //     //         portfolio: {}

    //     //     });
    //     // }
    // }


    componentDidMount(){
        let { currentUser } = this.props;
        let {StockObject} = this.props;
        this.props.receivePortfolio(currentUser).then((resp) => {
            this.setState({portfolio:resp.portfolio})
           
        })

        this.selecButton();
        document.getElementById("error").style.display = "none";
        
    
       
    }

    componentDidUpdate(prevProps){
        const stockId = this.props.match.params.stockId;
     
        if (stockId !== prevProps.match.params.stockId) {
          
            this.setState({
                totalCost: 0,
                numShares: 0,
                message: "",
                button_text: "BUY",
                // portfolio: {}

            });
        }
    }
   

    handleSubmit(){
       
        let { StockObject } = this.props;
        let { currentUser } = this.props;
      
        if(this.state.button_text==="BUY"){
            if (currentUser.buying_power >= this.state.totalCost) {
                let trans = {};
                let port = {};
                let new_buying_power = currentUser.buying_power - this.state.totalCost;
                
                currentUser.buying_power = new_buying_power;
                this.props.updateUser(currentUser);
                port["num_stocks"] = this.state.numShares;
                port["stock_id"] = StockObject.id;
                port["currentUser"] = currentUser;
                trans["stock_id"] = StockObject.id;
                trans["total_cost"] = this.state.totalCost;
                trans["num_stocks"] = this.state.numShares;
                trans["currentUser"] = currentUser;

                let obj = { "transaction": trans };
                let obj2 = { "portfolio": port };
                this.props.createTransaction(obj);
                //update portfolio if already bought
                let found = false;
                let { portfolio } = this.state;
                let owned_stocks = Object.values(portfolio);
                if (owned_stocks.length > 0) {
                    for (let i = 0; i < owned_stocks.length; i++) {
                        if (owned_stocks[i].stock_id === StockObject.id) {
                            found = true;
                            let new_num_share = Number(this.state.numShares) + owned_stocks[i].num_stocks
                            owned_stocks[i].num_stocks = new_num_share;
                            
                            this.props.updatePortfolio(owned_stocks[i]);
                        }
                    }
                    if (found === false) {
                      
                        this.props.createPortfolio(obj2).then(()=>{
                            this.props.receivePortfolio(currentUser).then((resp) => {
                                this.setState({ portfolio: resp.portfolio })

                            })
                        })
                    }
                }
                else if (found === false) {
                      
                    this.props.createPortfolio(obj2).then(() => {
                        this.props.receivePortfolio(currentUser).then((resp) => {
                            this.setState({ portfolio: resp.portfolio })

                        })

                    })
                }
                else {
                   
                    this.props.createPortfolio(obj2).then(() => {
                        this.props.receivePortfolio(currentUser).then((resp) => {
                            this.setState({ portfolio: resp.portfolio })

                        })

                    })
                }
                this.forceUpdate();
               
            }
            else {
                document.getElementById("error").style.display = "block";
                this.setState({ message: "Not Enough Buying Power" })

            }

        }
        else{
            if (Number(this.state.numShares) === 0) { 
                document.getElementById("error").style.display = "block";
                this.setState({ message: "Please Enter A Valid Number" })}
            let found = false;
            let trans = {};
            let { portfolio } = this.state;
            let owned_stocks = Object.values(portfolio);
            
            if (owned_stocks.length > 0) {
                for (let i = 0; i < owned_stocks.length; i++) {
                    if (owned_stocks[i].stock_id === StockObject.id) {
                        found = true;
                        
                        if (Number(this.state.numShares) <= owned_stocks[i].num_stocks)
                        {
                            
                            let new_buying_power = currentUser.buying_power + this.state.totalCost;
                            currentUser.buying_power = new_buying_power;
                            
                            let new_num_share = owned_stocks[i].num_stocks - Number(this.state.numShares)
                            owned_stocks[i].num_stocks = new_num_share;
                            this.props.updatePortfolio(owned_stocks[i]);
                            trans["stock_id"] = StockObject.id;
                            trans["total_cost"] = -1 * this.state.totalCost;
                            trans["num_stocks"] = -1 * this.state.numShares;
                            trans["currentUser"] = currentUser;
                            let obj = { "transaction": trans };
                            
                            this.props.updateUser(currentUser);
                            this.props.createTransaction(obj);

                        }else{
                            document.getElementById("error").style.display = "block";
                            this.setState({ message: "You Do Not Have Enough Shares" })
                        }

                    }
                }
                if (found === false) {
                    alert("you do not have enough shares");
                }
            }

            this.setState({
                totalCost: 0,
                numShares: 0,
                // message: "",
                button_text: "BUY"

            });

        }

        this.render();

    }


    // componentDidUpdate(prevProps, prevState) {
    //     const stockObject = this.props.stockObject;
    //     if (stockId !== prevProps.stockObject) {
    //         this.setState({
    //             totalCost: 0,
    //             numShares: 0,
    //             message: "",
    //             button_text: "BUY"

    //         });
    //     }
    // }
        
        

        



    handleUpdate(type) {
        return (e) => {
            
            this.setState({ [type]: e.target.value });
            this.setState({ ["totalCost"]: Number(e.target.value) * Number(this.props.CurrentPrice)})
        
        }
    }

    clickSell(){
        this.setState({button_text:"SELL"})
    }
    clickBuy() {
        this.setState({ button_text: "BUY" })
    }

    selecButton(){
        let buy = document.getElementById("buy").focus();
       
    }


    render(){
        let {currentUser} = this.props;
        let {StockObject} = this.props;
        let { StockName } = this.props;
        let { CurrentPrice } = this.props;
        let { totalCost} = this.state;
        let existing_shares = 0;
        let { portfolio } = this.state;
        let owned_stocks = Object.values(portfolio);
        if (owned_stocks.length > 0) {
            if (typeof StockObject !== 'undefined') {
                for (let i = 0; i < owned_stocks.length; i++) {
                    if (owned_stocks[i].stock_id === StockObject.id) {
                       existing_shares = owned_stocks[i].num_stocks
                    }
                }
            }
            


        }

        
        return (
            
        <div className="form-container">
            <div className="form-heading">
                    <button id="buy" className="buy-button" onClick={this.clickBuy}>Buy {StockName}</button>
                 <button className="sell-button" onClick={this.clickSell}>Sell {StockName}</button>
            </div>
           <div className="share-price-container">
                <div className="share-input-container">
                <label>Shares</label>
                
                <input className="share-input" type="number" value={this.state.numShares} onChange={this.handleUpdate("numShares")} placeholder="0" />
                </div>
                

                <div className="market-price">
                    <span className="market-price-text">Market Price</span>
                    <span>${CurrentPrice}</span>
                </div>
            </div>

            <div className="button-cost-container">
                    <div className="estimated-cost">
                        <span>Estimated Cost</span>
                        <span>${totalCost.toFixed(2)}</span>
                        
                    </div>

                    <div className="review-button-container">
                        
                        <div className="error-container" id="error">
                            <i class="fas fa-exclamation-circle"></i>
                            <span>  {this.state.message}</span>
                        </div>
                        
                      
                        <button onClick={this.handleSubmit} className="review-button">{this.state.button_text}</button>
                    </div>

                    <div className="buying-power-container">
                        <span>{currentUser.buying_power.toFixed(2)} Buying Power Available</span>
                    </div>

                    <div className="existing-share-container">
                        <span className="shares-text">You Own {existing_shares} shares</span>
                    </div>
                  
        
                       
                   
            </div>

            
        </div>



    );

    }
}

export default withRouter(BuySellForm);