import React, {useState, useEffect} from "react";
import { dbService } from "fbase";

const Home = ({userObj}) => {
    const [nweet, setNweet] = useState("")
    const [nweets, setNweets] = useState([])

    // old way
    /*
    const getNweets = async () => {
        const dbNweets = await dbService.collection("nweets").get();

        dbNweets.forEach((document)=>{
            const nweetObj = {
                ...document.data(),
                id: document.id
            }

            setNweets(prev=>[nweetObj, ...prev])
        })
    }
    */

    useEffect(()=>{
        // getNweets();
        dbService.collection("nweets").onSnapshot(snapshot => {
            let nweetArr = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))

            setNweets(nweetArr)
        })
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("nweets").add({
            text: nweet,
            createdAt : Date.now(),
            creatorId : userObj.uid
        })
    }

    const onChange = (event) => {
        const { target : { value }} = event;
        setNweet(value)
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type={"text"}
                       placeholder={"What's on your mind?"}
                       maxLength={120}
                       onChange={onChange}
                />
                <input type={"submit"} value={"nweet"}/>
            </form>
            <div>
                {
                    nweets.map((comment)=>{
                        return <div key={comment.id}>
                            <h4>{comment.text}</h4>
                            <span>{comment.createdAt}</span>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default Home;