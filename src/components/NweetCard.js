import React, {useState, useEffect} from "react";
import {dbService, storageService} from "fbase";

const NweetCard = ({isOwner, nweet}) => {
    const [editable, setEdit] = useState(false)
    const [newNweet, setNweet] = useState(nweet.text)

    const onUpdate = async (event) =>{
        event.preventDefault();
        if(!window.confirm("Do you want to update this nweet?")) return;

        await dbService.doc(`nweets/${nweet.id}`).update({ text: newNweet })
            // .then(function() {
            //     alert("Success updated")
            //     setEdit(false)
            // })
            // .catch(function(error) {
            //     // The document probably doesn't exist.
            //     alert(error.message)
            //     console.error("Error updating document: ", error);
            // });


    }

    const onChange = (event) => {
        const { target : { value }} = event;
        setNweet(value)
    }

    const deleteNweet = async () => {
        if(!window.confirm("Do you want to delete this nweet?")) return;

        await storageService.refFromURL(nweet.attachmentUrl).delete()
        await dbService.doc(`nweets/${nweet.id}`).delete()
            // .then(()=>{
            //     alert("Success removed")
            // })
            // .catch(function(error) {
            //     alert(error.message)
            //     console.error("Error removing document: ", error);
            // });

    }

    const changeEditMode = () => {
        if(editable && nweet.text !== newNweet) setNweet(nweet.text)
        setEdit(prev => !prev)
    }

    return (
        <div>
            {
                isOwner &&
                <span>
                   <button onClick={deleteNweet}><i>삭제</i></button>
                   <button onClick={changeEditMode}><i>{editable?"취소":"수정"}</i></button>
                </span>
            }

            <h4>
                {
                    nweet.attachmentUrl &&
                    <img src={nweet.attachmentUrl} width={"50px"} height={"50px"}/>
                }
                {
                    editable
                    ?
                        <form onSubmit={onUpdate}>
                            <input type={"text"}
                                 value={newNweet}
                                 placeholder={"Update your nweet"}
                                 maxLength={120}
                                 required={true}
                                 onChange={onChange}
                            />
                            <input type={"submit"} value={"submit"}/>
                        </form>
                    : nweet.text
                }
            </h4>
        </div>
    )
}

export default NweetCard;