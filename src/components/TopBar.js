import React from "react";

const TopBar = ({ styles }) => {
    const topBarStyle = {
        position: "fixed",
        top: 0,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: styles.topBarHeight,
        backgroundColor: styles.white(),
        borderBottom: `1px solid ${styles.black(0.1)}`,
        fontWeight: "bold",
        padding: "0px 20px",
        boxSizing: "border-box"
    };

    return (
        <div style={topBarStyle}>
            <span>{`😺️`}</span>
            App
            <span>{`⚙️`}</span>
        </div>
    );
};

export default TopBar;