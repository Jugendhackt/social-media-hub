import Content from "./components/Content";
import React from "react";

class CntTimeline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            windowWidth: 0,
            windowHeight: 0
        };

        this.updateDimensions = this.updateDimensions.bind(this);
    }
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
        const styles = {
            white: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            black: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            light_gray: (opacity = 1) => `rgba(196, 196, 196, ${opacity})`,
            topBarHeight: 40,
            footerMenuHeight: 50,
            showFooterMenuText: this.state.windowWidth > 500,
            showSidebar: this.state.windowWidth > 768,
            sidebarWidth: 325
        };
        return(
        <Content styles={styles} timelineItems={[{
            platform: "reddit",
            link: "https://google.com",
            title: "This is an example!",
            msg: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        }, {
            platform: "reddit",
            link: "https://google.com",
            title: "This is an example!",
            msg: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        }, {
            platform: "reddit",
            link: "https://google.com",
            title: "This is an example!",
            msg: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        }, {
            platform: "reddit",
            link: "https://google.com",
            title: "This is an example!",
            msg: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        }, {
            platform: "reddit",
            link: "https://google.com",
            title: "This is an example!",
            msg: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        }, {
            platform: "reddit",
            link: "https://google.com",
            title: "This is an example!",
            msg: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        }]}/>);
    }
}

export default CntTimeline;