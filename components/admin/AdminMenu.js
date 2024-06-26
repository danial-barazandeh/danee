import { useRouter } from 'next/router'
import Link from "next/link";
import { util } from '../util'

import {FiHome, FiShoppingBag, FiVideo, FiFileText, FiUsers, FiImage} from "react-icons/fi";
import {FaDollarSign} from "react-icons/fa6"
import {BiCategory} from "react-icons/bi";

const AdminMenu = ({ children }) => {
  const router = useRouter();
  return (
    <div className="min-h-screen flex">
      <div className="bg-slate-900 md:w-min flex flex-col gap-4 items-center ">
        <br></br>
        <div>
          <div className={router.pathname == "/admin" ? "border-r-2 border-white p-2" : "border-r-2 p-2 border-transparent"}>
            <Link href={util.baseUrl + "admin"}>
              <a>
                <FiHome className=" text-2xl text-white hover:scale-125 transition-all duration-300 ease-linear hover:cursor-pointer"/>
              </a>
            </Link>
          </div>
        </div>


        <div>

          <div className={router.pathname == "/admin/products" ? "border-r-2 border-white p-2" : "border-r-2 p-2 border-transparent"}>
            <Link href={util.baseUrl + "admin/products"}>
              <a>
                <FiShoppingBag className=" text-2xl text-white hover:scale-125 transition-all duration-300 ease-linear hover:cursor-pointer"/>
              </a>
            </Link>
          </div>

          {router.pathname.includes('/admin/products') ? <div className={router.pathname == "/admin/products/sections" ? "border-r-2 border-white p-2" : "border-r-2 p-2 border-transparent"}>
            <Link href={util.baseUrl + "admin/products/sections"}>
              <a>
                <BiCategory className=" text-lg text-white hover:scale-125 transition-all duration-300 ease-linear hover:cursor-pointer mt-4"/>
              </a>
            </Link>
          </div> : <></>}

          {router.pathname.includes('/admin/products') ? <div className={router.pathname == "/admin/products/lectures" ? "border-r-2 border-white p-2" : "border-r-2 p-2 border-transparent"}>
            <Link href={util.baseUrl + "admin/products/lectures"}>
              <a>
                <FiVideo className=" text-lg text-white hover:scale-125 transition-all duration-300 ease-linear hover:cursor-pointer mt-4"/>
              </a>
            </Link>
          </div> : <></>}

        </div>

        <div>
          <div className={router.pathname == "/admin/posts" ? "border-r-2 border-white p-2" : "border-r-2 p-2 border-transparent"}>
            <Link href={util.baseUrl + "admin/posts"}>
              <a>
                <FiFileText className=" text-2xl text-white hover:scale-125 transition-all duration-300 ease-linear hover:cursor-pointer"/>
              </a>
            </Link>
          </div>
        </div>

        <div>
          <div className={router.pathname == "/333" ? "border-r-2 border-white p-2" : "border-r-2 p-2 border-transparent"}>
            <FiUsers className=" text-2xl text-white hover:scale-125 transition-all duration-300 ease-linear hover:cursor-pointer"/>
          </div>
        </div>

        <div>
          <div className={router.pathname == "/admin/images" ? "border-r-2 border-white p-2" : "border-r-2 p-2 border-transparent"}>
            <Link href={util.baseUrl + "admin/images"}>
              <a>
                <FiImage className=" text-2xl text-white hover:scale-125 transition-all duration-300 ease-linear hover:cursor-pointer"/>
              </a>
            </Link>
          </div>
        </div>

        <div>
          <div className={router.pathname == "/444" ? "border-r-2 border-white p-2" : "border-r-2 p-2 border-transparent"}>
            <FaDollarSign className=" text-2xl text-white hover:scale-125 transition-all duration-300 ease-linear hover:cursor-pointer"/>
          </div>
        </div>

      </div>
      <div className="bg-slate-300 w-full">
        <main >
          {children}
        </main>
      </div>
    </div>
  )
}

export default AdminMenu