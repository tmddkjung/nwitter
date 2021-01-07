import React, {useState, useEffect} from "react";
import {dbService, storageService} from "fbase";

import moment from "moment";

const NweetCard = ({isOwner, nweet}) => {
    const [editable, setEdit] = useState(false)
    const [newNweet, setNweet] = useState(nweet.text)

    const onUpdate = async (event) =>{
        event.preventDefault();
        if(!window.confirm("Do you want to update this nweet?")) return;

        await dbService.doc(`nweets/${nweet.id}`).update({ text: newNweet })
    }

    const onChange = (event) => {
        const { target : { value }} = event;
        setNweet(value)
    }

    const deleteNweet = async () => {
        if(!window.confirm("Do you want to delete this nweet?")) return;

        if(nweet.attachmentUrl !== "") await storageService.refFromURL(nweet.attachmentUrl).delete()
        await dbService.doc(`nweets/${nweet.id}`).delete()
    }

    const changeEditMode = () => {
        if(editable && nweet.text !== newNweet) setNweet(nweet.text)
        setEdit(prev => !prev)
    }

    const createdDate = moment(nweet.createdAt).format("YY년 MM월 DD일")

    return (
        <div className={"nweetbox"} style={editable ? {height: "160px"}:{}}>
            <span className={"namebox"}>
                <span className={"name"}>{nweet.creatorName || ""}</span>
                <span className={"date"}>{ createdDate }</span>
            </span>
            {
                isOwner && !editable &&
                <span className={"btnbox"}>
                   <button className={"btn btn-sm"} onClick={deleteNweet}><i className={"bi-trash-fill"}></i></button>
                   <button className={"btn btn-sm"} onClick={changeEditMode}><i className={"bi-pencil-fill"}></i></button>
                </span>
            }
            {
                nweet.attachmentUrl &&
                <div className={"photobox"} style={editable?{top:"120px"}:{}}>
                    <img className={"photo"} src={nweet.attachmentUrl}/>
                </div>
            }
            <div className={"textbox"}>
                {
                    editable
                    ?
                        <form onSubmit={onUpdate}>
                            <input className={"form-control"}
                                   type={"text"}
                                 value={newNweet}
                                 placeholder={"Update your nweet"}
                                 maxLength={120}
                                 required={true}
                                 onChange={onChange}
                            />
                            <button className={"btn btn-primary mt-2"} style={{width: "100%", height: "35px"}} type={"submit"}>Update Nweet</button>
                            <button className={"btn btn-warning mt-1"} style={{width: "100%", height: "35px"}} onClick={changeEditMode}>Cancel</button>
                        </form>
                    : nweet.text
                }
            </div>
        </div>
    )
}

export default NweetCard;