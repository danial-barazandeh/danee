import Link from "next/link";
import  IconName  from "react-icons/ri";
import classnames  from "classnames";
import { GiSpaceship } from 'react-icons/gi';

    const GradiantFeatures = (props) => {

        const classStr = classnames(
            "w-60 h-60 rounded-lg flex flex-col justify-around items-start p-8 bg-gradient-to-r shadow-lg shrink-0 m-auto hover:scale-105 transition-all duration-300  hover:cursor-pointer",
            props.shadowColor,
            props.startColor,
            props.endColor,
          );
          
    return (
        <div className={classStr}>


            <p className=" text-6xl text-white">
                {props.children}
            </p>

            <h2 className="text-white">
                {props.title}
            </h2>

            <h2 className="text-white  text-xs">
                {props.content}
            </h2>

            
            <div className=" bg-white w-full h-[2px]"></div>

        </div>
    )
  }
  
  export default GradiantFeatures