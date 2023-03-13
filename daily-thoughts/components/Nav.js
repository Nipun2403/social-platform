/* eslint-disable @next/next/no-img-element */

// React ana Next Imports
import Link from "next/link"
import Image from "next/image"
import { useAuthState } from "react-firebase-hooks/auth"

// Importing Firebase getAuth
import { auth } from "@/utils/Firebase"

export default function Nav() {

  const [user, loading] = useAuthState(auth);

  // console.log(user)



  return (
    <nav className="flex justify-between item-center"  >

      <Link href="/">
        <button className="text-lg font-medium">Daily Thoughts</button>
      </Link>

      <ul className="flex item-ceter">

        {/* If user is Not Signed-in then render Join Now Button */}
        {!user ?
          <Link href={"/auth/Login"} className="py-2 px-4 bg-cyan-500 text-white rounded-lg font-medium ml-8">
            Join Now
          </Link>

          :  //Else Render Below Code

          <div className="flex items-center gap-6">
            <Link href={"/Posts"}>
              <button className=" font-medium bg-cyan-500 text-white py-2 px-4 rounded-lg"  >New Post </button>
            </Link>
            <Link href={"/dashboard"}>
              <img className="w-12 rounded-full cursor-pointer" src={user.photoURL} alt="Profile Picture" />
            </Link>
          </div>
        }

      </ul>


    </nav>
  )
};