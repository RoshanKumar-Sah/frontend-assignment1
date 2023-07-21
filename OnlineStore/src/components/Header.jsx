import { Montserrat } from 'next/font/google'
import Link from 'next/link'
import Hamburger from 'hamburger-react'
import { useState } from 'react'
import Nav from './Nav'


const montserrat = Montserrat({ subsets: ['latin'] })


export default function Header() {


  const [isOpen, setOpen] = useState(false)

  return (
    <header className='w-full fixed  z-50 bg-white/70'>
      <div className='container py-4 flex gap-4 items-center justify-between '>
        <h2 className={`text-3xl ${montserrat.className} font-bold text-primary after:content-['.'] after:text-secondary after:ml-1`}><Link href={"/"}>Online<span className='text-tertiary'>Store</span></Link></h2>

        <div className='sm:hidden'>
          <Hamburger toggled={isOpen} color='#FF851B' toggle={setOpen} />
        </div>

        {isOpen && <div className="absolute py-4 top-0 left-0 w-1/2  h-screen bg-white/70 border-r px-3 sm:hidden">
          <Nav />
        </div>}

        <div className="hidden sm:flex  items-center justify-between w-2/4"><Nav /></div>
      </div>
    </header>
  )
}