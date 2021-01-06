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

    return <div id={"auth-container"}>
        <div id={"auth-wrapper"}>
            <div className="mb-2">
                <i className={"bi-twitter"} style={{fontSize:"2rem", color: "#0d6efd"}}></i>
            </div>
            <form className={"auth-form"} onSubmit={onSubmit}>
                <input className={"form-control mb-2"}
                       style={{width: "350px", height:"35px", borderRadius:"40px", border: "0px"}}
                       type={"email"} name={"email"} value={email}
                       placeholder={"Email"} required={true}
                       onChange={onChange}/>
                <input className={"form-control"}
                       style={{width: "350px", height:"35px", borderRadius:"40px", border: "0px"}}
                       type={"password"} name={"password"} value={password}
                       placeholder={"Password"} required={true}
                       onChange={onChange}/>
                <input className={"form-control mt-3 mb-1"}
                       style={{
                           width: "350px", height:"35px", borderRadius:"40px", border: "0px",
                           backgroundColor: "#0d6efd",color: "#fff"
                       }}
                       type={"submit"} value={newAccount ? "Create Account": "Sign In"}/>
                <div className={"error-msg"}><span>{error}</span></div>
                <span className={"toggle-state"} onClick={toggleAccount}>
                {
                    newAccount ? "Sign In" : "Create Account"
                }
                </span>
            </form>
            <div style={{ marginTop: "60px" }}>
                <button className={"btn btn-light mr-1"}
                        style={{
                            width: "180px", fontSize: "12px", color:"#000", borderRadius: "40px",
                        }}
                        name={"google"} onClick={onSignInSocials}>Countinue with Google<i className={"bi-google ml-1"}></i></button>
                <button className={"btn btn-light ml-1"}
                        style={{
                            width: "180px", fontSize: "12px", color:"#000", borderRadius: "40px",
                        }}
                        name={"github"} onClick={onSignInSocials}>Countinue with Github<i className={"bi-github ml-1"}></i></button>
            </div>
        </div>
    </div>
}

export default Auth;