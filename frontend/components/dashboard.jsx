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
                <div>
                    <ul className="navbar">
                        <li className="logo-container"><Link className="a_tag_dash" to="/dashboard">
                            <img className="logo_image_signup_dash" src={window.logoImage} />
                        </Link></li>
                        
                        <li className="dash-search"><SearchContainer/></li>
                        

                        <li className="logout-dash">
                            <button onClick={this.handleLogout}>Logout</button>  
                        </li>
                        
                    </ul>
                </div>
            );
    }
}

export default DashBoard;



