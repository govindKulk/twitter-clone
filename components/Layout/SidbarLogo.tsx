import Link from 'next/link'
import { BsTwitter } from 'react-icons/bs'

const SidebarLogo = () => {
  return (
    <div
      onClick={() => <Link href='/' />}
      className="
        rounded-full 
        h-14
        w-14
        md:h-30
        md:w-30
        p-4 
        flex 
        items-center 
        justify-center 
        hover:bg-black 
        hover:bg-opacity-10 
        cursor-pointer
    ">
      <BsTwitter size={60} color="blue" />
    </div>
  )
}

export default SidebarLogo
