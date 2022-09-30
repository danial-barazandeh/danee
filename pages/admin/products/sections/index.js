import AdminMenu from '../../../../components/admin/AdminMenu'
import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import axios from 'axios';
import { util } from '../../../../components/util'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function Sections() {

    const titleRef = useRef(null);
    const editSectionTitleRef = useRef(null);

    const [product, setProduct] = React.useState(1);
    const [productEdit, setProductEdit] = React.useState(1);
    const [section, setSection] = React.useState(1);

    const handleChange = (event) => {
        setProduct(event.target.value);
    };

    const handleEditChange = (event) => {
        setProductEdit(event.target.value);
    };

    const handleSectionChange = (event) => {
        setSection(event.target.value);
    };


    const createSectionsAPIData = () => {
        axios.post(`${util.baseUrl}api/sections`, {
            title: titleRef.current.value,
        }, { headers: { 'Content-Type': 'application/json' } }
            // ).then((e) => console.log(e));
        ).then(() => window.location.href = `${util.baseUrl}/admin/sections`);
    }

    const updateSectionsAPIData = (id) => {
        axios.put(`${util.baseUrl}api/sections/${id}`, {
            title: editSectionTitleRef.current.value,
            productId: productEdit
        }, { headers: { 'Content-Type': 'application/json' } }
            // ).then((e) => console.log(e));
        ).then(() => window.location.href = `${util.baseUrl}/admin/lectures`);
    }

    const [products, setProducts] = useState([]);
    const [sections, setSections] = useState([]);

    useEffect(() => {
        axios.get(`${util.baseUrl}api/products`, { headers: { 'Content-Type': 'application/json' } }
        ).then((e) => setProducts(e.data.data));
    }, [products]);

    useEffect(() => {
        axios.get(`${util.baseUrl}api/sections`, { headers: { 'Content-Type': 'application/json' } }
        ).then((e) => setSections(e.data));
    }, [sections]);

    return (<div className='lg:px-8 py-8'>



        <form>
            <div className='bg-background rounded-lg shadow-lg p-8 flex flex-col gap-4'>

                <div className='flex gap-4 justify-start items-center'>
                    <label htmlFor="title" className='w-[15%] font-bold'>عنوان</label>
                    <input type="text" className='w-[85%] px-4 py-2 border-slate-400 focus:border-sky-500 outline-none border-2 rounded-lg' id="title" ref={titleRef} name="title"></input>
                </div>

                <div className='flex gap-4 justify-start items-center'>
                    <label htmlFor="product" className='w-[15%] font-bold'>محصول</label>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="product"
                        value={product}
                        onChange={handleChange}
                        className="focus:border-sky-500 ">

                        {products.map((product, index) => {
                            return (
                                <MenuItem value={parseInt(product.id)} key={index}><p>{product.title}</p></MenuItem>
                            )
                        })}


                    </Select>
                </div>

                <div>
                    <br></br>
                    <Button variant="contained" color='success' className='bg-green-600' onClick={createSectionsAPIData}>
                        <p>
                            ثبت سرفصل
                        </p>
                    </Button>
                    <br></br>
                </div>

            </div>

        </form>


        <form className='mt-8'>
            <div className='bg-background rounded-lg shadow-lg p-8 flex flex-col gap-4'>




                <div className='flex gap-4 justify-start items-center'>
                    <label htmlFor="product" className='w-[15%] font-bold'>سرفصل</label>
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

                {
                    sections.length > 0 ?
                        <div className='flex gap-4 justify-start items-center'>
                            <label htmlFor="title" className='w-[15%] font-bold'>عنوان</label>
                            <input type="text" defaultValue={sections.find(object => object.id === section).title} className='w-[85%] px-4 py-2 border-slate-400 focus:border-sky-500 outline-none border-2 rounded-lg' id="editSectionTitle" ref={editSectionTitleRef} name="editSectionTitle"></input>
                        </div>
                        : <></>
                }


                <div className='flex gap-4 justify-start items-center'>
                    <label htmlFor="product" className='w-[15%] font-bold'>محصول</label>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="product"
                        value={productEdit}
                        onChange={handleEditChange}
                        className="focus:border-sky-500 ">

                        {products.map((product, index) => {
                            return (
                                <MenuItem value={parseInt(product.id)} key={index}><p>{product.title}</p></MenuItem>
                            )
                        })}


                    </Select>
                </div>


                <div>
                    <br></br>
                    {
                        sections.length > 0 ?
                            <Button variant="contained" color='success' className='bg-green-600' onClick={()=>updateSectionsAPIData(sections.find(object => object.id === section).id)}>
                                <p>
                                    ویرایش سرفصل
                                </p>
                            </Button>
                            : <></>
                    }
                    <br></br>
                </div>


            </div>

        </form>




    </div>
    )


}


Sections.getLayout = function getLayout(page) {
    return (
        <AdminMenu>{page}</AdminMenu>
    )
}
