import { useRouter } from 'next/router'
import React from 'react'
import PanelMenu from '../../components/panel/PanelMenu'
import { signIn, useSession, getSession } from "next-auth/react";
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { util } from '../../components/util';
import { Button } from '@mui/material';

const fetcher = (...args) => fetch(...args).then(res => res.json())

const Panel = () => {
    const { data: session, status } = useSession();

    const [user, setUser] = useState({});


    const firstName = useRef(null);
    const familyName = useRef(null);
    const phone = useRef(null);
    const email = useRef(null);


    const updateUser = () => {
        axios.put(`${util.baseUrl}api/users/${ses.user.id}`, {
            firstName: firstName.current.value,
            familyName: familyName.current.value,
            phone: phone.current.value,
            email: email.current.value,
        }, { headers: { 'Content-Type': 'application/json' } }
            // ).then((e) => console.log(e));
        ).then(() => window.location.href = `${util.baseUrl}/panel`);
    }


    useEffect(() => {

        const doooo = async () => {
            var ses = await getSession();

            await axios.get(`${util.baseUrl}api/users/${ses.user.id}`,
                {
                    headers: { 'Content-Type': 'application/json' }
                }).then(res => { setUser(res.data); })

        }

        doooo();


    }, []);



    return (<div className='m-8 bg-white shadow-sm rounded-lg h-[90vh] py-16 px-8'>
        <div className='flex flex-col gap-4'>

            <div className='flex gap-4 justify-start items-center'>
                <label htmlFor="firstName" className='label'>نام</label>
                <input type="text" className='panel-input' id="firstName" defaultValue={user.firstName} ref={firstName} name="firstName"></input>
            </div>

            <div className='flex gap-4 justify-start items-center'>
                <label htmlFor="familyName" className='label'>نام خانوادگی</label>
                <input type="text" className='panel-input' id="familyName" defaultValue={user.familyName} ref={familyName} name="familyName"></input>
            </div>

            <div className='flex gap-4 justify-start items-center'>
                <label htmlFor="phone" className='label'>شماره همراه</label>
                <input type="number" disabled className='panel-input' id="phone" defaultValue={user.phone} ref={phone} name="phone"></input>
            </div>

            <div className='flex gap-4 justify-start items-center'>
                <label htmlFor="email" className='label'>آدرس ایمیل</label>
                <input type="email" className='panel-input' id="email" defaultValue={user.email} ref={email} name="email"></input>
            </div>


            <Button variant="contained" color='success' className='w-min bg-primary hover:bg-secondary shadow-primary shadow-md hover:shadow-lg hover:shadow-secondary' onClick={updateUser}>
                <p>
                    ویرایش
                </p>
            </Button>

        </div>

    </div>)


}

export default Panel

Panel.getLayout = function getLayout(page) {
    return (
        <div>
            <PanelMenu>
                {page}
            </PanelMenu>
        </div>
    )
}