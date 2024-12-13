'use client';

import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'

interface HeadingProps {
    isHidden?: boolean;
}

const Heading = ({isHidden = false}:HeadingProps) => {
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
    <h1 className={`${isHidden ? "sr-only": ""}`}>book info {title} page</h1>
  )
}

export default Heading