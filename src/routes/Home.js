import React, {useState, useEffect} from "react";
import { dbService } from "fbase";

const Home = () => {
    const [nweet, setNweet] = useState("")
    const [nweets, setNweets] = useState([])

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

    useEffect(()=>{
        getNweets();
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("nweets").add({
            nweet,
            createdAt : Date.now()
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
                            <span>{comment.nweet}</span>
                            <span>{comment.createdAt}</span>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default Home;