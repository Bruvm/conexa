import { Skeleton } from '@mui/material'
import React from 'react'

export const SkeletonList = () => {
    return (
        <Skeleton variant="rectangular" width={'100%'} height={300} animation="wave" />
    )

}
