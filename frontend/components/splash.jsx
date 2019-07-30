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

                    <Link to="/signup"><button>Signup</button></Link>
                    <br>
                    </br>
                    <Link to="/login"><button>Login</button></Link>
                    <br>
                    </br>
                    <p>Invest Commision-Free</p>

                    <article>Invest in stocks, ETFs, options, and cryptocurrencies, all commission-free, right from your phone or desktop.</article>

                </div>
            );
        }

    }



}

export default Splash;