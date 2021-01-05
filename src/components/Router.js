import React, { useState } from "react";
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";

import Navigation from "components/Navigation";

const AppRouter = ({ isLoggedIn })=> {
    return (
        <Router>
            {
                isLoggedIn && <Navigation />
            }
            <Switch>
                {
                    isLoggedIn ?
                        <>
                            <Route exact path={"/"}>
                                <Home />
                            </Route>
                            <Route exact path={"/profile"}>
                                <Profile />
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