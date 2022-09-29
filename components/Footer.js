import Link from "next/link";
import ReactReadMoreReadLess from "react-read-more-read-less";
import { util } from "../components/util";

const Footer = () => {
    return (
      <footer className="bg-slate-900">
        <div className="grid 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-col-3 md:grid-col-3 grid-col-3  sm:grid-col-2 justify-center items-start gap-x-48 gap-y-6 mx-6 py-6 ">


        
            <div className="flex flex-col justify-center items-center gap-2 ">
              <h5 className="text-lg font-bold">  درباره دانه </h5>
              <div className="text-xs font-thin text-justify">
                <ul className="flex flex-col items-start py-4">
                  <li className="text-white hover:text-slate-400">
                      <Link href='/'>خانه</Link>
                  </li>
                  <li className="text-white hover:text-slate-400">
                      <Link href={util.baseUrl+"about"}>درباره ما</Link>
                  </li>
                  <li className="text-white hover:text-slate-400">
                      <Link href={util.baseUrl+"dashboard"}>پنل کاربری</Link>
                  </li>
                </ul>
              </div>
            </div>


            <div className="flex flex-col justify-center items-center gap-2 ">
                <h5 className="text-lg font-bold">  محتوای دوره ها </h5>

                <div className="text-xs font-thin text-justify w-[80%] md:w-[50%] lg:w-[60%] xl:w-[100%]">
                  <ReactReadMoreReadLess
                  charLimit={200}
                  readMoreClassName=" text-slate-400"
                  readLessClassName=" text-slate-400"
                  readMoreText={"بیشتر بخوانید ▼"}
                  readLessText={"کمتر بخوانید ▲"}>
                  
                  دانه یک سرویس آنلاین یادگیری مهارت های مهندسی است.
                  ما در دانه سعی داریم تا به ارائه آموزش های کوتاه و کاربردی 
                  شما را برای رسیدن به یک موقعیت شغلی خوب یاری کنیم.
                
                  محتوای دوره های دانه مجموعه ای از ویدئو های فصل بندی شده
                  همراه با توضیحات است که پس از خرید برای همیشه در دسترس کاربر قرار میگیرد و به
                  صورت رایگان برزورسانی های لازم را دریافت می کند.
                
                  در فاز اول توسعه دانه مهارت های مربوط به علوم کامپیوتر
                  و برنامه نویسی موجود است که توسط دانیال برازنده، دانشجوی دکترای تخصصی کامپیوتر 
                  گرایش هوش مصنوعی با بیش از 5 سال سابقه کاری و 
                  تجربه در توسعه پروژه های بین‌المنلی تدریس می شود.
          
                  </ReactReadMoreReadLess>
                </div>

            </div>


            <div className="flex flex-col justify-center items-center gap-2 ">
              <h5 className="text-lg font-bold">  توضیحات </h5>
              <p className="text-xs font-thin text-justify"> تمامی حفوظ محفوظ هست </p>
            </div>
            
        </div>
      </footer>
    ) 
  }
  
  export default Footer 
 