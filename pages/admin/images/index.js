import { Fab } from '@mui/material';
import AdminMenu from '../../../components/admin/AdminMenu'
import useSWR from 'swr'
import { useState } from "react";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import { util } from "../../../components/util";
import axios from 'axios';
import Link from 'next/link'
import { CopyToClipboard } from "react-copy-to-clipboard";

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Images() {

    const [pageIndex, setPageIndex] = useState(0);

    const deleteAPIData = (id) => {
        axios.delete(`${util.baseUrl}api/images/${id}`).then(() => {
            location.reload();
        });
    }





    const src = `/api/images?limit=20&&page=${pageIndex}`

    const { data, error } = useSWR(src, fetcher)

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>


    return (<div className='lg:px-8 py-8'>

        <div className='bg-background rounded-lg shadow-lg p-8 flex flex-col'>

            <table className="table-auto">

                <thead>
                    <tr>
                        <th>
                            <p className='flex justify-start'>
                                عنوان
                            </p>
                        </th>
                        <th>
                            <p className='flex justify-start'>
                                متن
                            </p>
                        </th>
                        <th>
                            <p className='flex justify-start'>
                                تصویر
                            </p>
                        </th>
                        <th>
                            <p className='flex justify-center'>
                                ویرایش
                            </p>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {data.data.map((image, index) => {
                        return (
                            <tr className='border-b-2 border-slate-200' key={index}>
                                <td className=' text-[10px] lg:text-[12px] xl:text-[15px]'>{image.title}</td>
                                <td className=' text-[10px] lg:text-[12px] xl:text-[15px]'>{image.description ? image.description.substring(0, 30) + "..." : "ثبت نشده"}</td>
                                <td>
                                    <div className='w-16 h-10 md:w-24 md:h-16 lg:w-32 lg:h-24 my-4 bg-slate-500 rounded-lg overflow-hidden'>
                                        <CopyToClipboard
                                            text={image.url}
                                            className="hover:cursor-copy h-full w-full"
                                            onCopy={() => alert("لینک کپی شد")}>
                                            <img className='h-full w-full' src={image.url.length > 0 ? image.url : util.baseUrl + "images/not-found.jfif"}></img>
                                        </CopyToClipboard>
                                    </div>
                                </td>
                                <td className='flex flex-col'>
                                    <br></br>
                                    <div className='flex justify-center items-center'>
                                        <Link href={util.baseUrl + "admin/images/" + image.id}>
                                            <a>
                                            <FiEdit className='cursor-pointer' size="25"></FiEdit>
                                            </a>
                                        </Link>
                                    </div>
                                    <br></br>
                                    <div className='flex justify-center items-center'>
                                        <FiTrash2 className='cursor-pointer' size="25" onClick={() => deleteAPIData(image.id)}></FiTrash2>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
                

            </table>


            <div className='flex mt-8 justify-center items-center'>
                {Array.from(Array(parseInt(data.total_page)), (e, i) => {
                    return <button key={i} onClick={() => setPageIndex(i)} className={data.page == i ? "px-4 py-2 inset-2 border border-slate-700" : "px-4 py-2 inset-2 border"}>
                        {i + 1}
                    </button>
                })}
            </div>


            
            <Fab color="success" variant="light" onClick={() => window.location.href = `${util.baseUrl}admin/images/new`} className="fixed">
                <FiPlus></FiPlus>
            </Fab>


        </div>

      

    




    </div>)

}


Images.getLayout = function getLayout(page) {
    return (
        <AdminMenu>{page}</AdminMenu>
    )
}
