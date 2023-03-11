import Link from "next/link";

// React Icons Inport
import { FcGoogle } from "react-icons/fc"
import { HiOutlineMail } from "react-icons/Hi"

// Firebase Authentication Imports
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/utils/Firebase";

function Login() {

  // Google SignIn
  const googleProvider = new GoogleAuthProvider();

  const GoogleLogin = async () =>{
    try{

      const result = await signInWithPopup(auth, googleProvider)
    }catch(error){console.log(error);}
  } 



  return (
    <div className="shadow-xl mt-32 p-10 text-gray-700 rounded-lg">

      <h2 className="text-2xl font-medium">
        Join Today
      </h2>

      <div className="py-4">

        <h3 className="py-4">
          Sign in with one of the providers
        </h3>
        <button onClick={GoogleLogin} className="text-white bg-gray-700 w-full mt-5 py-3 font-medium rounded-lg flex  gap-3">
          <FcGoogle className=" ml-3 text-2xl  " />  Sign in with Google
        </button>
        

      </div>

    </div>
  )
};


export default Login;