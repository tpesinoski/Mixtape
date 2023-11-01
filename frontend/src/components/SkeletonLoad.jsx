import React from 'react'
import { Skeleton } from '@mui/material'
import { Link } from 'react-router-dom'
import Swiper from 'swiper'
import { FreeMode } from 'swiper'
import { SwiperSlide } from 'swiper/react'
import SkeletonCard from './SkeletonCard'

const SkeletonLoad = () => {
  return (
    <div  className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col" >
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
            <Skeleton variant="text" sx={{ fontSize: '40px',width:"150px",background:"#48484852" }} />
            <Skeleton variant="text" sx={{ fontSize: '30px',width:"100px",background:"#48484852" }} />
        </div>
        <div className="mt-4 flex flex-col gap-3">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
        </div>
      </div>
      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
        </div>
        <div className='flex gap-3 mt-5'>
            <Skeleton variant="circular" sx={{background:"#48484852"}} width={125} height={125} />
            <Skeleton variant="circular" sx={{background:"#48484852"}} width={125} height={125} />
            <Skeleton variant="circular" sx={{background:"#48484852"}} width={125} height={125} />
        </div>
      </div>
    </div>
  )
}

export default SkeletonLoad