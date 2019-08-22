import React from "react";
import { Link } from 'react-router-dom';
import { withRouter, Route, Redirect } from 'react-router-dom';

class SessionForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            first_name: "",
            last_name: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDemoUser = this.handleDemoUser.bind(this);
       
    }

    componentWillUnmount(){
        this.props.clearErrors();
    }

    handleDemoUser(){
        this.state.username = "demoUser";
        this.state.password = "hunter12";
        this.state.first_name = "demo";
        this.state.last_name = "user";
        const user = Object.assign({}, this.state);
        this.props.processForm(user);
        this.props.history.push("/dashboard");
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.processForm(user);
        // this.props.history.push("/dashboard");
    }

    handleUpdate(type) {
        return (e) => {
            this.setState({ [type]: e.target.value });
        }
    }
    

    renderErrors() {
       
        return (
            <ul className="error">
                {this.props.errors.map((error, i) => (
                    <li className="error" key={`error-${i}`}>
                        {error}
                    </li>
                ))}
            </ul>
        );
    }


    render() {
        if (this.props.formType === "signup") {
            return (
                <div>
                    <div>
                        <Link className="a_tag" to="/">
                            <img className="logo_image_signup" src={window.logoImage} />
                        </Link>
                    </div>
                
                    <div className="form_box">
                        <h2 className="money">Make Your Money Move</h2>
                        <h3 className="intro">TradeX lets you invest in companies you love, commission-free.</h3>
                        {/* <Link to="/login">Login</Link> */}
                        <form onSubmit={this.handleSubmit}>
                            <div className="input_box">
                    
                                {this.renderErrors()}
                                <input required className="input_first_name" type="text" name="{this.props.user.first_name}" value={this.state.first_name} onChange={this.handleUpdate("first_name")} placeholder="firstname" />


                                <input required className="input_last_name" type="text" name="{this.props.user.last_name}" value={this.state.last_name} onChange={this.handleUpdate("last_name")} placeholder="lastname" />
                            
                                <input required className="input_username" type="text" name="{this.props.user.username}" value={this.state.username} onChange={this.handleUpdate("username")} placeholder="username"/>
                                
                                <input required className="input_password" type="password" name="{this.props.user.password}" value={this.state.password} onChange={this.handleUpdate("password")} placeholder="password [min. 6 characters]" />
                            
                        
                                <button className="continue_button" onClick={this.handleSubmit}>Continue</button>
                            </div>

                        </form>

                    </div>
                </div>
            )

        } else {

            return (
                
                <div className="page">
                    <div className="login-img-div">
                        <img className="login-image" src={window.loginImage} />
                    </div>
                    <div className="form-div">
                            <h2 className="welcome_msg">Welcome to TradeX</h2>
                            <form className="form" onSubmit={this.handleSubmit}>
                            {this.renderErrors()}
                            <label className="username">
                                Username
                                <input required className="login-username" type="text" name="{this.props.user.username}" value={this.state.username} onChange={this.handleUpdate("username")} />
                            </label>
                            <label className="password">
                                Password
                                <input required className="login-password" type="password" name="{this.props.user.password}" value={this.state.password} onChange={this.handleUpdate("password")} />
                            </label>
                            <button className="SignIn_Button" onClick={this.handleSubmit}>Sign In</button>
                            <button className="DemoUser_Button" onClick={this.handleDemoUser}>Demo User</button>
                            <Link className="sign_link_login" to="/signup">Sign Up</Link>
                            

                            </form>

                    </div>
            </div >
            )

        }

    }

}

export default withRouter(SessionForm);