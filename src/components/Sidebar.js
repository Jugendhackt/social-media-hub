import React from "react";

const Sidebar = ({ menuItems, styles }) => {
    const sidebarStyle = {
        height: "100vh",
        width: styles.sidebarWidth,
        position: "fixed",
        backgroundColor: styles.light_grey(),
        paddingTop: 40
    };

    const menuItemStyle = {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: `4px 10px`,
        color: styles.black(0.9)
    };

    const iconStyle = {
        fontSize: 26,
        marginRight: 10
    };

    const logoStyle = {
        textAlign: "left",
        marginLeft: "1em",
        color: styles.black(),
        fontSize: 34,
        marginBottom: 30,
        fontWeight: "bold"
    };

    const signOutStyle = {
        marginLeft: "2em",
        width: "100px",
        height: "40px",

        background: "#0094FF",
        borderRadius: "6px",
        border: "0px",

        marginBottom: 30,

        fontFamily: "IBM Plex Sans",
        fontStyle: "medium",
        fontWeight: "500",
        fontSize: "18px",
        lineHeight: "16px",
        textAlign: "center",
        verticalAlign: "middle",

        color: "#FFFFFF",
    };
    const settingsStyle = {
        marginLeft: "em",
        width: "100px",
        height: "40px",

        background: "#727272",
        borderRadius: "6px",
        border: "0px",

        marginBottom: 30,

        fontFamily: "IBM Plex Sans",
        fontStyle: "medium",
        fontWeight: "500",
        fontSize: "18px",
        lineHeight: "16px",
        textAlign: "center",
        verticalAlign: "middle",

        color: "#FFFFFF",
    };

    const buttonBoxStyle = {

    };

    return (
        <div style={sidebarStyle}>
            <div style={logoStyle}>{"SocialHub"}</div>
            <div style={buttonBoxStyle}>
                <button style={signOutStyle}>Sign out</button>
                <button style={settingsStyle}>Settings</button>
            </div>
            {menuItems.map((item, i) => (
                <div key={i} style={menuItemStyle}>
                    <span style={iconStyle}>{item.icon}</span>
                    {!styles.sidebarCollapsed && item.text}
                </div>
            ))}
        </div>
    );
};

export default Sidebar