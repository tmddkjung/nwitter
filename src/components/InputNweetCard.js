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
        <form onSubmit={onSubmit}>
            <input type={"file"} accept={"image/*"} onChange={onAttachmentChange}/>
            {
                attachment &&
                <div>
                    <img src={attachment} width={"50px"} height={"50px"}/>
                    <button onClick={onFileClear}>Clear</button>
                </div>
            }
            <input type={"text"}
                   placeholder={"What's on your mind?"}
                   maxLength={120}
                   required={true}
                   onChange={onChange}
            />
            <input type={"submit"} value={"nweet"}/>
        </form>
    )
}

export default InputNweetCard;