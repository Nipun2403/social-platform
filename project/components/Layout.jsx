import Nav from "./nav";

export default function Layout({childern})
{
  return (
    <div>
      <Nav />
    <main>{childern}</main>
    </div>
  )
}