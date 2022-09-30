import useSWR from 'swr'
import { useRouter } from 'next/router'
import React from 'react'
import { FaRegClock, FaStar, FaBook, FaRegStickyNote } from "react-icons/fa";
import NumberFormat from 'react-number-format';
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'
import Nav from '../../components/Nav'
import Layout from '../../components/Layout'
import Footer from '../../components/Footer'
import parse from 'html-react-parser';
import Chip from '@mui/material/Chip';

const fetcher = (...args) => fetch(...args).then(res => res.json())

const PostsForHome = () => {

    const router = useRouter();

    const src = '/api/posts/' + router.query.id

    const { data, error } = useSWR(src, fetcher)
    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>
    return (<div className='lg:px-32 p-8 flex flex-col gap-4'>


        <div className='flex flex-col gap-4 align-middle items-center bg-white rounded-lg p-8 shadow-lg'>


            {/* AUTHOR DETAIL */}
            <div className='w-full flex align-middle items-center gap-4'>


                <div>
                    <img src={data.author.image.url} className="rounded-3xl cursor-pointer h-24 w-24 hover:rounded-md transition-all duration-300 ease-linear " />
                </div>
                <div className='flex flex-col'>
                    <div className='text-tcolor text-lg'>
                        {data.author.firstName + " " + data.author.familyName}
                    </div>

                    <div className='text-tcolor text-lg '>
                        {data.author.email}
                    </div>
                </div>
            </div>



            {/* POST DETAIL */}
            <div className='flex flex-col items-center align-middle gap-4'>
                <img src={data.image.url} className="rounded-xl" />

                <h1 className='text-tcolor text-3xl font-bold mt-8'> {data.title} </h1>

                

                <div className='iner-html w-[70%]'>
                    {parse(data.content)}
                </div>

                <br></br>


                
                <div className='flex gap-4'>
                    {
                        data.seoKeys.map((chip) => {
                            return (<Chip label={chip} key={chip}/>);
                        })
                    }
                </div>


            </div>


        </div>






    </div>)

}

export default PostsForHome

PostsForHome.getLayout = function getLayout(page) {
    return (
        <>
            <Layout>
                <Nav></Nav>
                {page}
            </Layout>
            <Footer></Footer>
        </>
    )
}