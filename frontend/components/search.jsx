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
        if(this.state.search_q.length===0){
            this.setState({ searched_stock: [] })
        }
        this.setState({
                search_q: e.target.value, 
            
        },
            () => this.props.fetchAllStocks(this.state.search_q).then(stocks=>this.setState({ searched_stock: this.props.stocks }))
        );

        
       

    }

    // componentDidUpdate(prevProps){
    //     if(this.state.search_q.length===0){
    //         this.setState({searched_stock:[]})
    //     }
       
        
    // }
          
           

   

    render(){
    
        let stockList=[]
       
        let arr_stock = Object.values(this.state.searched_stock);
        if(this.state.search_q.length===0){
            arr_stock = [];
        }
        if (arr_stock.length>0){
            let size = arr_stock.length;
            // debugger
            if(arr_stock.length>10){
                size = 10;
            }
           
            for (let i = 0; i < size; i++){
                
                let l = `/stock/${arr_stock[i].id}`;
                stockList.push(<Link className="link" to={l}>
                    <li className="element" key={`stock-id${arr_stock[i].id}`}>  &nbsp;{arr_stock[i].ticker} &nbsp;&nbsp; {arr_stock[i].company_name}</li>
                </Link>);
                
                
            }
           
    
        }

        // debugger
       
        
        return(


            
             
        <ul className="search-container">
            
           <li className="input-icons">
                <i class="fas fa-search"></i>
                <input className="search-input" onKeyUp={this.queryUpdate} type="search" name="" id="" placeholder="Search" />
            </li>
            
            <li>

                <ul className="searchList">
                    {stockList}
                </ul>
            </li>
        
         </ul>
               

           
        
        
        );

    }


}

export default SearchComponent;