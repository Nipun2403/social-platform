

function Thoughts({children, avatar, username, description})



{
  return(
    <div className="bg-white p-8 border-b-2 rounded-lg my-10">
      <div className=" flex items-center gap-3">
      
        <img src={avatar} alt="Profile Pic" className="w-10 rounded-full"/>

        <h2>{username}</h2>
      </div>
      <div className="py-4">
        <p className="">{description}</p>
      </div>
      {children}
    </div>
  )
}



export default Thoughts;