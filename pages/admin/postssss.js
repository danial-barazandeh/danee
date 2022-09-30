import Head from 'next/head'
import AdminMenu from '../../components/admin/AdminMenu'
import useSWR from 'swr'
import { useState } from "react";
import { FiEdit } from "react-icons/fi";

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Posts() {



    const [pageIndex, setPageIndex] = useState(0);
    const src = `/api/posts?limit=3&&page=${pageIndex}`

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
                    {data.data.map((post, index) => {
                        return (
                            <tr className='border-b-2 border-slate-200' key={index}  id={index}>
                                <td>{post.title}</td>
                                <td>{post.content ? post.content.substring(0, 30) + "..." : "ثبت نشده"}</td>
                                <td>
                                    <div className=' w-20 h-15 rounded-lg overflow-hidden'>
                                        <img src={post.image.length > 0 ? post.image : 'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg'}></img>
                                    </div>
                                </td>
                                <td>
                                    <div className='flex justify-center items-center'>
                                        <FiEdit></FiEdit>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>



            <div className='flex mt-8 justify-center items-center'>
                {Array.from(Array(parseInt(data.total_page)), (e, i) => {
                    return <button onClick={() => setPageIndex(i)} className={data.page == i ? "px-4 py-2 inset-2 border border-slate-700" : "px-4 py-2 inset-2 border"}>
                        {i + 1}
                    </button>
                })}
            </div>

        </div>

    </div>)

}


Posts.getLayout = function getLayout(page) {
    return (
        <AdminMenu>{page}</AdminMenu>
    )
}
