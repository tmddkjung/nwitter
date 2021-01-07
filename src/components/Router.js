import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";

import Navigation from "components/Navigation";
import EditProfile from "../routes/EditProfile";

const AppRouter = ({ isLoggedIn , userObj})=> {
    return (
        <Router>
            {
                isLoggedIn && <Navigation userObj={userObj}/>
            }
            <Switch>
                {
                    isLoggedIn ?
                        <>
                            <Route exact path={"/"}>
                                <Home userObj={userObj}/>
                            </Route>
                            <Route exact path={"/profile"}>
                                <Profile userObj={userObj}/>
                            </Route>
                            <Route exact path={"/edit"}>
                                <EditProfile userObj={userObj}/>
                            </Route>
                            {/*<Redirect from={"*"} to={"/"} />  type 1 is put the redirect on router.js */}
                        </> :
                        <>
                            <Route exact path={"/"}>
                                <Auth />
                            </Route>
                            {/*<Redirect from={"*"} to={"/"} />*/}
                        </>
                }
            </Switch>
        </Router>
    )
}

export default AppRouter;