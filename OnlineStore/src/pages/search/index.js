import { Open_Sans } from 'next/font/google'
import { dehydrate, QueryClient, } from '@tanstack/react-query'
import Products from "@/components/Products";
import { useState } from "react";
import { Montserrat } from 'next/font/google'


const montserrat = Montserrat({ subsets: ['latin'] })

const open_sans = Open_Sans({ subsets: ['latin'] })

export default function Search(props) {
    let fetchedProducts = props?.dehydratedState?.queries[0]?.state?.data
    //    console.log(fetchedProducts);

    let [products, setproducts] = useState([])
    let [viewProduct, setViewProduct] = useState(false)



    let filtered_products = []
    function handleSubmit(event) {
        event.preventDefault()
        let searchTerm = event.target.value.toLowerCase()
        // console.log(searchTerm);

        if (searchTerm) {
            filtered_products = fetchedProducts?.filter((product) => product.title.toLowerCase().includes(searchTerm))
            setproducts(filtered_products)
            setViewProduct(true)
            // console.log(filtered_products); 
        }
        else {
            setViewProduct(false)
        }
    }



    return (
        <>

            <section className="container pt-24">
                <form className="flex w-full  gap-4 sm:justify-end" >
                    <input type="text" placeholder="Search Here" onChange={handleSubmit} name="search" className={`w-full sm:w-fit p-1 border-2 outline-none border-primary rounded-md px-4 ${open_sans.className}`} />
                </form>
                {
                    viewProduct ? <Products products={products} /> : <h1 className={`text-2xl font-bold text-heading1 py-8 ${montserrat.className}`}>Search Your Product</h1>
                }
            </section>
        </>
    )
}

export async function getServerSideProps() {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ['products'],
        queryFn: () =>
            fetch('https://fakestoreapi.com/products').then(
                (res) => res.json(),
            ),
    })
    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    }
}