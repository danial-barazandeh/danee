import useSWR from 'swr'
import ScrollContainer from 'react-indiana-drag-scroll'
import { FaRegClock } from "react-icons/fa";
import { PatternFormat } from 'react-number-format';
import Link from "next/link";
import Image from 'next/image'

const {util} = require('./util');

const fetcher = (...args) => fetch(...args).then(res => res.json())

const ProductWidgetHome = (props) => {

    const price = props.price
    const salePrice = props.salePrice
    const src =  props.image.url
    const productUrl = '/product/'+props.id

    return (
        <Link href={productUrl}>
                        <div className='relative w-90 mb-6 transform-gpu transition-all duration-300 ease-linear grid cursor-pointer rounded-lg overflow-hidden bg-white shadow-lg' key={props.id}>
                            <div className='flex flex-col' >
                                <Image alt={props.image.title} width={600} height={400} src={src} className="object-fill w-80 h-[200px] z-0" />
                                <h6 className='text-tcolor p-4 font-semibold text-lg'> {props.title} </h6>
                                

                                <div className='px-4 flex items-cente'>

                                    <p className="text-2xl text-primary">
                                        <FaRegClock></FaRegClock>
                                    </p>

                                    <p  className="text-md text-tcolor pr-3"> {"مدت دوره : "+props.time} </p>

                                </div>



                                <div className='flex justify-between items-center my-4'>
                               
                                    <button type="button" className=" primary-button hover:primary-button-hover transition-all duration-300 ease-linear">
                                        <p className='text-white text-xs font-semibold 2xl:text-sm'>
                                            شرکت در دوره    
                                        </p>
                                    </button>


                                    <div className='flex justify-end items-center'>
                                        <div className='text-tcolor flex justify-center items-center p-2' dir='ltr'>
                                                <PatternFormat value={price} displayType={'text'} format="###,###" className=" line-through"/>
                                        </div>

                                        <div className='text-white bg-green-600 rounded-3xl mx-2 px-2 flex justify-center items-center' dir='ltr'>
                                                <p className=' text-xs mx-2'> تومان </p>
                                                <PatternFormat value={salePrice} displayType={'text'} format="###,###"/>
                                        </div>
                                    </div>

                                </div>
                                
                            </div>
                        </div>
                        </Link>
     ) 
  }
  
  export default ProductWidgetHome