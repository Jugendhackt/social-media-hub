import React from "react";
import TimelineElement from "./TimelineElement";
class Content extends React.Component {

    render() {
        return (
            <div>
                <TimelineElement timelineItems={this.props.timelineItems}/>
            </div>
        );
    }

}

export default Content;