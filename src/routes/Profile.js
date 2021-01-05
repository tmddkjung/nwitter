import React from "react";
import { authService } from "fbase";
import { useHistory } from "react-router-dom";

const Profile = () => {
    // type 2 is history and push function
    const history = useHistory();

    const onLogout = () => {
        authService.signOut();
        history.push("/");
    }

    return (
        <>
            <button onClick={onLogout}>Log Out</button>
        </>
    )
}

export default Profile;