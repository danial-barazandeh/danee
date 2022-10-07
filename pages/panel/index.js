import { useRouter } from 'next/router'
import React from 'react'
import PanelMenu from '../../components/panel/PanelMenu'
import { signIn, useSession, getSession } from "next-auth/react";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { util } from '../../components/util';

const fetcher = (...args) => fetch(...args).then(res => res.json())

const Panel = () => {
    const { data: session, status } = useSession();

    const [loaded, setLoaded] = useState(false);
    const [user, setUser] = useState(null);


    useEffect(() => {

        const doooo = async () => {
            var ses = await getSession();

            axios.get(`${util.baseUrl}api/users/${ses.user.id}`,
            {
                headers: { 'Content-Type': 'application/json' }
            }).then(res => { setUser(res.data.firstName); setLoaded(true); })
        }

        doooo();


    }, []);



    return (<div className='m-8 bg-white shadow-sm rounded-lg h-[90vh]'>

        Calculation: {user}

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