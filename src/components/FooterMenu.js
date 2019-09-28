import React from "react";

const FooterMenu = ({ menuItems, styles }) => {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "stretch",
                width: "100%",
                height: styles.footerMenuHeight,
                backgroundColor: "#333",
                color: "#fff",
                position: "fixed",
                bottom: 0
            }}
        >
            {menuItems.map((item, i) => {
                return (
                    <div
                        key={i}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flex: 1
                        }}
                    >
      <span
          style={{
              fontSize: 20,
              marginRight: styles.showFooterMenuText ? 5 : 0
          }}
      >
        {item.icon}
      </span>
                        {styles.showFooterMenuText && item.text}
                    </div>
                );
            })}
        </div>
    );
};

export default FooterMenu;