
import { FiHome, FiUsers, FiImage, FiDollarSign, FiFileText, FiShoppingBag, FiVideo, FiUser } from "react-icons/Fi";
import { BiCategory, } from "react-icons/Bi";
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/router'
import Link from "next/link";
import { util } from '../util'

const PanelMenu = ({ children }) => {
    const router = useRouter();
    return (
        
        <SessionProvider session={children.session}>
        <div className="min-h-screen flex bg-slate-300">
            <div className="bg-white h-[90vh] md:w-min flex flex-col gap-4 items-center m-8 ml-0 p-4 shadow-sm rounded-lg">

                <br></br>

                <div>
                    <Link href={util.baseUrl + "panel"}>
                            <FiUser className={(router.pathname == "/panel" ? "text-blue-500 " : "text-neutral-500 ") + " text-2xl hover:scale-125 transition-all duration-300 ease-linear hover:cursor-pointer"}></FiUser>
                    </Link>
                </div>


                <div>
                    <Link href={util.baseUrl + "checkout"}>
                            <FiDollarSign className={(router.pathname == "/checkout" ? "text-blue-500 " : "text-neutral-500 ") + " text-2xl hover:scale-125 transition-all duration-300 ease-linear hover:cursor-pointer"}></FiDollarSign>
                    </Link>
                </div>



            </div>
            <div className="bg-slate-300 w-full">
                <main >
                    {children}
                </main>
            </div>
        </div>
        </SessionProvider>
    )
}

export default PanelMenu