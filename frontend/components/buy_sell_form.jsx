import React from "react";

class BuySellForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            totalCost:0,
            numShares:0
        }

        this.handleUpdate = this.handleUpdate.bind(this);
    }


    componentDidMount(){
        // debugger
       
    }


    componentDidUpdate(){

    }
    
    updateEstimatedPrice(e){

    
       

    }

    handleUpdate(type) {
        return (e) => {

            this.setState({ [type]: e.target.value });
            this.setState({ ["totalCost"]: Number(e.target.value) * Number(this.props.CurrentPrice)})

        }
    }


    render(){

        let { StockName } = this.props;
        let { CurrentPrice } = this.props;
        let { totalCost} = this.state;
    
      
        return (

        <div className="form-container">
            <div className="form-heading">
                 <button>Buy {StockName}</button>
                 <button>Sell {StockName}</button>
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

                    <div className="review-button-container">
                        <button className="review-button">Review Order</button>
                    </div>
                   
                   
            </div>

            
        </div>



    );

    }
}
export default BuySellForm;