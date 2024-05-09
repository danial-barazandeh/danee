import AdminMenu from '../../../components/admin/AdminMenu'
import { useRouter } from 'next/router'
import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone'
import { util } from '../../../components/util'
import * as FormData from 'form-data'
import Image from 'next/image';


const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function NewImage() {
        return(<div></div>);
}

