import Link from "next/link";
import { useState } from "react";


function SignInPage(props) {
  
  const [userData, setUserData] = useState({
    currentEmail: "",
    currentPass: ""
  })
  

  function addUserData()
  {
    
  }


  const Authenticated = true;
  return (

  Authenticated?<div className="flex justify-center items-center py-32">
    <div className="flex flex-col gap-10 items-center py-20 shadow-lg text-gray-700 rounded-lg w-1/2 text-center" >
      <div>
        <h1 className="text-3xl font-poppins font-bold" >Sing In</h1>
      </div>

      <input className="input-style" type="text" name="first" placeholder="Email" />
      <input className="input-style" type="text" name="last" placeholder="Password" />

      <button onClick={props.add(userData)} className="text-white bg-cyan-500  mt-5 px-8 py-2 text-xl font-medium rounded-lg">Submit</button>


    </div>
    </div>:<h1>Error</h1>
  )
}



export default SignInPage;