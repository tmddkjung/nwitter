import React, {useState, useEffect} from "react";
import { storageService, dbService } from "fbase";
import NweetCard from "../components/NweetCard";
import InputNweetCard from "../components/InputNweetCard";

const Home = ({userObj}) => {

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
        dbService.collection("nweets")
            .orderBy("createdAt","desc")
            .onSnapshot(snapshot => {
                console.log("snapshot", snapshot)
                let nweetArr = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
                setNweets(nweetArr)
            })
    }, []);

    return (
        <div id={"content-container"}>
            <div id={"content-wrapper"}>
                <div>
                    <InputNweetCard userObj={userObj}/>
                </div>
                <div className={"nweetScroll"}>
                    {
                        nweets.map((comment)=>{
                            return <NweetCard key={comment.id} isOwner={userObj.uid === comment.creatorId } nweet={comment}/>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Home;