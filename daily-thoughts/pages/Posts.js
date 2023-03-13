import { auth, db, } from "@/utils/Firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore"
import { toast } from "react-toastify"

function NewPost() {

  // initializing Router
  const route = useRouter();
  const routeData = route.query;

  // Post State
  const [post, setPost] = useState({ description: "" })

  // User State
  const [user, loading] = useAuthState(auth)

  // Submit Post to Firebase
  const submitPost = async (event) => {
    event.preventDefault();

    // Running Proper Description Checks
    if (!post.description) {
      toast.error("Description is Empty 😤")
      return
    }
    if (post.description.length > 300) {
      toast.error("Description limit Exceeded 😓")
      return
    }

    // Check If the user is editing an existing post
    if (post.hasOwnProperty("id")) {
      const docRef = doc(db, "socialApp-Posts", post.id)
      const editData = { ...post, timestamp: serverTimestamp() }
      await updateDoc(docRef, editData)
      toast.success("Post Updated🚀")
      route.push("/dashboard")
    }
    // Else Create New Post
    else {
      // Create a post inside Firebase
      const collectionRef = collection(db, "socialApp-Posts");

      // Adding New Post and other details related to user
      await addDoc(collectionRef, {
        ...post,
        timestamp: serverTimestamp(),
        user: user.uid,
        avatar: user.photoURL,
        username: user.displayName
      });

      toast.success("Post Submitted😁")
      // Clearing Input Field after Post Submit
      setPost({ description: "" })

      // Routing User back to home page
      route.push("/")
    }


  }


  // Check to see if unAuth user in trying to enter Post Page
  useEffect(() => {
    if (loading) {
      return
    }
    if (!user) {
      route.push("/auth/Login");
    }

    // Update Post data according to route query
    if (routeData.id) {
      setPost({ description: routeData.description, id: routeData.id })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, route, user]);


  return (
    <div className="my-20 p-12 shadow-lg rounded-xl max-w-md mx-auto">
      <form onSubmit={submitPost}>
        <h1 className="text-2xl font-bold">
          {post.hasOwnProperty("id") ? "Edit your post" : "Create a new post"}
        </h1>
        <div className="py-2">
          <h3 className="text-lg font-medium py-2">
            Description
          </h3>
          <textarea onChange={(event) => { setPost({ ...post, description: event.target.value }) }} value={post.description} className="bg-gray-800 w-full text-white rounded-lg p-2 text-small"></textarea>
          <p className={post.description.length > 300 ? "text-red-600 font-medium" : "text-cyan-600"}>
            {post.description.length}/300
          </p>
        </div>
        <button type="submit" className="w-full bg-cyan-600 text-white font-medium p-2 my-2 rounded-lg text-small">
          Submit
        </button>
      </form>
    </div>
  )
}


export default NewPost

