import { Montserrat } from 'next/font/google'
import Link from "next/link";

const montserrat = Montserrat({ subsets: ['latin'] })

export default function Error404() {
    return (<>

        <section className="container pt-16">
            <div className="w-full  h-screen flex gap-8 flex-col justify-center items-center">
                <h2 className={`${montserrat.className} text-heading1 text-3xl font-bold text-center`}>404 : Resource not Found</h2>
                <Link href={"/"}><div className={`${montserrat.className} px-8 py-2 border border-primary bg-primary text-white font-bold rounded-md hover:bg-white hover:text-primary`}>HOME</div></Link>
            </div>

        </section>

    </>)
}