import useSWR from 'swr'
import ScrollContainer from 'react-indiana-drag-scroll'
import { FaRegClock } from "react-icons/fa";
import NumberFormat from 'react-number-format';
import Image from 'next/image'
import Link from "next/link";

const {util} = require('./util');

const fetcher = (...args) => fetch(...args).then(res => res.json())

const ProductWidget = (props) => {

    const price = props.price
    const src = props.image.url
    const productUrl = '/product/'+props.id

    return (
        <Link href={productUrl}>
                        <div className='relative w-90 mb-6 transform-gpu transition-all duration-300 ease-linear grid cursor-pointer rounded-lg overflow-hidden bg-white shadow-lg' key={props.id}>
                            <div className='flex flex-col' >


                            <img src={src} className="w-[100%] h-64 sm:h-64 md:h-64 lg:h-72 xl:h-80 2xl:h-80" />
                    

                                <h2 className='text-tcolor p-4 font-semibold'> {props.title} </h2>
                                

                                <div className='px-4 flex items-cente'>

                                    <p className="text-2xl text-primary">
                                        <FaRegClock></FaRegClock>
                                    </p>

                                    <p  className="text-md text-tcolor pr-3"> {"مدت دوره : "+props.time} </p>

                                </div>



                                <div className='flex justify-between items-center my-4'>
                               
                                <button type="button" className="primary-button hover:primary-button-hover transition-all duration-300 ease-linear">
                                    <p className='text-white text-xs font-semibold 2xl:text-sm'>
                                        شرکت در دوره    
                                    </p>
                                </button>


                                <div className='text-tcolor p-2 mx-2 flex justify-center items-center' dir='ltr'>
                                        <p className=' text-xs px-2'> تومان </p>
                                        <NumberFormat value={price} displayType={'text'} format="###,###"/>
                                </div>

                                </div>
                                
                            </div>
                        </div>
            </Link>
     ) 
  }
  
  export default ProductWidget