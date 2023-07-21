import { dehydrate, QueryClient } from '@tanstack/react-query'
import Products from '@/components/Products'


export default function Home(props) {

  // console.log(props.dehydratedState.queries[0]?.state.data);
  let products = props.dehydratedState.queries[0]?.state.data
  return (
    <>
      <Products products={products} />
      {
        !products && <div className='h-screen'></div>
      }
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
