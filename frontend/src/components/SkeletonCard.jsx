import React from 'react'
import { Skeleton } from '@mui/material'

const SkeletonCard = () => {
  return (
    <div className="w-[510px] flex flex-row items-center bg-[#48484852] py-4 p-4 rounded-lg 
    cursor-pointer mb-2">
      <div className="flex-1 flex flex-row justify-between items-center">
        <Skeleton variant="rounded" width={80} height={80} />
        <div className="flex-1 flex flex-col justify-center mx-3">
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
        </div>
      </div>
      <Skeleton variant="circular" width={40} height={40} />
    </div>
  )
}

export default SkeletonCard