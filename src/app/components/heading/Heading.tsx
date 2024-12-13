'use client';

import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Heading = () => {
    const path = usePathname();
    const [title, setTitle] = useState<string>("")
    useEffect(()=> {
        if(path.startsWith("/books")) {
            const splitedPath = path.split("/");
            const pageName = Number.isNaN(Number(splitedPath[splitedPath.length-1])) ? splitedPath[splitedPath.length-1] : "detail";

            setTitle(pageName)
        }
    },[path])
    return (
    <h1>book info {title} page</h1>
  )
}

export default Heading