import { dehydrate, QueryClient } from '@tanstack/react-query'
import { Montserrat, Open_Sans } from 'next/font/google'
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from 'react-redux'
import { addToCart } from '@/redux/slice/cartSlice'


const montserrat = Montserrat({ subsets: ['latin'] })
const open_sans = Open_Sans({ subsets: ['latin'] })



export default function SingleProduct(props) {
    // console.log(props.dehydratedState.queries[0]?.state.data);

    let product = props?.dehydratedState?.queries[0]?.state?.data
    const router = useRouter()
    const dispatch = useDispatch()

    useEffect(() => {
        if (!product) {
            router.push("/404")
        }
    })

    return (
        <>

            <section className="container pt-24">
                {
                    product && <>
                        <h1 className={`text-2xl font-bold text-heading1 py-8 ${montserrat.className}`}>{product.title}</h1>
                        <div className="border-2 shadow-md flex flex-col sm:flex-row p-8 sm:gap-8 group hover:border-primary rounded-sm">
                            <div className="w-full h-full  sm:w-1/2 md:w-1/3  border-2 shadow-sm rounded-md p-8 group-hover:border-primary">
                                <Image src={product.image} alt="productImage" height={200} width={200} className="w-full object-cover" />
                            </div>
                            <div>
                                <h2 className={` text-heading2 text-lg font-semibold ${montserrat.className} pt-8`}>{product.title}</h2>
                                <ul className="flex gap-4 flex-col">
                                    <li className={`${montserrat.className} text-caption text-sm`}>{product.rating.rate}&nbsp;({product.rating.count})</li>
                                    <li className={`text-heading1 text-2xl font-bold {open_sans.className}`}>Rs. {product.price}</li>
                                    <li className={`capitalize ${open_sans.className} text-sm w-fit border py-1 px-2 bg-tertiary text-white rounded-2xl`}>{product.category}</li>
                                    <li className="w-full sm:w-3/4"><p>{product.description}</p></li>
                                </ul>
                                <div className={`py-1 px-2 mt-8 h-fit w-fit font-medium rounded-md bg-primary text-white border hover:border-primary hover:bg-white hover:text-primary ${open_sans.className} cursor-pointer`}
                                    onClick={() => {
                                        dispatch(addToCart(product))
                                    }} >Add&nbsp;to&nbsp;cart</div>
                            </div>
                        </div>
                    </>
                }
            </section>
        </>
    )
}

export async function getServerSideProps(ctx) {
    // console.log(ctx.query.slug);

    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ['products'],
        queryFn: () =>
            fetch(`https://fakestoreapi.com/products/${ctx.query.slug}`).then(
                (res) => res.json(),
            ),
    })

    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    }
}