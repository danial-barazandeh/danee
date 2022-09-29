import AdminMenu from '../../../components/admin/AdminMenu'
import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import axios from 'axios';
import { util } from '../../../components/util'

const importJodit = () => import('jodit-react');




export default function Post() {

    const [chips, setChips] = useState([]);
    var content = '';

    const titleRef = useRef(null);
    const imageRef = useRef(null);
    const seoTitleRef = useRef(null);
    const seoDescriptionRef = useRef(null);
    const seoKeysRef = useRef(null);


    const JoditEditor = dynamic(importJodit, {
        ssr: false,
    });

    


    function handleChips() {
        setChips(current => [...current, seoKeysRef.current.value]);
        seoKeysRef.current.value = '';
    }

    const handleChipDelete = (chip) => {
        setChips(current => current.filter(c => { return c !== chip; }));
    }

    // const createAPIData = () => {
    //     console.log(contentRef.current.vlue)
    // }

    const setContentFunction = (data) =>{
        content = data
    }

    const createAPIData = () => {
        axios.post(`${util.baseUrl}api/posts`, {
            title: titleRef.current.value,
            content: content,
            image: imageRef.current.value,
            seoTitle: seoTitleRef.current.value,
            seoDiscription: seoDescriptionRef.current.value,
            seoKeys: {
                set: chips
              },
        }, {headers: {'Content-Type': 'application/json'}}
        // ).then((e) => console.log(e));
        ).then(() => window.location.href = `${util.baseUrl}/admin/posts`);
    }

    return (<div className='lg:px-8 py-8'>
        <form>
            <div className='bg-background rounded-lg shadow-lg p-8 flex flex-col gap-4'>

                <div className='flex gap-4 justify-start items-center'>
                    <label for="title" className='w-[15%] font-bold'>عنوان</label>
                    <input type="text" className='w-[85%] px-4 py-2 border-slate-400 focus:border-sky-500 outline-none border-2 rounded-lg' id="title" ref={titleRef} name="title"></input>
                </div>

                <div className='flex gap-4 justify-start items-center'>
                    <label for="image" className='w-[15%] font-bold'>لینک تصویر</label>
                    <input type="text" className='w-[85%] px-4 py-2 border-slate-400 focus:border-sky-500 outline-none border-2 rounded-lg' id="image" ref={imageRef} name="image"></input>
                </div>

                <div className='flex gap-4 justify-start items-center'>
                    <label for="content" className='w-[15%] font-bold'>متن</label>
                    <div className='w-[85%] px-4 py-2'>

                        <JoditEditor
                            name="content"
                            onChange={async (e) => setContentFunction(e) }
                            tabIndex={1} // tabIndex of textarea
                        />
                    </div>
                </div>


                <div className='flex gap-4 justify-start items-center'>
                    <label for="seoTitle" className='w-[15%] font-bold'>عنوان سئو</label>
                    <input type="text" className='w-[85%] px-4 py-2 border-slate-400 focus:border-sky-500 outline-none border-2 rounded-lg' id="seoTitle" ref={seoTitleRef} name="seoTitle"></input>
                </div>

                <div className='flex gap-4 justify-start items-center'>
                    <label for="seoDescription" className='w-[15%] font-bold'>متن سئو</label>
                    <input type="text" className='w-[85%] px-4 py-2 border-slate-400 focus:border-sky-500 outline-none border-2 rounded-lg' id="seoDescription" ref={seoDescriptionRef} name="seoDescription"></input>
                </div>


                <div className='flex gap-4 justify-start items-center'>
                    <label for="seoKeys" className='w-[15%] font-bold'>کلید سئو</label>
                    <input type="text" className='w-[85%] px-4 py-2 border-slate-400 focus:border-sky-500 outline-none border-2 rounded-lg' id="seoKeys" name="seoKeys" ref={seoKeysRef} onKeyDown={(event, value) => {
                        if (event.code === "Enter" || event.code === "NumpadEnter") {
                            handleChips()
                        }
                    }}></input>
                </div>

                <div className='flex gap-4'>
                    {chips.map((chip) => {
                        return (<Chip label={chip} onDelete={() => handleChipDelete(chip)} />);
                    })}
                </div>


                <div>
                    <br></br>
                    <Button variant="contained" color='success' className='bg-green-600' onClick={createAPIData}>
                        <p>
                            ثبت
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
