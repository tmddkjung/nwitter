import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";

import { authService } from "fbase";

function App() {
    const [init, setInit] = useState(false);
    const [userObj, setUwerObj] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(()=>{
        authService.onAuthStateChanged((user)=>{
            if(user){
                setIsLoggedIn(true);
                setUwerObj(user)
            } else {
                setIsLoggedIn(false);
            }
            setInit(true)
        })
    }, [])

    return (
        <>
            {
                init
                    ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj}/>
                    : "Initializing..."
            }
            <footer>&copy; Nwitter By Seung</footer>
        </>
    );
}

export default App;
