import React, { useState } from "react";

import { Link } from "react-router-dom";

const Navigation = ({ isLoggedIn })=> {
    return (
        <nav>
            <ul>
                <li><Link to={"/"}>HOME</Link></li>
                <li><Link to={"/profile"}>MY PROFILE</Link></li>
            </ul>
        </nav>
    )
}

export default Navigation;