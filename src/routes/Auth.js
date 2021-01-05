import React, { useState } from "react";
import {authService, fbInstance} from "fbase";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (event) => {
        let { target : {name, value} } = event;

        if(name === 'email') setEmail(value)
        else if(name === 'password') setPassword(value)
    }

    const toggleAccount = () => setNewAccount((prev)=>!prev)
    const onSubmit = async (event) => {
        event.preventDefault();
        try{
            let data;
            if(newAccount){
                // create new account
                data = await authService.createUserWithEmailAndPassword(email, password)
            } else {
                // login
                data = await authService.signInWithEmailAndPassword(email, password)
            }
            console.log("Data: ", data)
        }catch (error){
            setError(error.message)
            console.log("Error: ", error)
        }
    }

    const onSignInSocials = async (event) => {
        const { target: {name}} = event;
        let provider;

        if(name === "google"){
            provider = new fbInstance.auth.GoogleAuthProvider();
        }
        else if(name === "github"){
            provider = new fbInstance.auth.GithubAuthProvider();
        }

        await authService.signInWithPopup(provider)

    }

    return <div>
        <form onSubmit={onSubmit}>
            <input type={"email"} name={"email"} value={email} placeholder={"Enter Email"} required={true} onChange={onChange}/>
            <input type={"password"} name={"password"} value={password} placeholder={"Enter Password"} required={true} onChange={onChange}/>
            <input type={"submit"} value={newAccount ? "Create Account": "Sign In"}/>
            <div>
                <span style={{color:'red'}}>{error}</span>
            </div>
        </form>
        <span onClick={toggleAccount}>
            {
                newAccount ? "Sign In" : "Create New Account"
            }
        </span>
        <div>
            <button name={"google"} onClick={onSignInSocials}>Countinue with Google</button>
            <button name={"github"} onClick={onSignInSocials}>Countinue with Github</button>
        </div>
    </div>
}

export default Auth;