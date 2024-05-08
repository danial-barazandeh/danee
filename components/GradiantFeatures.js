import Link from "next/link";
import IconName from "react-icons/ri";
import classnames from "classnames";
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

            <dl>
                <i className=" text-6xl text-white w-full flex justify-center items-center text-center">
                    {props.children}
                </i>

                <div className="h-2"></div>

                <dt className="text-white text-lg flex justify-center items-center text-center">
                    {props.title}
                </dt>

                <div className="h-2"></div>

                <dd className="text-white  text-xs flex justify-center items-center text-center">
                    {props.content}
                </dd>

            </dl>

            <div className=" bg-white w-full h-[2px]"></div>

        </div>
    )
}

export default GradiantFeatures