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
                        <img className="background-image" src={window.splashImage} />
                    </div>
    

                    <div>
                        <h2 className="logo">Trade X</h2>
                        <aside className="buttons">

                            <Link className="loginLink" to="/login">Log In</Link>
                            <Link className="Signup" to="/signup">Sign Up</Link>


                        </aside>
                       
                    </div>
                    <div>

                    
            
                        <div className="invest-block">
                        <p className="invest-word">Invest</p>
                        <p className="commision-word">Commision-Free</p>

                        </div>

                        <div>
                        <article className="invest-para">Invest in stocks, ETFs, options, and
                        <br/>
                         cryptocurrencies, all commission-free,
                         <br/> 
                         right from your phone or desktop.</article>
                        </div>

                        <Link className="Signup_second" to="/signup">Sign Up</Link>
                    
                    </div>


                </div>
            );
        }

    }



}

export default Splash;