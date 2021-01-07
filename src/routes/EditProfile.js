import React, { useState } from "react";
import {authService, dbService, storageService} from "fbase";
import { useHistory } from "react-router-dom";
import {v4 as uuidv4} from "uuid";

const EditProfile = ({userObj}) => {
    const [attachment, setAttachment] = useState(userObj.photoURL)
    const [nickname, setNickname] = useState(userObj.displayName)
    // type 2 is history and push function
    const history = useHistory();

    const onLogout = () => {
        authService.signOut();
        history.push("/");
    }

    const onUpdate = async (event) => {
        event.preventDefault();
        if(!window.confirm("Do you want to update your profile?")) return;

        // upload img and then create nweet with url
        let attachmentUrl = "";
        if(attachment !== ""){
            // creating file reference
            let attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            // const response = await attachmentRef.putString(attachment, "data_url")
            // attachmentUrl = await response.ref.getDownloadURL();
        }

        if(userObj.displayName === nickname && userObj.photoURL === attachmentUrl) {
            alert("nothing changed")
            return;
        }

        try{
            await authService.currentUser.updateProfile({
                displayName:nickname,
                photoURL: attachmentUrl || null
            })

            setNickname("")
            // setAttachment("")
            history.push("/profile");
        } catch (e){
            alert(e.message)
        }
    }

    const onChange = (event) => {
        const { target : {value}} = event;
        setNickname(value)
    }

    const styles = {
        borderRadius  : "40px",
        marginBottom: "10px",
        width : "100%"
    }

    const onAttachmentChange = (event) => {
        const { target : {files}} = event;

        if(files.length !== 0) {
            console.log("theFile", files)
            const theFile = files[0];

            const reader = new FileReader();
            reader.onloadend = (finishedEvent) => {
                console.log(finishedEvent)
                const { currentTarget : { result }} = finishedEvent;
                setAttachment(result);
            }
            reader.readAsDataURL(theFile)
        }
    }

    const onFileClear = () => setAttachment("");


    return (
        <div id={"profile-container"}>
            <div id={"profile-wrapper"}>
                <form onSubmit={onUpdate} >
                    <div className={"photo mb-3"}>
                        <div style={{display: "inline-flex"}}>
                            <img style={{borderRadius:'40px'}} src={attachment} width={"70px"} height={"70px"}/>
                            <div className={"profileFilebox"}>
                                <label htmlFor="attachmentForm" className="form-label" style={{color: "#5e5e5e", fontSize:"30px", cursor: "pointer"}}>
                                    <i className={"bi-camera-fill"}></i>
                                    <input style={{display: "none"}} id="attachmentForm" type={"file"} accept={"image/*"} onChange={onAttachmentChange}/>
                                </label>
                            </div>
                        </div>
                    </div>


                    <input type={"text"} className={"form-control"} style={styles} placeholder={"Nickname"} required={true} value={nickname} onChange={onChange}/>
                    <button type={"submit"} className={"btn btn-primary"} style={styles} >Update Profile</button>
                    <hr style={{ borderTop: "1px solid #007bff", margin: "2rem 0 2rem 0" }}/>
                    <button type={"button"} className={"btn btn-warning"} style={styles} onClick={onLogout}>Log Out</button>
                </form>
            </div>
        </div>
    );
}

export default EditProfile;