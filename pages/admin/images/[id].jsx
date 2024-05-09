import AdminMenu from '../../../components/admin/AdminMenu'
import useSWR from 'swr'
import { useRouter, useHistory } from 'next/router'
import React, { useState, useRef, useEffect, useMemo } from 'react';
import axios from 'axios';
import Link from 'next/link'
import { util } from "../../../components/util";
import {Image as NextImage} from 'next/image';

const fetcher = (...args) => fetch(...args).then(res => res.json())



export default function Image() {



    const router = useRouter();

    const titleRef = useRef(null);
    const descriptionRef = useRef(null);


    const updateAPIData = () => {
        axios.put(`${util.baseUrl}api/images/${router.query.id}`, {
            title: titleRef.current.value,
            description: descriptionRef.current.value,
        }).then(() => window.location.href = `${util.baseUrl}/admin/images`);
    }



    const src = '/api/images/' + router.query.id



    const { data, error } = useSWR(src, fetcher)
    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>
    return (<div className='lg:px-8 py-8'>

        <form>
            <div className='bg-background rounded-lg shadow-lg p-8 flex flex-col gap-4'>

                <div className='flex gap-4 justify-start items-center'>
                    <label className='w-[15%] font-bold'>عنوان</label>
                    <input type="text" ref={titleRef} className='w-[85%] px-4 py-2 border-slate-400 focus:border-sky-500 outline-none border-2 rounded-lg' id="title" name="title" defaultValue={data.title}></input>
                </div>

                <div className='flex gap-4 justify-start items-center'>
                    <label className='w-[15%] font-bold'>متن</label>
                    <input type="text" ref={descriptionRef} className='w-[85%] px-4 py-2 border-slate-400 focus:border-sky-500 outline-none border-2 rounded-lg' id="title" name="title" defaultValue={data.description}></input>
                </div>

                <div className='flex gap-4 justify-start items-center'>
                    <label className='w-[15%] font-bold'>لینک تصویر</label>
                    <input type="text" className='w-[85%] px-4 py-2 border-slate-400 bg-slate-300 outline-none border-2 rounded-lg' disabled id="title" name="title" defaultValue={data.url}></input>
                </div>

                <div className='flex gap-4 justify-start items-center'>
                    <label className='w-[15%] font-bold'>تصویر</label>
                    <div className=' w-[30%] h-[30%] border-2 border-slate-400 rounded-md overflow-hidden'>
                        <NextImage width={1920/2} height={1080/2} alt={data.url} src={data.url}></NextImage>
                    </div>
                </div>

                <div className='flex gap-4 justify-start items-center'>
                    <button className='bg-primary text-white py-2 px-4 rounded-lg font-bold' onClick={updateAPIData}>ویرایش</button>
                </div>
            </div>
        </form>

    </div>
    )

}


Image.getLayout = function getLayout(page) {
    return (
        <AdminMenu>{page}</AdminMenu>
    )
}
