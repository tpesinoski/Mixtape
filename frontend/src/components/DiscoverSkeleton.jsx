import React from 'react'
import { Skeleton } from '@mui/material'

const DiscoverSkeleton = () => {
  return (
    <div className="flex flex-col px-6 ">
            <div className="w-full flex justify-between items-center sm:flex-row 
            flex-col mt-4 mb-10">
                <Skeleton variant="text" sx={{ fontSize: '40px',width:"150px",background:"#48484852" }} />
                <Skeleton variant="text" sx={{ fontSize: '40px',width:"150px",background:"#48484852" }} />
            </div>
            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
            {
                [1,2,3,4,5,6,7,8,9,10,11,12].map(()=>{
                    return(
                        
                <div className="flex flex-col w-[250px] p-4 bg-white/5
                bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
                <div className="relative w-full h-56 group">
                    <div className={`absolute inset-0 justify-center items-center bg-[#242424] bg-opacity-80
                    group-hover:flex`}>
                    </div>
                    <Skeleton variant="rounded" width={215} height={240} />
                </div>
                <div className="mt-4 flex flex-col">
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                </div>
            </div>
            
                    )
                })
            }
            </div>
     </div>
  )
}

export default DiscoverSkeleton