'use client'
import { Box, Divider, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Character } from '@/interface/Character';
import { Episode } from './SharedEpisodesList';
import { SkeletonList } from '../Skeletons/SkeletonList';
import config from '@/app/config';
import axios from 'axios';

interface EpisodeListProps {
    character: Character;
  }
export const EpisodeList = ({ character } : EpisodeListProps) => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const episodeIds = character.episode
      .map((url: string) => {
        const match = url.match(/\/(\d+)$/);
        return match ? parseInt(match[1]) : null;
      })
      .filter((id): id is number => id !== null);

    if (episodeIds.length === 0) {
      setEpisodes([]);
      return;
    } 
    getEpisodes(episodeIds)
  }, [character]);

  const getEpisodes = async (episodeIds: number[]) => {
    setLoading(true);
    try {
        const response = await axios.get(`${config.api.API_URL}/episode/${episodeIds.join(',')}`);
        const data = response.data;
        const formattedData = Array.isArray(data) ? data : [data];
        setEpisodes(formattedData);
      } catch (error) {
        console.error('Error fetching episodes:', error);
        setEpisodes([]);
      } finally {
        setLoading(false);
      }
  }

  if (loading) {
    return <SkeletonList />;
  }

  return (
        <Box sx={{ height: '300px', overflowY: 'auto' }}>
        {episodes.length > 0 ? (
          episodes.map((episode) => (
            <Box key={episode.id} sx={{ margin: '20px 10px 10px 10px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                <LiveTvIcon sx={{ fontSize: '20px', color: 'primary.main', marginRight: '5px' }} />
                <Typography variant='body2' sx={{ fontWeight: '600' }}>
                  {episode.name} | {episode.episode}
                </Typography>
              </Box>
  
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CalendarMonthIcon sx={{ fontSize: '20px', color: 'primary.main', marginRight: '5px' }} />
                <Typography variant='body2' sx={{ fontWeight: '600' }}>
                  {episode.air_date}
                </Typography>
              </Box>
  
              <Divider sx={{ marginTop: '10px' }} />
            </Box>
          ))
        ) : (
          <Typography variant='body2'>This character has no episodes</Typography>
        )}
      </Box>
  );
};
