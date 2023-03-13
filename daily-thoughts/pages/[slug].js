/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import Thoughts from "@/components/Thoughts";
import { auth, db } from "@/utils/Firebase";
import { arrayUnion, doc, Timestamp, updateDoc, getDoc, collection, onSnapshot, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";


// Main Function
function Details() {

  const[user,loading] = useAuthState(auth);

  // Next Router
  const route = useRouter();
  const routeData = route.query;

  // Defining state for comment section
  const [comment, setComment] = useState("")
  const [allComments, setAllComments] = useState([]);

  // Submit a comment
  const submitComment = async () => {

    // Check for Empty Message
    if (!comment) {
      toast.error("Cannot post an empty comment")
      return
    }

    // Document Reference
    const docRef = doc(db, "socialApp-Posts", routeData.id)

    await updateDoc(docRef, {
      commentContent: arrayUnion({
        comment,
        avatar: auth.currentUser.photoURL,
        userName: auth.currentUser.displayName,
        timestamp: Timestamp.now()
      })
    });

    setComment("");
    toast.success("Comment posted👏")
  } 

  // Get Comments from Database
  const getComment = async () => {

    // Document Reference
    // const docRef = doc(db, "socialApp-Posts", routeData.id)
    // const docSnap = await getDoc(docRef)
    
    // setAllComments(docSnap.data().commentContent)
    
    
    const docRef = doc(db, "socialApp-Posts", routeData.id)
    const unsub = onSnapshot(docRef, (snapshot) => {
      setAllComments(snapshot.data().commentContent)
    })
    return unsub;

  }

  // console.log(allComments);

  useEffect(()=>{
    if(!route.isReady)return;
    getComment()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[route.isReady])

  return (
    <div>
      <Thoughts {...routeData}> </Thoughts>


      <div>
        {auth.currentUser && <div className="flex rounded-full overflow-hidden">

          <input onChange={(event) => setComment(event.target.value)} type={"text"} value={comment} placeholder={"Write a comment 💬 "} className="w-full text-white bg-gray-800 py-2 px-8 text-sm placeholder:text-white  focus:outline-none" />
          <button onClick={submitComment} className="bg-cyan-500 text-white py-2 px-4 text-sm">Submit</button>
        </div>}
        <div className="py-8">
          <h2 className="font-bold tracking-wide ">Comments</h2>

          {allComments?.map((comment) => (
          
          <div className="py-4 my-4 px-4 shadow-lg rounded-2xl bg-white" >
            <div className="flex gap-4 items-center py-2 my-2">
              <img src={comment.avatar} alt="Profile Pic" className="rounded-full w-8" />
              <h2>{comment.userName}</h2>
            </div>
              <p>{comment.comment}</p>
          </div>
          ))}

        </div>
      </div>
    </div>
  )

}

export default Details;