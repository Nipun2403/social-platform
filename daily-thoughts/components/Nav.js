import Link from "next/link"

export default function Nav() {
  return (
    <nav className="flex justify-between item-center"  >

      <Link href="/">
        <button className="text-lg font-medium">Daily Thoughts</button>
      </Link>

      <ul className="flex item-ceter">
        <Link  href={"/auth/Login"}  className="py-2 px-4 bg-cyan-500 text-white rounded-lg font-medium ml-8">
        Join Now
        </Link>
      </ul>


    </nav>
  )
};