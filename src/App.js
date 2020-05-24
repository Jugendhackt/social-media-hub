import React, { Component } from "react";
import TopBar from "./components/TopBar";
import FooterMenu from "./components/FooterMenu";
import Content from "./components/Content";
import Sidebar from "./components/Sidebar";


import reddit_icon from './assets/reddit.svg';
import twitter_icon from './assets/twitter.svg';
import Main from "./Main";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
class App extends Component {



    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        };

        this.toggleLoggedIn = this.toggleLoggedIn.bind(this);
    }

    toggleLoggedIn() {
        console.log("Now " + (!this.state.loggedIn ? "logged in!" : "logged out!"));
        this.setState({
            loggedIn: !this.state.loggedIn
        })
    }

    render() {
        const menuItems = [
          { icon: reddit_icon, text: "Reddit" },
          { icon: twitter_icon, text: "Twitter" }
        ];

        return (
            <div style={{
                  backgroundColor: "rgba(0, 0, 0, 0)",
                  minHeight: "100vh",
                  position: "relative"
                }}>
            <Sidebar menuItems={menuItems} isLoggedIn={this.state.loggedIn}/>
            <Main toggleLoggedIn={this.toggleLoggedIn}/>
            </div>
        );
    }
}

export default App;