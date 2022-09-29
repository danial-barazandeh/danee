import AdminMenu from '../../../../components/admin/AdminMenu'
import {util} from '../../../../components/util'
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

const fetcher = (...args) => fetch(...args).then(res => res.json())



export default function Post() {



    const router = useRouter();
    const src = '/api/posts/' + router.query.id

    const [chips, setChips] = useState([]);
    var content = '';

    const titleRef = useRef(null);
    const imageRef = useRef(null);
    const seoTitleRef = useRef(null);
    const seoDiscriptionRef = useRef(null);
    const seoKeysRef = useRef(null);

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


    const updateAPIData = () => {

        if(content.length < 1)
            alert("مراقب متن باش")
        else    
        axios.put(`${util.baseUrl}${src}`, {
            title: titleRef.current.value,
            content: content,
            image: imageRef.current.value,
            seoTitle: seoTitleRef.current.value,
            seoDiscription: seoDiscriptionRef.current.value,
            seoKeys: {
                set: chips
              },
        }, {headers: {'Content-Type': 'application/json'}}
        // ).then((e) => console.log(e));
        ).then(() => window.location.href = `${util.baseUrl}/admin/posts`);
        
    }

    const setContentFunction = (data) =>{
        content = data
    }

    const { data, error } = useSWR(src, fetcher)



    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>


    return (<div className='lg:px-8 py-8'>
        <form>
            <div className='bg-background rounded-lg shadow-lg p-8 flex flex-col gap-4'>

                <div>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" href={util.baseUrl+"admin"}>
                            ادمین
                        </Link>
                        <Link
                            underline="hover"
                            color="inherit"
                            href={util.baseUrl+"admin/posts"}>
                            پست ها
                        </Link>
                        <Typography color="text.primary">{data.title}</Typography>
                    </Breadcrumbs>
                </div>

                <div className='flex gap-4 justify-start items-center'>
                    <label for="title" className='w-[15%] font-bold'>عنوان</label>
                    <input type="text" className='w-[85%] px-4 py-2 border-slate-400 focus:border-sky-500 outline-none border-2 rounded-lg' id="title" ref={titleRef} name="title" defaultValue={data.title}></input>
                </div>

                <div className='flex gap-4 justify-start items-center'>
                    <label for="title" className='w-[15%] font-bold'>متن</label>
                    <div className='w-[85%] px-4 py-2'>

                        <JoditEditor
                            value={data.content}
                            onChange={async (e) => setContentFunction(e) }
                            tabIndex={1} // tabIndex of textarea // preferred to use only this option to update the content for performance reasons
                        />
                    </div>
                </div>

                <div className='flex gap-4 justify-start items-center'>
                    <label for="image" className='w-[15%] font-bold'>لینک تصویر</label>
                    <input type="text" className='w-[85%] px-4 py-2 border-slate-400 focus:border-sky-500 outline-none border-2 rounded-lg' id="image" ref={imageRef} name="image" defaultValue={data.image.url}></input>
                </div>

                <div className='flex gap-4 justify-start items-center'>
                    <label for="seoTitle" className='w-[15%] font-bold'>عنوان سئو</label>
                    <input type="text" className='w-[85%] px-4 py-2 border-slate-400 focus:border-sky-500 outline-none border-2 rounded-lg' id="seoTitle" defaultValue={data.seoTitle} ref={seoTitleRef} name="seoTitle"></input>
                </div>

                <div className='flex gap-4 justify-start items-center'>
                    <label for="seoDescription" className='w-[15%] font-bold'>متن سئو</label>
                    <input type="text" className='w-[85%] px-4 py-2 border-slate-400 focus:border-sky-500 outline-none border-2 rounded-lg' id="seoDiscription" defaultValue={data.seoDiscription} ref={seoDiscriptionRef} name="seoDiscription"></input>
                </div>


                <div className='flex gap-4 justify-start items-center'>
                    <label for="seoKeys" className='w-[15%] font-bold'>کلید سئو</label>
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
                            return (<Chip label={chip} onDelete={() => handleChipDelete(chip)} />);
                        })
                    }
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


Post.getLayout = function getLayout(page) {
    return (
        <AdminMenu>{page}</AdminMenu>
    )
}
