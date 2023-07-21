import Image from "next/image";
import { useSelector } from "react-redux";
import { Montserrat } from 'next/font/google'


const montserrat = Montserrat({ subsets: ['latin'] })

export default function Cart() {

    let cartItems = useSelector((redux_store) => {
        return redux_store.cart.value
    })


    // console.log(cartItems);

    return (
        <>
            {/* {JSON.stringify(cartItems)} */}
            <section className="container pt-32 pb-16">
                <h2 className={`text-2xl font-bold text-heading1 py-8 ${montserrat.className}`}>Total Cart Items: {cartItems.length}</h2>
                <div className="flex flex-col gap-8">
                    {
                        cartItems &&

                        cartItems.map(item => {
                            return <div key={item.id}>
                                <div className="border-2 flex flex-col items-center sm:items-start p-4 sm:flex-row shadow group hover:border-primary hover:shadow-primary/50 rounded-md">
                                    <div className="sm:w-[20%] md:w-[10%] h-fit w-1/2 border-2 rounded-md shadow mb-0  m-4 sm:mb-4 group-hover:border-primary group-hover:shadow-primary/50 "><Image src={item.image} height={200} width={200} alt="productImage" className="w-full object-fill p-4" /></div>
                                    <div>
                                        <h2 className={` text-heading2 text-lg font-semibold ${montserrat.className} pt-16 line-clamp-2`}>{item.title}</h2>
                                        <ul className="flex gap-4 flex-col">
                                            <li className={`text-heading1 text-2xl font-bold {open_sans.className}`}>Rs. {item.price}</li>
                                            <li className={`text-heading1 text-xl font-semibold {open_sans.className}`}>Quantity: {item.quantity}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
            </section>
        </>
    )
}