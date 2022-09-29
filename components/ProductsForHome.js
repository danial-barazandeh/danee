import useSWR from 'swr'
import ScrollContainer from 'react-indiana-drag-scroll'
import { FaRegClock } from "react-icons/fa";
import ProductWidget from './ProductWidget';
import ProductSaleWidget from './ProductSaleWidget';
import ProductWidgetHome from './ProductWidgetHome';

const fetcher = (...args) => fetch(...args).then(res => res.json())

const ProductsForHome = () => {
    const { data, error } = useSWR('/api/products', fetcher)
    if (error) return <div>An error occured.</div>
    if (!data) return <div>Loading ...</div>

    console.log(data)

    return (

        <div className='bg-gradient-to-r from-secondary to-primary'>
            <h1 className='mx-8 pt-8 text-white text-2xl'>دوره ها</h1>
            <ScrollContainer className="scroll-container">
                <div className='flex space-x-4 space-x-reverse py-8 px-8'>
                    {data.data.map((product, index) => (

                        <ProductWidgetHome key={index} {...product}></ProductWidgetHome>

                    ))}
                </div>
            </ScrollContainer>
        </div>

        // <div className='grid justify-center items-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-x-6 mx-6'>
        //         {data.data.map((product,index) => (

        //             product.salePrice ? <ProductSaleWidget key={index} {...product}> </ProductSaleWidget> : <ProductWidget key={index} {...product}></ProductWidget>

        //         ))}
        // </div>

    )
}

export default ProductsForHome