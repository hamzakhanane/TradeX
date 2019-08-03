import React from "react";
class StockInfo extends React.Component{

    constructor(props){
        super(props);
    }

    componentDidMount(){
        // debugger
        const stockId = this.props.match.params.stockId;
        // const
        // this.props.fetchStockInfo(stockId);
    }
    

    render(){

        return(
            <div>
                <div>
                    <h3>Stock Name</h3>
                </div>

            </div>
        );



    }

}

export default StockInfo;