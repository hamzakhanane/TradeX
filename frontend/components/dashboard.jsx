import React from "react";
import { Link } from 'react-router-dom';
import {SearchContainer} from "./search_container"
class DashBoard extends React.Component{

    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(){
        this.props.logout(this.props.currentUser)
        
        // this.props.history.push("/login");
    }



    render(){
            return (
                <div className="navbar">
                    <Link className="a_tag_dash" to="/dashboard">
                        <img className="logo_image_signup_dash" src={window.logoImage} />
                    </Link>
                    <SearchContainer className="dash-search"/>
                    {/* <input className="search-bar" type="search" name="" id="" placeholder="Search"/> */}
                    {/* <h2>"Welcome {this.props.currentUser.username}!!!"</h2> */}
                    <button className="logout-dash" onClick={this.handleLogout}>Logout</button>
                </div>
            );
    }
}

export default DashBoard;



