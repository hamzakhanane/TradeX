import React from "react";


class BuySellForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            totalCost:0,
            numShares:0,
            message: "",
            button_text: "BUY",
            portfolio:{}
             
        }
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clickSell = this.clickSell.bind(this);
        this.clickBuy = this.clickBuy.bind(this);
        
    }


    componentDidMount(){
        let { currentUser } = this.props;
        let {StockObject} = this.props;
        this.props.receivePortfolio(currentUser).then((resp) => {
            this.setState({portfolio:resp.portfolio})
           
        })
    
       
    }
    // // setExistingShares(){
    // //
    // }

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
                        this.props.createPortfolio(obj2);
                    }
                }
                else if (found === false) {
                    this.props.createPortfolio(obj2);
                }
                else {
                    this.props.createPortfolio(obj2);
                }
                this.setState({
                    totalCost: 0,
                    numShares: 0,
                    message: "",
                    button_text: "BUY"

                });
               
            }
            else {
                this.setState({ message: "You do not have enough buying power" })

            }

        }
        else{
            if(Number(this.state.numShares)===0){alert("please enter a valid number of shares");}
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
                            debugger
                            let new_buying_power = currentUser.buying_power + this.state.totalCost;
                            currentUser.buying_power = new_buying_power;
                            debugger
                            let new_num_share = owned_stocks[i].num_stocks - Number(this.state.numShares)
                            owned_stocks[i].num_stocks = new_num_share;
                            this.props.updatePortfolio(owned_stocks[i]);
                            trans["stock_id"] = StockObject.id;
                            trans["total_cost"] = -1 * this.state.totalCost;
                            trans["num_stocks"] = -1 * this.state.numShares;
                            trans["currentUser"] = currentUser;
                            let obj = { "transaction": trans };
                            debugger
                            this.props.updateUser(currentUser);
                            this.props.createTransaction(obj);

                        }
                        else{
                            alert("you do not have enough shares");
                        }
                    
                    }
                }
            }

            this.setState({
                totalCost: 0,
                numShares: 0,
                message: "",
                button_text: "BUY"

            });

        }

        // this.render();

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
                    <button onClick={this.clickBuy}>Buy {StockName}</button>
                 <button onClick={this.clickSell}>Sell {StockName}</button>
            </div>
           <div className="share-price-container">
                <div className="share-input-container">
                <label>Shares</label>
                
                <input className="share-input" type="text" value={this.state.numShares} onChange={this.handleUpdate("numShares")} />
                </div>

                <div className="market-price">
                    <span>Market Price</span>
                    <span>${CurrentPrice}</span>
                </div>
            </div>

            <div className="button-cost-container">
                    <div className="estimated-cost">
                        <span>Estimated Cost</span>
                        <span>${totalCost.toFixed(2)}</span>

                    </div>
                    <div>
                        <span>you own {existing_shares} shares</span>
                    </div>
                    <div>
                        <span>your current buying power is {currentUser.buying_power.toFixed(2)}</span>
                    </div>
                    <div>
                        <span>{this.state.message}</span>
                    </div>

                    <div className="review-button-container">
                        <button onClick={this.handleSubmit} className="review-button">{this.state.button_text}</button>
                    </div>
                   
                   
            </div>

            
        </div>



    );

    }
}
export default BuySellForm;