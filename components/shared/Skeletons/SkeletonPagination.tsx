import { Box, Skeleton } from '@mui/material'
import React from 'react'

export const SkeletonPagination = () => {
    return (
        <Box mt={'16px'}>
            <Skeleton variant="rectangular" width={'100%'} height={32} animation="wave" />
        </Box>
    )

}
