import React from 'react';
import { Skeleton, Typography } from '@mui/material'
import plant from '../../assets/img/wateringPlant.svg'

const SkeletonCard = () => {
    return (
        <div className="rounded-md text-green-dark grid grid-rows-2 shadow-md hover:shadow-xl transition-all">
            <Skeleton  sx={"#1f482e"} variant="rounded" width='100%' height='100%' >
                <div className='h-32 md:h-full rounded-t-md '>
                    <img src={plant} alt='Plant' className=' object-contain h-full w-full '></img>
                </div>
            </Skeleton>
            <div className='flex flex-col gap-1 p-2 md:col-span-1 rounded-b-md overflow-auto whitespace-normal'>
                <Typography variant="h3"><Skeleton sx={"#1f482e"} /></Typography>
                <Typography variant="p"><Skeleton sx={"#1f482e"} /></Typography>
            </div>
        </div>
    );
}

export default SkeletonCard;
