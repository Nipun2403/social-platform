// React and NextJs Imports
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// Component Imports
import Thoughts from "@/components/Thoughts";

// Firebase Realted Imports
import { auth, db } from "@/utils/Firebase"
import { collection, deleteDoc, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

// React Icons Imports
import { BsTrash2 } from "react-icons/bs"
import { AiFillEdit } from "react-icons/ai"

//  Toast Import
import { toast } from "react-toastify";
import Link from "next/link";

// Main Function
function DashBoard() {


  // Defining Use States
  const [user, loading] = useAuthState(auth);
  const [allPosts, setAllPosts] = useState([])

  // Defining Router
  const route = useRouter();

  // Get User's Data from Firebase
  const getData = async () => {
    if (loading) return;
    if (!user) route.push("auth/Login")

    // Get User's Data from Firebase by the help of query
    const collectionRef = collection(db, "socialApp-Posts");
    const q = query(collectionRef, where("user", "==", user.uid));
    const snap = onSnapshot(q, (snapshot) => {
      setAllPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })
    return snap;
  }

  // Dynammically Updating List of Posts
  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // SignOut the User
  function singout() {
    auth.signOut()
    route.push("/")
  }

  // Deleting a Post
  async function deletePost(id) {
    const docRef = doc(db, "socialApp-Posts", id)
    await deleteDoc(docRef)
    route.push("/dashboard")

    // Popup for Confirmation
    toast("⭕ Post Deleted", { style: { color: "red" } })

  }

  // Edit the Doc Content
  // async function updatePost() {
  //   const docRef = doc(db, "socialApp-Posts", id)
  //   await updateDoc(docRef, {
  //     description: ""
  //   })
  // }

  return (
    <div>
      <h1>Your Posts</h1>
      <div>
        {allPosts.map(post => (
          <Thoughts {...post} key={post.id} >

            <div className="flex gap-5">

              <button onClick={() => deletePost(post.id)} className="flex items-center justify-center bg-pink-500 rounded-full text-white font-medium text-sm gap-2 py-1 px-3 mx-2">
                <BsTrash2 /> Delete
              </button>

              <Link href={{pathname: "/Posts", query: post}} as={"/EditPost"}>
              <button className="flex items-center justify-center bg-teal-600 rounded-full text-white font-medium text-sm gap-2 py-1 px-4 mx-2"> <AiFillEdit /> Edit</button>
              </Link>

            </div>


          </Thoughts>
        ))}
      </div>
      <button className="font-medium text-white text-sm bg-gray-700 rounded-xl px-6 py-1 mb-8" onClick={() => { singout() }}>Sign Out</button>
    </div>
  )
}



export default DashBoard;









// const getData = async ()=>{
//   if (loading){return};
//   if (!user){ return route.push("/auth/login");
// }}

// useEffect(()=>
// {
//   getData()
// // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [user, loading]);
