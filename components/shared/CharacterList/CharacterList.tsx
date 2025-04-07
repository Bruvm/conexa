'use client';
import { Character } from '@/interface/Character';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Face5Icon from '@mui/icons-material/Face5';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';


interface CharacterListProps {
  characters: Character[];
  selectedCharacter: Character | null;
  onSelectCharacter: (character: Character | null) => void;
}

export const CharacterList = ({
  characters,
  selectedCharacter,
  onSelectCharacter,
}: CharacterListProps) => {
  const handleClick = (character: Character) => {
    if (selectedCharacter?.id === character.id) {
      onSelectCharacter(null);
    } else {
      onSelectCharacter(character);
    }
  };

  return (
    <Grid container
      id="characters"
      sx={{
        height: '40vh',
        overflow: 'auto'
      }}
      spacing={2}
    >
      {characters.map((character) => (
        <Grid key={character.id} size={{ xs: 6, lg: 4 }}>
          <Card
            onClick={() => handleClick(character)}
            sx={{
              cursor: 'pointer',
              backgroundColor:
                selectedCharacter?.id === character.id ? '#daeb95' : '#353535',
              color:
                selectedCharacter?.id === character.id ? '#353535' : '#FFFFFF',
            }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="150"
                image={character.image}
                alt={character.name}
              />

              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant='body1' sx={{ fontWeight: 600, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    {character.name}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {
                    character.status === 'Alive' ?
                    <FavoriteIcon style={{ fontSize: '15px', fill: 'green', marginRight: '5px' }}/>
                    :
                    character.status === 'Dead' ?
                    <HeartBrokenIcon style={{ fontSize: '15px', fill: 'red', marginRight: '5px' }} />
                    :
                    <QuestionMarkIcon style={{ fontSize: '15px', fill: 'gray', marginRight: '5px' }}/>
                  }
                  
                  <Typography>
                    {character.status}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Face5Icon style={{ fontSize: '15px', fill: '#43a047',  marginRight: '5px'}} />
                  <Typography>
                    {character.species}
                  </Typography>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
