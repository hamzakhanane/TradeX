import React from "react";
import { Link } from 'react-router-dom';

class SearchComponent extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            searched_stock:[],
            search_q: "",
        }

        this.queryUpdate = this.queryUpdate.bind(this);

        
    }

    componentDidMount(){
        
        this.props.fetchAllStocks(this.state.search_q).then(stocks => this.setState({ searched_stock:this.props.stocks }));
        
    }

    queryUpdate(e) {
         
        this.setState({
                search_q: e.target.value, 
            
        },
            () => this.props.fetchAllStocks(this.state.search_q).then(stocks=>this.setState({ searched_stock: this.props.stocks }))
        );

        
       

    }

    componentDidUpdate(prevProps){
        // debugger
        // const stocks = this.props.stocks;
        // if (stocks !== prevProps.stocks) {
        //     this.state={
        //         searched_stock: [],

        //     }
        //     this.props.fetchAllStocks(this.state.search_q).then(stocks => this.setState({ searched_stock: stocks }));
        // }
    }
          
           

   

    render(){
        let stockList=[]
        // debugger
        let arr_stock = Object.values(this.state.searched_stock);
        if (arr_stock.length>0){
            // debugger
           
            for (let i = 0; i < arr_stock.length; i++){
                // debugger
                let l = `/stock/${arr_stock[i].id}`;
                stockList.push(<li key={`stock-id${arr_stock[i].id}`}> <Link to={l}>{arr_stock[i].company_name}</Link> {arr_stock[i].ticker}</li>)
               
            }
           
    
        }

        // debugger
       
        
        return(


            <div>
                <div className="searchContainer">
                    <input onKeyUp={this.queryUpdate} className="search-bar" type="search" name="" id="" placeholder="Search" />
                </div>
                <ul>
                    {stockList}
                </ul>

            </div>
        
        
        );

    }


}

export default SearchComponent;