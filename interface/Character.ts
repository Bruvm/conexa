export type CharacterStatus = 'Alive' | 'Dead' | 'unknown';

export interface Character {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string
  }
  location: {
    name: string;
    url: string
  }
  image: string;
  episode: string[];
  url: string;
  created: string;
} 
