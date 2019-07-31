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
                    <h2>SignUp</h2>
                    <Link to="/login">Login</Link>
                    <form onSubmit={this.handleSubmit}>
                        {this.renderErrors()}
                        <label>
                            Username
                        <input type="text" name="{this.props.user.username}" value={this.state.username} onChange={this.handleUpdate("username")} />
                        </label>
                        <label>
                            Password
                        <input type="password" name="{this.props.user.password}" value={this.state.password} onChange={this.handleUpdate("password")} />
                        </label>
                        <label>
                            Firstname
                        <input type="text" name="{this.props.user.first_name}" value={this.state.first_name} onChange={this.handleUpdate("first_name")} />
                        </label>
                        <label>
                            Lastname
                        <input type="text" name="{this.props.user.last_name}" value={this.state.last_name} onChange={this.handleUpdate("last_name")} />
                        </label>
                        <button onClick={this.handleSubmit}> SignUp</button>

                    </form>

                </div>
            )

        } else {

            return (<div>
                <h2>LogIn</h2>
                <Link to="/signup">Signup</Link>
                <form onSubmit={this.handleSubmit}>
                    {this.renderErrors()}
                    <label>
                        Username
                        <input type="text" name="{this.props.user.username}" value={this.state.username} onChange={this.handleUpdate("username")} />
                    </label>
                    <label>
                        Password
                        <input type="password" name="{this.props.user.password}" value={this.state.password} onChange={this.handleUpdate("password")} />
                    </label>

                    <button onClick={this.handleSubmit}>Login</button>

                </form>

            </div>)

        }

    }

}

export default SessionForm;