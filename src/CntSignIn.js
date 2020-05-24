import React, {Suspense} from "react";
import {Route, Switch} from "react-router-dom";
// const CntTools = React.lazy(() => import("./CntTools"));
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class CntSignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            remember: true,
            loading: false,
            error: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState(  {[name]: value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.handleLogin();
    }

    handleLogin() {
        let formData = new FormData();
        formData.append('user', this.state.username);
        formData.append('pw', this.state.password);
        this.state.loading = true;
        axios({
            method: 'post',
            url: 'http://localhost:5000/login',
            data: formData,
            headers: {'Content-Type': 'multipart/form-data'}
        }).then(response => {
            if (response.data.error === false) {
                this.props.toggleLoggedIn();
                console.log(response);
                toast.success('Logged in successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            } else {
                this.setState({error: response.data.msg});
                toast.error('Error logging in:\n' + response.data.msg, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            }

        }).catch(error => {
            toast.error('Error logging in. See log for more details.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
            this.state.loading = false;
            if (error.response) {
                // Request made and server responded
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error: ', error.message);
            }
        });
    }

    renderToasts() {

    }

    loggedInToast = () => toast("Logged in successfully!");
    errorToast = () => toast("Couldn't log in:\n" + this.state.error);
    render() {

        return (
            <div style={{
                backgroundColor: "rgba(0, 0, 0, 0)",
                minHeight: "100vh",
                position: "relative",
                marginLeft: "500px"
            }}>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnVisibilityChange
                    draggable
                    pauseOnHover
                />
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Username:
                        <input name="username" type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <br/><br/>
                    <label>
                        Password:
                        <input name="password" type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <br/><br/>
                    <label>
                        Remember:
                        <input name="remember" type="checkbox" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <br/><br/>
                    <input type="submit" value="Submit" />
                </form>
            </div>

        );
    }
}
export default CntSignIn;
