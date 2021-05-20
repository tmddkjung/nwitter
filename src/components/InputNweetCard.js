import React, {useState, useEffect} from "react";
import {dbService, storageService} from "fbase";
import {v4 as uuidv4} from "uuid";

const InputNweetCard = ({userObj}) => {
    const [nweet, setNweet] = useState("")
    const [attachment, setAttachment] = useState("")

    const onSubmit = async (event) => {
        event.preventDefault();
        // upload img and then create nweet with url
        let attachmentUrl = "";
        if(attachment !== ""){
            // creating file reference
            let attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const response = await attachmentRef.putString(attachment, "data_url")
            attachmentUrl = await response.ref.getDownloadURL();
        }

        await dbService.collection("nweets").add({
            text: nweet,
            createdAt : Date.now(),
            creatorId : userObj.uid,
            creatorName : userObj.displayName,
            attachmentUrl
        })
        setNweet("")
        setAttachment("")
    }

    const onChange = (event) => {
        const { target : { value }} = event;
        setNweet(value)
    }

    const onAttachmentChange = (event) => {
        const { target : {files}} = event;

        console.log("testS")

        if(files.length !== 0) {
            const theFile = files[0];

            const reader = new FileReader();
            reader.onloadend = (finishedEvent) => {
                const { currentTarget : { result }} = finishedEvent;
                setAttachment(result);
            }
            reader.readAsDataURL(theFile)
        }
    }

    const onFileClear = () => {
        let fileInput = document.getElementById("attachmentForm");
        fileInput.value = ""
        setAttachment("");
    }

    return (
        <form onSubmit={onSubmit}>
            <div className={"input-group"}>
                <input className={"form-control"} type={"text"}
                       style={{
                           borderRadius: "40px",
                           border: "1px solid #007bff",
                           backgroundColor: "#000",
                           paddingRight: "48px"
                       }}
                       placeholder={"What's on your mind?"}
                       maxLength={120}
                       required={true}
                       onChange={onChange}
                />
                <button type={"submit"} className={"btn btn-primary"}
                        style={{borderRadius:"50px", marginLeft: "-42px",zIndex: "10"}}><i className={"bi-arrow-right-short"}></i></button>
            </div>

            <div className="mt-2">
                <label htmlFor="attachmentForm" className="form-label" style={{color: "#0d6efd", cursor: "pointer"}}>
                    Add Photo <i className={"bi-plus"}></i>
                </label>
            </div>
            <input style={{display: "none"}} id="attachmentForm" type={"file"} accept={"image/*"} onChange={onAttachmentChange}/>
            {
                attachment &&
                <div className={"photo"}>
                    <img src={attachment} width={"50px"} height={"50px"}/>
                    <button className={"btn btn-sm"}  style={{ color:"#007bff"}} onClick={onFileClear}>clear<i className={"bi-x-circle-fill ml-2"}></i></button>
                </div>
            }
        </form>
    )
}

export default InputNweetCard;