import AdminMenu from '../../../components/admin/AdminMenu'
import { useRouter } from 'next/router'
import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone'
import { util } from '../../../components/util'
import * as FormData from 'form-data'
import Image from 'next/image';


const fetcher = (...args) => fetch(...args).then(res => res.json())




export default function NewImage() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const { acceptedFiles, getRootProps, getInputProps, isDragActive } =  useDropzone();
    const [image, setImage] = useState(null);
    const [createObjectURL, setCreateObjectURL] = useState(null);

   const body = new FormData();

      

      const uploadToClient = (event) => {
        if (event.target.files && event.target.files[0]) {
          const i = event.target.files[0];
          setImage(i);
          setCreateObjectURL(URL.createObjectURL(i));
        }
      };


    const createAPIData = async (event) => {
        const body = new FormData();
        body.append("file", image);
        body.append("title", title);
        body.append("description", description);
        const response = await fetch("/api/images", {
          method: "POST",
          body
        }).then(()=>window.location.href =`${util.baseUrl}/admin/images`);
      };

    // const files = acceptedFiles.map(file => (
    //     <li key={file.path}>
    //         {file.path} - {file.size} بایت
    //     </li>
    // ));


    return (<div className='lg:px-8 py-8'>
        <form>
            <div className='bg-background rounded-lg shadow-lg p-8 flex flex-col gap-4'>

                <div className='flex gap-4 justify-start items-center'>
                    <label className='w-[15%] font-bold'>عنوان</label>
                    <input type="text" onChange={(e) => setTitle(e.target.value)} className='w-[85%] px-4 py-2 border-slate-400 focus:border-sky-500 outline-none border-2 rounded-lg' id="title" name="title"></input>
                </div>

                <div className='flex gap-4 justify-start items-center'>
                    <label className='w-[15%] font-bold'>متن</label>
                    <input type="text" onChange={(e) => setDescription(e.target.value)} className='w-[85%] px-4 py-2 border-slate-400 focus:border-sky-500 outline-none border-2 rounded-lg' id="title" name="title"></input>
                </div>

                <div className='flex gap-4 justify-start items-center'>
                    <label className='w-[15%] font-bold'>تصویر</label>
                    <input type="file" name="myImage" onChange={uploadToClient} />

                    {/* <div {...getRootProps()} className=" h-[150px] w-[150px] rounded-lg border-2 border-slate-300 bg-slate-200 justify-end items-end">
                        <input {...getInputProps()} type="file" name='myImage' onChange={uploadToClient}/>
                        {
                            isDragActive ?
                                <p className='text-sm text-center text-slate-400 mt-[70%]'>تصویر را اینجا رها کنید </p> :
                                <p className='text-sm text-center text-slate-400 mt-[70%]'>با کلیک یا درگ تصاویر را اینجا بگذارید</p>
                        }
                    </div> */}
                </div>

                {/* <aside>
                    <h4>فایل:</h4>
                    <ul>{files}</ul>
                </aside> */}

                <br></br>

                <Image src={createObjectURL} width={250} height={150} className="rounded-lg overflow-hidden" />


                <div className='flex gap-4 justify-start items-center'>
                    <button className='bg-primary text-white py-2 px-4 rounded-lg font-bold' type="button" onClick={createAPIData}>ثبت</button>
                </div>
            </div>
        </form>



    </div>
    )


}


NewImage.getLayout = function getLayout(page) {
    return (
        <AdminMenu>{page}</AdminMenu>
    )
}
