import React, { useState , useRef} from 'react';
import { FaPlay, FaPause } from "react-icons/fa";
import {Slider} from '@mui/material';
import ReactPlayer from 'react-player'


const Player = (props) => {

    return (
            <div className='flex justify-center items-center w-full'>
                <div className='flex justify-center items-center m-8 rounded-lg overflow-hidden'>

                    <ReactPlayer
                        url={props.url} 
                        controls
                        config={ {
                            file: {
                                attributes: {
                                    controlsList: "nodownload",
                                    onContextMenu: e => e.preventDefault()
                                }
                            }
                        } }
                        width='80vh'
                        height='40vh'
                        />

                </div>
            </div>
     ) 
  }
  
  export default Player