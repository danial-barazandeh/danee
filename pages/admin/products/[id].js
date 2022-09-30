import AdminMenu from '../../../components/admin/AdminMenu'
import { util } from '../../../components/util'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import React, { useState, useRef, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import axios from 'axios';

const importJodit = () => import('jodit-react');

const JoditEditor = dynamic(importJodit, {
    ssr: false,
});





export default function Product() {


    const router = useRouter();
    const [chips, setChips] = useState([]);
    var content = '';

    const titleRef = useRef(null);
    const imageRef = useRef(null);
    const seoTitleRef = useRef(null);
    const seoDiscriptionRef = useRef(null);
    const seoKeysRef = useRef(null);
    const priceRef = useRef(null);
    const salePriceRef = useRef(null);
    const timeRef = useRef(null);
    const introUrlRef = useRef(null);

    function handleChips() {
        setChips(current => [...current, seoKeysRef.current.value]);
        seoKeysRef.current.value = '';
    }

    const handleChipDelete = (chip) => {
        setChips(current => current.filter(c => { return c !== chip; }));
    }

    function handChipsLoad(chips) {
        setChips(chips)
    }

    
    const src = '/api/products/' + router.query.id

    const updateAPIData = () => {


        console.log(`${util.baseUrl}api/products/${router.query.id}`)

        if (content.length < 1)
            alert("مراقب متن باش")
        else
            axios.post(`${util.baseUrl}api/products/${router.query.id}`, {
                title: titleRef.current.value,
                content: content,
                introUrl: introUrlRef.current.value,
                time: timeRef.current.value,
                price: priceRef.current.vlue,
                salePrice: salePriceRef.current.value,
                image: imageRef.current.value,
                seoTitle: seoTitleRef.current.value,
                seoDiscription: seoDiscriptionRef.current.value,
                seoKeys: {
                    set: chips
                },
            }, {headers: {'Content-Type': 'application/json'}}
            // ).then((e) => console.log(e));
            ).then(() => window.location.href = `${util.baseUrl}/admin/products`);
            
    }

    const setContentFunction = (data) =>{
        content = data
    }


    const fetcher = (...args) => fetch(...args).then(res => res.json())
    const { data, error } = useSWR(src, fetcher)


    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>


    return (<div className='lg:px-8 py-8'>
        <form>
            <div className='bg-background rounded-lg shadow-lg p-8 flex flex-col gap-4'>

                <div>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" href={util.baseUrl + "admin"}>
                            ادمین
                        </Link>
                        <Link
                            underline="hover"
                            color="inherit"
                            href={util.baseUrl + "admin/products"}>
                            محصول ها
                        </Link>
                        <Typography color="text.primary">{data.title}</Typography>
                    </Breadcrumbs>
                </div>

                <div className='flex gap-4 justify-start items-center'>
                    <label htmlFor="title" className='w-[15%] font-bold'>عنوان</label>
                    <input type="text" className='w-[85%] px-4 py-2 border-slate-400 focus:border-sky-500 outline-none border-2 rounded-lg' id="title" ref={titleRef} name="title" defaultValue={data.title}></input>
                </div>

                <div className='flex gap-4 justify-start items-center'>
                    <label htmlFor="title" className='w-[15%] font-bold'>متن</label>
                    <div className='w-[85%] px-4 py-2'>

                        <JoditEditor
                            value={data.content}
                            onChange={async (e) => setContentFunction(e) }
                            tabIndex={1} // tabIndex of textarea // preferred to use only this option to update the content for performance reasons
                        />
                    </div>
                </div>

                
                <div className='flex gap-4 justify-start items-center'>
                    <label htmlFor="title" className='w-[15%] font-bold'>ویدئو معرفی</label>
                    <input type="text" className='w-[85%] px-4 py-2 border-slate-400 focus:border-sky-500 outline-none border-2 rounded-lg' id="introUrl" ref={introUrlRef} name="introUrl" defaultValue={data.introUrl}></input>
                </div>

                <div className='flex gap-4 justify-start items-center'>
                    <label htmlFor="image" className='w-[15%] font-bold'>لینک تصویر</label>
                    <input type="text" className='w-[85%] px-4 py-2 border-slate-400 focus:border-sky-500 outline-none border-2 rounded-lg' id="image" ref={imageRef} name="image" defaultValue={data.image.url}></input>
                </div>

                <div className='flex gap-4 justify-start items-center'>
                    <label htmlFor="seoTitle" className='w-[15%] font-bold'>عنوان سئو</label>
                    <input type="text" className='w-[85%] px-4 py-2 border-slate-400 focus:border-sky-500 outline-none border-2 rounded-lg' id="seoTitle" defaultValue={data.seoTitle} ref={seoTitleRef} name="seoTitle"></input>
                </div>


                <div className='flex gap-4 justify-start items-center'>
                    <label htmlFor="seoTitle" className='w-[15%] font-bold'>قیمت</label>
                    <input type="text" className='w-[35%] px-4 py-2 border-slate-400 focus:border-sky-500 outline-none border-2 rounded-lg' id="price" defaultValue={data.price} ref={priceRef} name="seoTitle"></input>
                    <p className="text-tcolor"> هزار تومن </p>
                </div>


                <div className='flex gap-4 justify-start items-center'>
                    <label htmlFor="seoTitle" className='w-[15%] font-bold'>قیمت پس از تخفیف</label>
                    <input type="text" className='w-[35%] px-4 py-2 border-slate-400 focus:border-sky-500 outline-none border-2 rounded-lg' id="salePrice" defaultValue={data.salePrice} ref={salePriceRef} name="salePrice"></input>
                    <p className="text-tcolor"> هزار تومن </p>
                </div>

                <div className='flex gap-4 justify-start items-center'>
                    <label htmlFor="seoTitle" className='w-[15%] font-bold'>ساعت دوره</label>
                    <input type="text" className='w-[85%] px-4 py-2 border-slate-400 focus:border-sky-500 outline-none border-2 rounded-lg' id="time" defaultValue={data.time} ref={timeRef} name="seoTitle"></input>
                </div>

                <div className='flex gap-4 justify-start items-center'>
                    <label htmlFor="seoDescription" className='w-[15%] font-bold'>متن سئو</label>
                    <input type="text" className='w-[85%] px-4 py-2 border-slate-400 focus:border-sky-500 outline-none border-2 rounded-lg' id="seoDiscription" defaultValue={data.seoDiscription} ref={seoDiscriptionRef} name="seoDiscription"></input>
                </div>


                <div className='flex gap-4 justify-start items-center'>
                    <label htmlFor="seoKeys" className='w-[15%] font-bold'>کلید سئو</label>
                    <input type="text" className='w-[85%] px-4 py-2 border-slate-400 focus:border-sky-500 outline-none border-2 rounded-lg' id="seoKeys" name="seoKeys" ref={seoKeysRef} onKeyDown={(event, value) => {
                        if (event.code === "Enter" || event.code === "NumpadEnter") {
                            handleChips()
                        }
                    }}></input>
                </div>

                <button onClick={() => handChipsLoad(data.seoKeys)} type="button" className='w-[15%] px-4 py-2 text-white rounded-lg bg-green-500'>
                    بارگذاری تگ ها
                </button>

                <div className='flex gap-4'>
                    {
                        chips.map((chip) => {
                            return (<Chip key={chip} label={chip} onDelete={() => handleChipDelete(chip)} />);
                        })
                    }
                </div>


                <div className='flex gap-4 justify-start items-center'>
                    <label htmlFor="seoDescription" className='w-[15%] font-bold'>متن سئو</label>
                    <input type="text" className='w-[85%] px-4 py-2 border-slate-400 focus:border-sky-500 outline-none border-2 rounded-lg' id="seoDiscription" defaultValue={data.seoDiscription} ref={seoDiscriptionRef} name="seoDiscription"></input>
                </div>

                <div>
                    <br></br>
                    <Button variant="contained" color='success' className='bg-green-600' onClick={updateAPIData}>
                        <p>
                            ویرایش
                        </p>
                    </Button>
                    <br></br>
                </div>

            </div>
        </form>



    </div>
    )


}


Product.getLayout = function getLayout(page) {
    return (
        <AdminMenu>{page}</AdminMenu>
    )
}
