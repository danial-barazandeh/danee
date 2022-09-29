import AdminMenu from '../../../../components/admin/AdminMenu'
import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import axios from 'axios';
import { util } from '../../../../components/util'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const importJodit = () => import('jodit-react');
const JoditEditor = dynamic(importJodit, {
    ssr: false,
});

export default function Lectures() {


    const titleRef = useRef(null);
    const videoRef = useRef(null);


    const [section, setSection] = React.useState(1);
    const [sections, setSections] = useState([]);
    const [temp, setTemp] = useState('');
    useEffect(() => {
        axios.get(`${util.baseUrl}api/sections`, { headers: { 'Content-Type': 'application/json' } }
        ).then((e) => setSections(e.data));
    }, [sections]);
    const insertAPIData = () => {
        axios.post(`${util.baseUrl}api/lectures`, {
            title: titleRef.current.value,
            content: temp,
            video: videoRef.current.value,
            sectionId: section
        }, { headers: { 'Content-Type': 'application/json' } }
            // ).then((e) => console.log(e));
        ).then(() => window.location.href = `${util.baseUrl}/admin/posts/lectures`);
    }
    const handleSectionChange = (event) => {
        setSection(event.target.value);
    };


    const editLectureTitleRef = useRef(null);
    const editContentRef = useRef(null);
    const editLectureVideoRef = useRef(null);
    const [content, setContent] = useState('');
    const [lecture, setLecture] = useState(1);
    const [lectures, setLectures] = useState([]);
    const [editSection, setEditSection] = useState(1);
    const handleLectureChange = (event) => {
        setLecture(event.target.value);
        editLectureTitleRef.current.value = lectures.find(object => object.id === event.target.value).title
        setContent(lectures.find(object => object.id === event.target.value).content)
        setEditSection(lectures.find(object => object.id === event.target.value).section.id)
    };
    useEffect(() => {
        axios.get(`${util.baseUrl}api/lectures`, { headers: { 'Content-Type': 'application/json' } }
        ).then((e) => setLectures(e.data));
    }, [lectures]);
    const updateAPIData = (id) => {
        axios.put(`${util.baseUrl}api/lectures/${id}`, {
            title: editLectureTitleRef.current.value,
            content: content,
            video: editLectureVideoRef.current.value,
            sectionId: editSection
        }, { headers: { 'Content-Type': 'application/json' } }
            // ).then((e) => console.log(e));
        ).then(() => window.location.href = `${util.baseUrl}/admin/products/lectures`);
    }
    const handleEditSectionChange = (event) => {
        setEditSection(event.target.value);
    };
    const deleteAPIData = (id) => {
        if (window.confirm("آیا از پاک کردن این درست مطمعا هستید  ؟")) {
            axios.delete(`${util.baseUrl}api/lectures/${id}`, {
            }, { headers: { 'Content-Type': 'application/json' } }
                // ).then((e) => console.log(e));
            ).then(() => window.location.href = `${util.baseUrl}/admin/products/lectures`);
        }
    }








    return (<div className='lg:px-8 py-8'>

        <form>
            <div className='bg-background rounded-lg shadow-lg p-8 flex flex-col gap-4'>


                <div className='flex gap-4 justify-start items-center'>
                    <label for="title" className='w-[15%] font-bold'>عنوان</label>
                    <input type="text" className='w-[85%] px-4 py-2 border-slate-400 focus:border-sky-500 outline-none border-2 rounded-lg' id="title" ref={titleRef} name="title"></input>
                </div>

                <div className='flex gap-4 justify-start items-center'>
                    <label for="video" className='w-[15%] font-bold'>ویدئو</label>
                    <input type="text" className='w-[85%] px-4 py-2 border-slate-400 focus:border-sky-500 outline-none border-2 rounded-lg' id="video" ref={videoRef} name="video"></input>
                </div>


                <div className='flex gap-4 justify-start items-center'>
                    <label for="content" className='w-[15%] font-bold'>متن</label>
                    <div className='w-[85%] px-4 py-2'>

                        <JoditEditor
                            name="content"
                            onChange={async (e) => setTemp(e)}
                            tabIndex={1} // tabIndex of textarea
                        />
                    </div>
                </div>


                <div className='flex gap-4 justify-start items-center'>
                    <label className='w-[15%] font-bold'>سرفصل</label>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="product"
                        value={section}
                        onChange={handleSectionChange}
                        className="focus:border-sky-500 ">

                        {sections.map((section, index) => {
                            return (
                                <MenuItem value={parseInt(section.id)} key={index}><p>{section.title} - {section.product.title}</p></MenuItem>
                            )
                        })}

                    </Select>
                </div>


                <div>
                    <Button variant="contained" color='success' className='bg-green-600' onClick={() => insertAPIData()}>
                        <p>
                            ثبت ویدئو
                        </p>
                    </Button>
                </div>


            </div>
        </form>



        <form>
            <div className='bg-background rounded-lg shadow-lg p-8 flex flex-col gap-4 mt-8'>

                <div className='flex gap-4 justify-start items-center'>
                    <label for="product" className='w-[15%] font-bold'>درس</label>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="product"
                        value={lecture}
                        onChange={handleLectureChange}
                        className="focus:border-sky-500 ">

                        {lectures.map((lecture, index) => {
                            return (
                                <MenuItem value={parseInt(lecture.id)} key={index}><p>{lecture.title} - {lecture.section.title} - {lecture.section.product.title}</p></MenuItem>
                            )
                        })}

                    </Select>

                </div>


                {
                    lectures.length > 0 ?
                        <div className='flex gap-4 justify-start items-center'>
                            <label for="title" className='w-[15%] font-bold'>عنوان</label>
                            <input type="text" defaultValue={lectures.find(object => object.id === lecture).title} className='w-[85%] px-4 py-2 border-slate-400 focus:border-sky-500 outline-none border-2 rounded-lg' id="editLectureTitleRef" ref={editLectureTitleRef} name="editLectureTitleRef"></input>
                        </div>
                        : <></>
                }


                {
                    lectures.length > 0 ?
                        <div className='flex gap-4 justify-start items-center'>
                            <label for="title" className='w-[15%] font-bold'>ویدئو</label>
                            <input type="text" defaultValue={lectures.find(object => object.id === lecture).url} className='w-[85%] px-4 py-2 border-slate-400 focus:border-sky-500 outline-none border-2 rounded-lg' id="editLectureVideoRef" ref={editLectureVideoRef} name="editLectureVideoRef"></input>
                        </div>
                        : <></>
                }

                {
                    lectures.length > 0 ?
                        <div className='flex gap-4 justify-start items-center'>
                            <label className='w-[15%] font-bold'>سرفصل</label>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="product"
                                value={editSection}
                                onChange={handleEditSectionChange}
                                className="focus:border-sky-500 ">

                                {sections.map((section, index) => {
                                    return (
                                        <MenuItem value={parseInt(section.id)} key={index}><p>{section.title} - {section.product.title}</p></MenuItem>
                                    )
                                })}

                            </Select>
                        </div> : <></>
                }

                {
                    lectures.length > 0 ?
                        <div className='flex gap-4 justify-start items-center'>
                            <label for="editContent" className='w-[15%] font-bold'>متن</label>
                            <div className='w-[85%] px-4 py-2'>
                                <JoditEditor
                                    name="editContent"
                                    ref={editContentRef}
                                    value={content.length < 1 ? "khali" : lectures.find(object => object.id === lecture).content}
                                    onChange={async (e) => setContent(e)}
                                    tabIndex={1} // tabIndex of textarea
                                />
                            </div>
                        </div>
                        : <></>
                }

                {
                    lectures.length > 0 ?
                        <div className='flex gap-8'>
                            <Button variant="contained" color='success' className='bg-green-600' onClick={() => updateAPIData(lecture)}>
                                <p>
                                    ویرایش ویدئو
                                </p>
                            </Button>


                            <Button variant="contained" color='error' className='bg-red-600' onClick={() => deleteAPIData(lecture)}>
                                <p>
                                    حذف ویدئو
                                </p>
                            </Button>
                        </div>
                        : <></>
                }

            </div>
        </form>

    </div>
    )


}


Lectures.getLayout = function getLayout(page) {
    return (
        <AdminMenu>{page}</AdminMenu>
    )
}
