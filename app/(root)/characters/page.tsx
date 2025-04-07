'use client';

import React from 'react';
import { Card, CardContent, Grid, Pagination, Typography } from '@mui/material';
import { useCharacterData } from '@/hooks/useCharacterData';
import { CharacterList } from '../../../components/shared/CharacterList/CharacterList';
import SearchComponent from '@/components/shared/SearchComponent/SearchComponent';
import { SharedEpisodeList } from '@/components/shared/Episodes/SharedEpisodesList';
import { EpisodeList } from '@/components/shared/Episodes/EpisodeList';
import { SkeletonCard } from '@/components/shared/Skeletons/SkeletonCard';
import { SkeletonPagination } from '@/components/shared/Skeletons/SkeletonPagination';



const Characters: React.FC = () => {
  const {
    charactersOne,
    charactersTwo,
    selectedCharacterOne,
    selectedCharacterTwo,
    loadingOne,
    loadingTwo,
    currentPageOne,
    currentPageTwo,
    totalPagesOne,
    totalPagesTwo,
    searchOne,
    searchTwo,
    setSearchOne,
    setSearchTwo,
    setCurrentPageOne,
    setCurrentPageTwo,
    handleCharacterOneSelect,
    handleCharacterTwoSelect
  } = useCharacterData();
  return (
    <Grid container
      sx={{
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <Grid size={10}>
        <Grid container
          sx={{
            justifyContent: "space-around",
            alignItems: "center",
          }}
          spacing={4}
          my={6}
        >
          <Grid size={{ xs: 12, md: 6 }}>
            <Card variant="outlined"
            >
              <CardContent>
                <Typography variant="h6" sx={{ marginBottom: '20px', fontWeight: 'bold' }} color={'primary.main'}>
                  Select a character #1
                </Typography>
                <SearchComponent label={'Search character #1'} value={searchOne} setValue={setSearchOne} resetPage={() => setCurrentPageOne(1)} disabled={loadingOne} />
                {loadingOne ?
                  <>
                    <SkeletonCard repeat={6} />
                    <SkeletonPagination />
                  </>
                  : <>
                    <CharacterList
                      characters={charactersOne}
                      selectedCharacter={selectedCharacterOne}
                      onSelectCharacter={handleCharacterOneSelect}
                    />
                    <Pagination
                      count={totalPagesOne}
                      page={currentPageOne}
                      onChange={(_, value: number) => setCurrentPageOne(value)}
                      sx={{ marginTop: 2, display: 'flex', justifyContent: 'center' }}
                    />
                  </>
                }
              </CardContent>
            </Card>
          </Grid>


          <Grid size={{ xs: 12, md: 6 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" sx={{ marginBottom: '20px', fontWeight: 'bold'  }} color={'primary.main'}>
                  Select a character #2
                </Typography>
                <SearchComponent label={'Search character #2'} value={searchTwo} setValue={setSearchTwo} resetPage={() => setCurrentPageTwo(1)} disabled={loadingTwo}/>
                {loadingTwo ?
                  <>
                    <SkeletonCard repeat={6} />
                    <SkeletonPagination />
                  </>
                  :
                  <>
                    <CharacterList
                      characters={charactersTwo}
                      selectedCharacter={selectedCharacterTwo}
                      onSelectCharacter={handleCharacterTwoSelect}
                    />
                    <Pagination
                      count={totalPagesTwo}
                      page={currentPageTwo}
                      onChange={(_, value: number) => setCurrentPageTwo(value)}
                      sx={{ marginTop: 2, display: 'flex', justifyContent: 'center' }}
                    />
                  </>
                }
              </CardContent>
            </Card>
          </Grid>

          <Grid size={12}>
            <Card variant="outlined"
            >
              <CardContent>
                {selectedCharacterOne && selectedCharacterTwo ?
                  <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 4 }} >
                      <Typography variant='h6' color={'primary.main'} sx={{ paddingBottom: '20px', fontWeight: 'bold' }}> {selectedCharacterOne && selectedCharacterOne.name} - Episodes</Typography>
                      {selectedCharacterOne && selectedCharacterTwo && <EpisodeList character={selectedCharacterOne} />}
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                      <Typography variant='h6' color={'primary.main'} sx={{ paddingBottom: '20px', fontWeight: 'bold' }}>Shared Episodes</Typography>
                      {selectedCharacterOne && selectedCharacterTwo && (
                        <SharedEpisodeList
                          characterOne={selectedCharacterOne}
                          characterTwo={selectedCharacterTwo}
                        />
                      )}
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                      <Typography variant='h6' color={'primary.main'} sx={{ paddingBottom: '20px', fontWeight: 'bold' }}>{selectedCharacterTwo && selectedCharacterTwo.name} - Episodes</Typography>
                      {selectedCharacterTwo && selectedCharacterOne && <EpisodeList character={selectedCharacterTwo} />}
                    </Grid>
                  </Grid>
                  : <Typography variant="h6" color={'primary.main'} sx={{ fontWeight: 'bold' }}>
                    Click on your favorite character to learn more about them.
                  </Typography>
                }

              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid >
  );
};

export default Characters;
