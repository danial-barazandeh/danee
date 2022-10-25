import useSWR from 'swr'
import { useRouter } from 'next/router'
import Player from '../../components/Player'
import { FaRegClock, FaStar, FaBook, FaRegStickyNote } from "react-icons/fa";
import NumberFormat from 'react-number-format';
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'
import Nav from '../../components/Nav'
import Layout from '../../components/Layout'
import Footer from '../../components/Footer'
import parse from 'html-react-parser';
import { useState, useEffect, useRef } from 'react';
import { signIn, useSession, getSession } from "next-auth/react";
import axios from 'axios';
import { util } from '../../components/util';
import styles from '../../styles/payment.module.css'
import { Button } from '@mui/material';
import { off } from 'process';

const fetcher = (...args) => fetch(...args).then(res => res.json())

const PostsForHome = () => {

  const router = useRouter();

  const src = '/api/products/' + router.query.id

  const { data, error } = useSWR(src, fetcher);

  const [user, setUser] = useState({});

  useEffect(() => {
    const doooo = async () => {
      let ses = await getSession();
      
      if(typeof ses !== 'undefined'){
        axios.get(`${util.baseUrl}api/users/${ses.user.id}`,
          {
            headers: { 'Content-Type': 'application/json' }
          }).then(res => {
            setUser(res.data);
          })
      }

    }
    doooo();
  }, []);


  const createPayment = () => {
    const res = axios.post(`${util.baseUrl}api/payment`, {
        userId: user.id,
        productId: data.id,
        priceAfterDiscount: data.salePrice ? data.salePrice : data.price,
        priceBeforeDiscount: data.price,
    }, { headers: { 'Content-Type': 'application/json' } }
        // ).then((e) => console.log(e));
    );

    axios.post(`https://api.idpay.ir/v1.1/payment`, {
      amount: data.salePrice ? data.salePrice : data.price,
      name: user.firstName+" "+user.familyName,
      phone: user.phone,
      mail: user.email,
      desc: data.title,
  }, { headers: { 'Content-Type': 'application/json' , 'X-SANDBOX': 1} }
  ).then((res) => console.log(res));
    

}


  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return (<div className='px-[5vh] py-8'>

    <div className=' bg-white w-full h-full shadow-lg rounded-lg p-8'>
      <p>
        شما با حساب کاربری
        <a className='text-blue-400' href={util.baseUrl + "panel"}> {user.firstName + " " + user.familyName + " "} </a>
        در حال خرید دوره
        <a className='text-blue-400' href={util.baseUrl + "product/" + data.id}> {data.title + " "} </a>
        هستید.
      </p>

      <div className={styles.productHolder}>
        <img src={data.image.url} />
        <div>
          <p className="text-md text-tcolor pr- mb-4">
            <NumberFormat value={data.salePrice && data.salePrice.length > 0 ? data.salePrice : data.price} displayType={'text'} format="###,###" />
            &nbsp;
            هزار تومن
          </p>
        </div>
        <button onClick={createPayment}>
          پرداخت هزینه
        </button>
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