import React from "react";
import summary_icon from '../assets/summary.svg';
import "../assets/Sidebar.css";
import {Link} from "react-router-dom";

//const Sidebar = ({ menuItems, styles }) => {
class Sidebar extends React.Component {
    //Whatever = () => {
    //    this.props.callbackFromParent("HALLO")
    //};
    render() {
        return(
            <div className="sidebarStyle">
                <div className="logoStyle">{"SocialHub"}</div>
                <div>
                    <Link to={"/signin"}><button className="signOutStyle">Sign {this.props.isLoggedIn ? "Out" : "In"}</button></Link>
                    <button className="settingsStyle">Settings</button>
                </div>
                <p className="categoryLabelStyle">FEED</p>
                <div className="menuItemStyle">
                    <img src={summary_icon} className="summaryIconStyle"/>
                    All Inboxes
                </div>
                <hr className="hrStyle"/>
                {
                    this.props.menuItems.map((item, i) => (
                    <div key={i} className="menuItemStyle">
                        <img src={item.icon} className="iconStyle"/>
                        <div className="menuItemText">{item.text}</div>
                    </div>
                ))}
            </div>
        );

    }
    //);
}

export default Sidebar