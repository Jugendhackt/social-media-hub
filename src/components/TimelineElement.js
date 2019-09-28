import React from "react";
import CSS from "../assets/TimelineElement.css";
import Reddit_icon from "../assets/reddit.svg";
class TimelineElement extends React.Component {
    render() {

        return(
            <div className="centerBox">
                {
                    //alert(this.props.timelineItems)
                    this.props.timelineItems.map((item, i) => (
                        <div className="timelineBox" key={i}>
                            <img className="timelinePlatformIcon" src={Reddit_icon}/>
                            <div className="timelineTitle">{item.title}</div>
                            <div className="timelineMessage">{item.msg}</div>
                        </div>
                    ))
                }
            </div>
        );
    }


}
export default TimelineElement;