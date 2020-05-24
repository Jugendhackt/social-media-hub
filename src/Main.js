import React, {Suspense} from "react";
import {Route, Switch} from "react-router-dom";
import CntTimeline from "./CntTimeline";
import CntSignIn from "./CntSignIn";
// const CntTools = React.lazy(() => import("./CntTools"));


class Main extends React.Component {
    render() {
        return(
            <main>
                <Switch>
                    <Suspense>
                        <Route exact path='/' component={CntTimeline}/>
                        <Route path='/signin' component={() => <CntSignIn toggleLoggedIn = {this.props.toggleLoggedIn}/>}/>
                        {/*<Route path='/settings' component={CntSettings}/>*/}
                    </Suspense>
                </Switch>
            </main>
        );
    }

}
export default Main;
