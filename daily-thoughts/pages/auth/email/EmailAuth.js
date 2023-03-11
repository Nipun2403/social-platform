import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/utils/Firebase";
import { useState } from "react";


function EmailAuth() {

  const [userDetails, setUserDetails] = useState[{
    email: "",
    pass: ""
  }]

  function addUser(props)
  {
    setUserDetails({
      email: props.email,
      pass: props.pass
    })

  }




}






export default EmailAuth;