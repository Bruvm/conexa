'use client'
import { Box, Divider, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import axios from 'axios'
import config from '@/app/config';
import { Character } from '@/interface/Character';
import { SkeletonList } from '../Skeletons/SkeletonList';

interface SharedEpisodeProps {
    characterOne: Character;
    characterTwo: Character;
}
export interface Episode {
    air_date: string;
    characters: string[];
    created: string
    episode: string
    id: number
    name: string
    url: string
}
export const SharedEpisodeList = ({ characterOne, characterTwo }: SharedEpisodeProps) => {
    const [sharedEpisodes, setSharedEpisodes] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        getSharedEpisodes();
    }, [characterOne, characterTwo]);

    const getSharedEpisodes = async () => {
        try {
            const response = await axios.get(`${config.api.API_URL}episode`);
            const allEpisodes = response.data.results;

            const episodesWithBothCharacters = allEpisodes.filter((episode: Episode) =>
                episode.characters.includes(characterOne.url) &&
                episode.characters.includes(characterTwo.url)
            );

            setSharedEpisodes(episodesWithBothCharacters);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <SkeletonList />;
    }
    return (
        <Box sx={{ height: '300px', overflowY: 'auto' }}>

            {

                sharedEpisodes.length > 0
                    ?
                    sharedEpisodes.map((episode: Episode) => (
                        <Box key={episode.id} sx={{ margin: '20px 10px 10px 10px' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                <LiveTvIcon style={{ fontSize: '20px', fill: 'primary.main', marginRight: '5px' }} />
                                <Typography variant='body2' sx={{ fontWeight: '600' }}>{episode.name} | {episode.episode}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <CalendarMonthIcon style={{ fontSize: '20px', fill: 'primary.main', marginRight: '5px' }} />
                                <Typography variant='body2' sx={{ fontWeight: '600' }}>{episode.air_date}</Typography>
                            </Box>

                            <Divider sx={{ marginTop: '10px' }} />
                        </Box>
                    ))
                    :
                    <Typography variant='body2'>
                        No episodes shared yet.
                    </Typography>


            }

        </Box>
    );
};

