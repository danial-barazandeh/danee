import useSWR from 'swr'
import { useRouter } from 'next/router'
import React from 'react'
import Player from '../../../components/Player'
import { FaRegClock, FaStar, FaBook, FaNoteSticky } from "react-icons/fa6";
import { NumericFormat } from 'react-number-format';
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'
import Nav from '../../../components/Nav'
import Layout from '../../../components/Layout'
import Footer from '../../../components/Footer'
import parse from 'html-react-parser';
import {util} from '../../../components/util'

const fetcher = (...args) => fetch(...args).then(res => res.json())

const PostsForHome = () => {

  const router = useRouter();

  const src = '/api/products/' + router.query.id

  const { data, error } = useSWR(src, fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return (<div className='lg:px-32 py-8'>

    <div className='grid grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8  gap-6 justify-between items-centers m-6'>

      <div className='bg-white shadow-lg rounded-lg w-full col-span-6 xl:col-span-4 2xl:col-span-6 rounded-lgflex justify-center items-center'>
        <Player url={data.introUrl}></Player>
      </div>


      <div className='bg-white w-full h-max col-span-6 xl:col-span-2 2xl:col-span-2 rounded-lg shadow-lg p-4'>

        <ol className=' flex flex-col justify-center items-start gap-4'>

          <div className=' flex justify-center items-cesnter'>
            <i className="text-2xl text-primary">
              <FaNoteSticky></FaNoteSticky>
            </i>
            <li className="text-md text-tcolor pr-3"> {"مدت دوره : " + data.time} </li>
          </div>

          <div className=' flex justify-center items-center'>
            <i className="text-2xl text-primary">
              <FaStar></FaStar>
            </i>
            <li className="text-md text-tcolor pr-3"> پشتیبانی دائم </li>
          </div>

          <div className=' flex justify-center items-center'>
            <i className="text-2xl text-primary">
              <FaStar></FaStar>
            </i>
            <li className="text-md text-tcolor pr-3"> گروه تلگرام مخصوص </li>
          </div>


          <div className=' flex justify-center items-center'>
            <i className="text-2xl text-primary">
              <FaStar></FaStar>
            </i>
            <li className="text-md text-tcolor pr-3"> بروزرسانی رایگان </li>
          </div>

          <div className='flex flex-col justify-center items-center w-full my-4'>

            <span className="text-md text-tcolor pr- mb-4">
              <NumericFormat value={data.salePrice && data.salePrice.length > 0 ? data.salePrice : data.price} displayType={'text'} format="###,###" />
              &nbsp;
              هزار تومن
            </span>


            <a href={util.baseUrl+"payment/"+router.query.id}>
              <button className="bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded-md transition-all duration-300 ">
                شرکت در دوره
              </button>
            </a>
          </div>

        </ol>

      </div>

    </div>

    <div className='flex flex-row px-6 pb-6'>
      <div className='bg-white rounded-lg shadow-lg w-[100%] p-4'>
        <h1 className=' text-center m-6 font-[Lalezar] text-3xl text-tcolor'>{data.title}</h1>
        <br></br>
        <article>
          <div className='iner-html'>
            {parse(data.content)}
          </div>
        </article>
      </div>
    </div>

    <div className='flex flex-row px-6 pb-6'>
      <div className='bg-white rounded-lg shadow-lg w-[100%] p-4'>

        <h3 className=' text-2xl mb-4'>سرفصل ها</h3>

        {data.sections.map((section, index) => {
          return (
            <div key={index} className='my-4'>

              <div className='flex items-center justify-start my-4'>
                <FaBook></FaBook>  <h5 className='text-xl mx-4'>{section.title}</h5>
              </div>

              {section.lectures.map((lecture, index) => {
                return (
                  <Disclosure id={lecture.id} key={index}>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="bg-slate-200 flex my-4 w-full justify-between rounded-lg px-4 py-2 text-left text-sm font-medium ">
                          <div className='flex items-center justify-start my-4'>
                            <FaNoteSticky></FaNoteSticky>
                            <span className='text-md mx-4 text-tcolor font-bold'>{lecture.title}</span>
                          </div>
                          <ChevronUpIcon
                            className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-primary`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-4 pb-4 text-sm text-tcolor rounded-lg  bg-slate-200">

                          <Player url={lecture.url}></Player>

                          <br></br>

                          <div className='iner-html'>
                            {parse(lecture.content)}
                          </div>

                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                );
              })}

              <hr />
            </div>
          );
        })}


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