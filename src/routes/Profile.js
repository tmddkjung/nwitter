import React, { useState, useEffect } from "react";
import {authService, dbService} from "fbase";
import { useHistory } from "react-router-dom";
import NweetCard from "components/NweetCard";
import InputNweetCard from "../components/InputNweetCard";

const Profile = ({userObj}) => {
    const [nweets, setNweets] = useState([])
    const [attachment, setAttachment] = useState(userObj.photoURL)

    useEffect(()=>{
        // getNweets();
        console.log("userObj.uid", userObj.uid)
        dbService.collection("nweets").where("creatorId", "==", userObj.uid)
            .orderBy("createdAt","desc").onSnapshot(snapshot => {
            let nweetArr = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))

            console.log("nweetArr", nweetArr)
            setNweets(nweetArr)

        })
    }, []);

    // type 2 is history and push function
    const history = useHistory();

    const onLogout = () => {
        authService.signOut();
        history.push("/");
    }

    const onUpdate = async (event) => {
        event.preventDefault();
        if(!window.confirm("Do you want to update your name?")) return;

    }

    const onChange = (event) => {
        const { target : {value}} = event;
        // setNickname(value)
    }

    const styles = {
        borderRadius  : "40px",
        marginBottom: "10px",
        width : "100%"
    }

    const goUpdatePage = () => {
        console.log("gggg")
        history.push("/edit");
    }

    return (
        <div id={"content-container"}>
            <div id={"content-wrapper"}>
                {/* profile img, nickname, account , update */}
                <div className={"namecard d-flex mb-1"}>
                    <span className={"ml-3"} style={{color:"#fff"}}>
                        <img className="profilePhoto" src={attachment} width={"60px"} height={"60px"}/>
                        <div style={{color:"#dae0e5", fontWeight:"800", fontSize:"12px"}}>{userObj.displayName || "nickname"}</div>
                        <div style={{color:"#dae0e5", fontSize:"11px"}}>@{userObj.email.split("@")[0]}</div>
                    </span>
                    <span className="ml-auto mr-3">
                        <button className={"btn btn-sm btn-light"} type={"button"} style={{fontSize:"10px",borderRadius:'40px'}} onClick={goUpdatePage}>
                            Update Profile
                        </button>
                    </span>
                </div>
                <div>
                    <InputNweetCard userObj={userObj}/>
                </div>
                <div className={"nweetScroll"}>{/* user nweets*/}
                    {
                        nweets.length !== 0 &&
                        nweets.map((nweet)=>{
                            return <NweetCard key={nweet.id} isOwner={true} nweet={nweet}/>
                        })
                    }
                    {
                        nweets.length == 0 &&
                        <div className={"nweetbox"} style={{height: "30px", paddingLeft: "10px"}}>
                            welcome, write your first nweet!
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Profile;