import Nav from "./Nav";

export default function Layout({ childern }) {
  return (
    <div className=" mx-6 font-poppins" >
      <Nav />
    <main>{childern}</main>
    </div>
  )
}