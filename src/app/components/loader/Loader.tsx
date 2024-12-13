"use client";

import { Spinner } from '@nextui-org/spinner'
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import React from 'react'

const Loader = () => {

    const isFetching = useIsFetching();
    const isMutating = useIsMutating();
  return (
    (isFetching > 0 || isMutating > 0) && <div className='fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]'>
        <Spinner color='default' />
    </div>
  )
}

export default Loader