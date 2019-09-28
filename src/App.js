import React, { Component } from "react";
import TopBar from "./components/TopBar";
import FooterMenu from "./components/FooterMenu";
import Content from "./components/Content";
import Sidebar from "./components/Sidebar";


import reddit_icon from './assets/reddit.svg';
import twitter_icon from './assets/twitter.svg';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      windowWidth: 0,
      windowHeight: 0
    };

    this.updateDimensions = this.updateDimensions.bind(this);
  }

  myCallBack = (sidebarinfo) => {
    //was macht ihr damit
  };
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions() {
    let windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
    let windowHeight = typeof window !== "undefined" ? window.innerHeight : 0;

    this.setState({ windowWidth, windowHeight });
  }

  render() {
    let isLoggedIn = false;
    //let currentChoice = "all";

    const { windowWidth } = this.state;
    const styles = {
      white: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      black: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      light_gray: (opacity = 1) => `rgba(196, 196, 196, ${opacity})`,
      topBarHeight: 40,
      footerMenuHeight: 50,
      showFooterMenuText: windowWidth > 500,
      showSidebar: windowWidth > 768,
      sidebarWidth: 325
    };

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
        <Sidebar menuItems={menuItems} isLoggedIn={isLoggedIn} /*callbackFromParent={{myCallBack}} *//>
        <Content styles={styles} timelineItems={[{platform: "reddit", link: "https://google.com", title: "This is an example!", msg: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}, {platform: "reddit", link: "https://google.com", title: "This is an example!", msg: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}, {platform: "reddit", link: "https://google.com", title: "This is an example!", msg: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}, {platform: "reddit", link: "https://google.com", title: "This is an example!", msg: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}, {platform: "reddit", link: "https://google.com", title: "This is an example!", msg: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}, {platform: "reddit", link: "https://google.com", title: "This is an example!", msg: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}]} />
        </div>
    );
  }
}

export default App;