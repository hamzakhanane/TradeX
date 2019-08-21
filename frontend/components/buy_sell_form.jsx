import React from "react";


class BuySellForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            totalCost:0,
            numShares:0,
            message: "",
            button_text: "BUY"
            
        }

        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clickSell = this.clickSell.bind(this);
        this.clickBuy = this.clickBuy.bind(this);
    }


    componentDidMount(){
        // debugger
       
    }

    handleSubmit(){
        debugger
        let { StockObject } = this.props;
        let { currentUser } = this.props;
        if(currentUser.buying_power >= this.state.totalCost){
            let trans = {};
            let new_buying_power = currentUser.buying_power - this.state.totalCost;
            
            currentUser.buying_power = new_buying_power;
            this.props.updateUser(currentUser);
            trans["stock_id"] = StockObject.id;
            trans["total_cost"] = this.state.totalCost;
            trans["num_stocks"] = this.state.numShares;
            trans["currentUser"] = currentUser;
           
            let obj = {"transaction":trans};
            this.props.createTransaction(obj);
        }
        else{
            this.setState({ message: "You do not have enough buying power" })
            
        }


        // debugger


    }


    // componentDidUpdate(){
    //    this.state = {
    //         totalCost: 0,
    //         numShares: 0,
    //             message: "",

    //    }
    // }
        
        

        

   
    
    updateEstimatedPrice(e){

    
       

    }

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
        // debugger
        let {currentUser} = this.props;
        let {StockObject} = this.props;
        let { StockName } = this.props;
        let { CurrentPrice } = this.props;
        let { totalCost} = this.state;
    
      
        return (

        <div className="form-container">
            <div className="form-heading">
                    <button onClick={this.clickBuy}>Buy {StockName}</button>
                 <button onClick={this.clickSell}>Sell {StockName}</button>
            </div>
           <div className="share-price-container">
                <div className="share-input-container">
                <label>Shares</label>
                
                <input className="share-input" type="number" value={this.state.numShares} onChange={this.handleUpdate("numShares")} />
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
                        <span>your current buying power is {currentUser.buying_power}</span>
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