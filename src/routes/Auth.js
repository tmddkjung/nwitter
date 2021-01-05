import React, { useState } from "react";
import { authService } from "fbase";

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
            <button>Countinue with Google</button>
            <button>Countinue with Github</button>
        </div>
    </div>
}

export default Auth;