import AdminMenu from '../../../components/admin/AdminMenu'
import useSWR from 'swr'
import { useState } from "react";
import { FiEdit, FiPlus } from "react-icons/fi";
import { util } from '../../../components/util'
import Link from 'next/link'
import { Fab } from '@mui/material';
import Switch from '@mui/material/Switch';
import axios from 'axios';

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Products() {


    const [pageIndex, setPageIndex] = useState(0);
    const src = `/api/products?limit=20&&page=${pageIndex}`


    const updatePublishedData = (id, published) => {
        axios.patch(`${util.baseUrl}api/products/${id}`, {
            published: published,
            // }).then(() => window.location.href = `${util.baseUrl}/admin/posts`);
        }).then((e) => console.log(e));
    }


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
                                مدیریت
                            </p>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {data.data.map((post, index) => {
                        return (
                            <tr className='border-b-2 border-slate-200' id={index} key={index}>
                                <td className=' text-[10px] lg:text-[12px] xl:text-[15px] '>{post.title}</td>
                                <td className=' text-[10px] lg:text-[12px] xl:text-[15px]'>{post.content ? post.content.substring(0, 30) + "..." : "ثبت نشده"}</td>
                                <td>
                                    <div className='w-16 h-10 md:w-24 md:h-16 lg:w-32 lg:h-24 rounded-lg overflow-hidden'>
                                        <img src={post.image.url.length > 1 ? post.image.url : `${util.baseUrl}images/not-found.jfif`} className="w-full h-full"></img>
                                    </div>
                                </td>
                                <td>
                                    <div className='flex flex-col justify-center items-center'>
                                        <Link href={util.baseUrl + "admin/products/" + post.id}>
                                            <a>
                                                <FiEdit className='hover:cursor-pointer'></FiEdit>
                                            </a>
                                        </Link>
                                        <br></br>
                                        <Switch label="انتشار" value={post.published} onChange={(e) => updatePublishedData(post.id, e.target.checked)} color="secondary" />
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

            <Fab color="success" variant="light" onClick={() => window.location.href = `${util.baseUrl}admin/posts/new`} className="fixed">
                <FiPlus></FiPlus>
            </Fab>

        </div>

    </div>)

}


Products.getLayout = function getLayout(page) {
    return (
        <AdminMenu>{page}</AdminMenu>
    )
}
