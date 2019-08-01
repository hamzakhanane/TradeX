import React from "react";
import { Link } from 'react-router-dom';
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
    }

    componentWillUnmount(){
        this.props.clearErrors();
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);

        this.props.processForm(user);
    }

    handleUpdate(type) {
        return (e) => {
            this.setState({ [type]: e.target.value });
        }
    }

    renderErrors() {
        // debugger
        return (
            <ul>
                {this.props.errors.map((error, i) => (
                    <li key={`error-${i}`}>
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
                    <h2>Make Your Money Move</h2>
                    <h3>Robinhoops lets you invest in athletes you love, commission-free.</h3>
                    <Link to="/login">Login</Link>
                    <form onSubmit={this.handleSubmit}>
                        {this.renderErrors()}
                       
                        <input type="text" name="{this.props.user.username}" value={this.state.username} onChange={this.handleUpdate("username")} />
                        
                        <input type="password" name="{this.props.user.password}" value={this.state.password} onChange={this.handleUpdate("password")} />
                        
                    
                        <input type="text" name="{this.props.user.first_name}" value={this.state.first_name} onChange={this.handleUpdate("first_name")} />
                        
                        
                        <input type="text" name="{this.props.user.last_name}" value={this.state.last_name} onChange={this.handleUpdate("last_name")} />
                
                        <button onClick={this.handleSubmit}> SignUp</button>

                    </form>

                </div>
            )

        } else {

            return (
                <div className="page">
                    <img className="login-image" src={window.loginImage} />
                <div className="form-div">
                        <h2 className="welcome_msg">Welcome to TradeX</h2>
                        <form className="form" onSubmit={this.handleSubmit}>
                        {this.renderErrors()}
                        <label className="username">
                            Username
                            <input className="input-username" type="text" name="{this.props.user.username}" value={this.state.username} onChange={this.handleUpdate("username")} />
                        </label>
                        <label className="password">
                            Password
                            <input className="input-password" type="password" name="{this.props.user.password}" value={this.state.password} onChange={this.handleUpdate("password")} />
                        </label>

                        <button className="SignIn_Button" onClick={this.handleSubmit}>Sign In</button>

                        </form>

                </div>
            </div >
            )

        }

    }

}

export default SessionForm;