import { Montserrat } from 'next/font/google'
import Link from 'next/link'
import { useSelector } from 'react-redux'


const montserrat = Montserrat({ subsets: ['latin'] })



export default function Nav() {

  let cartNumber = useSelector((redux_store) => {
    return redux_store.cart.value.length
  })

  return (

    <nav className='sm:w-full'>
      <ul className={`flex flex-col sm:flex-row  items-start sm:items-center py-4 mt-12 sm:mt-0 gap-8 uppercase ${montserrat.className} font-medium`}>
        <li className='hover:text-primary transition duration-150 ease-in-out hover:scale-110 hover:border-b border-primary'>
          <Link href={"/"}>Home</Link>
        </li>
        <li className='hover:text-primary transition duration-150 ease-in-out hover:scale-110 hover:border-b border-primary'>
          <Link href={"/search"}>Search&nbsp;Page</Link>
        </li>
        <li className='hover:text-primary transition duration-150 ease-in-out hover:scale-110 hover:border-b border-primary'>
          <Link href={"/cart"}>Cart{cartNumber > 0 && <sup className='bg-primary text-white  rounded-full px-2 py-1'>{cartNumber}</sup>}</Link>
        </li>
      </ul>


    </nav>

  )
}