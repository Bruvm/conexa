import { Box, Card, CardActionArea, CardContent, Grid, Skeleton } from '@mui/material'
import React from 'react'

export const SkeletonCard = ({ repeat }: { repeat: number }) => {
    return (
        <Grid container
            id="characters"
            sx={{
                height: '40vh',
                overflow: 'auto'
            }}
            spacing={2}
        >
            {Array.from({ length: repeat }).map((_, index) => (
                <Grid size={{ xs: 6, lg: 4 }} key={index}>
                    <Card>
                        <CardActionArea>
                            <Skeleton variant="rectangular" width={'100%'} height={200} animation="wave" />

                            <CardContent>
                                <Box sx={{ pt: 0.5 }}>
                                    <Skeleton />
                                </Box>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>

            ))}
        </Grid>
    )

}
