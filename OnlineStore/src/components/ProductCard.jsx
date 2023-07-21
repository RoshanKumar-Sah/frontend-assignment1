import { addToCart } from '@/redux/slice/cartSlice'
import { Montserrat, Open_Sans } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { AiFillStar } from "react-icons/ai"
import { useDispatch } from 'react-redux'
import { BsCartPlusFill } from "react-icons/bs"


const montserrat = Montserrat({ subsets: ['latin'] })
const open_sans = Open_Sans({ subsets: ['latin'] })

export default function ProductCard({ product }) {

    const dispatch = useDispatch()
    return (

        <div className="w-full h-full  border-2 border-gray-400 shadow rounded-xl  hover:border-primary" key={product.id}>
            <Link href={`/productDetails/${product.id}`}>
                <div className="h-3/5 relative">
                    <Image src={product.image} height={200} width={200} alt="productImage" className="w-full h-full object-fill p-8 rounded-md" />
                    <div className="absolute flex items-center gap-1 top-8 right-8 px-2 py-1 rounded-md text-white bg-primary"><AiFillStar className="inline-block" /><p>{product.rating.rate}</p></div>
                </div>
            </Link>
            <div className="px-8 flex flex-col justify-around  h-2/5 ">
                <div>
                    <Link href={`/productDetails/${product.id}`}> <h3 className={` text-heading2 text-lg font-semibold ${montserrat.className}  line-clamp-2`}>{product.title}</h3></Link>
                </div>
                <div className="flex justify-between">
                    <p className={`text-heading1 text-2xl font-bold {open_sans.className}`}>Rs.&nbsp;{product.price}</p>
                    <div className={`py-2 px-2 h-fit font-medium rounded-full bg-white text-primary border border-primary   hover:bg-primary hover:text-white ${open_sans.className} cursor-pointer`}
                        onClick={() => {
                            dispatch(addToCart(product))
                        }} ><BsCartPlusFill size={24} /></div>
                </div>
            </div>

        </div>
    )
}