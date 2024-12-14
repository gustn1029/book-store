import EditClient from '@/components/clients/edit/EditClient';
import React, { use } from 'react'

const EditPage = ({ params }: { params: Promise<{ bookId: string }> }) => {
  const {bookId} = use(params);
  return (
    <>
      <EditClient id={bookId} />
    </>
  )
}

export default EditPage