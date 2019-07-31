import React from "react";
import { Link } from 'react-router-dom';
class Splash extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("it works");

    }



    render() {
        let logged_in;
        if (typeof this.props.user === "undefined") {
            logged_in = false;
        }
        else {
            logged_in = true;
        }
        if (logged_in) {
            return (
                <div>
                    <h2>"Welcome {this.props.user.username}"</h2>
                    <button onClick={() => this.props.logout(this.props.user)}>Logout</button>
                </div>
            );
        }
        else {
            return (
                <div>
                    <div>
                        <Link to="/signup"><button className="Signup">Sign Up</button></Link>
                        <br>
                        </br>
                        <Link className="loginLink" to="/login">Log In</Link>
                    </div>
            
                    <div className="invest-block">
                        <p className="invest-word">Invest</p>
                        <p className="commision-word">Commision-Free</p>

                    </div>

                    <article>Invest in stocks, ETFs, options, and cryptocurrencies, all commission-free, right from your phone or desktop.</article>

                </div>
            );
        }

    }



}

export default Splash;