import React, { useState } from "react";

import { Link } from "react-router-dom";

const Navigation = ({ userObj })=> {
    console.log('userObj', userObj)
    return (
        <nav className={"navbar navbar-custom"}>
            <ul className={"nav"}>
                <li className={"nav-item"}>
                    <Link className={"nav-link"} to={"/"}>
                        <i style={{fontSize:"30px"}} className={"bi-twitter"}></i>
                    </Link>
                </li>
                <li className={"nav-item"}>
                    <Link className={"nav-link"} to={"/profile"} style={{textAlign: "center"}}>
                        <i style={{fontSize:"30px"}} className={"bi-person-fill"}></i>
                        <div style={{color:"#fff"}}>{`${userObj.displayName}'s Profile`}</div>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation;