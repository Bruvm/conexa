import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '@/app/config';
import { Character } from '@/interface/Character';

interface ApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}
  
  export const useCharacterData = () => {
    const [charactersOne, setCharactersOne] = useState<Character[]>([]);
    const [charactersTwo, setCharactersTwo] = useState<Character[]>([]);
    const [selectedCharacterOne, setSelectedCharacterOne] = useState<Character | null>(null);
    const [selectedCharacterTwo, setSelectedCharacterTwo] = useState<Character | null>(null);

    const [loadingOne, setLoadingOne] = useState<boolean>(true);
    const [loadingTwo, setLoadingTwo] = useState<boolean>(true);

    const [currentPageOne, setCurrentPageOne] = useState<number>(1);
    const [currentPageTwo, setCurrentPageTwo] = useState<number>(1);

    const [totalPagesOne, setTotalPagesOne] = useState<number>(1);
    const [totalPagesTwo, setTotalPagesTwo] = useState<number>(1);

    const [currentPage, setCurrentPage] = useState<number>(1);

    const [searchOne, setSearchOne] = useState<string>('');
    const [searchTwo, setSearchTwo] = useState<string>('');
  
    useEffect(() => {
      getCharactersOne();
    }, [currentPageOne, searchOne]);
  
    useEffect(() => {
      getCharactersTwo();
    }, [currentPageTwo, searchTwo]);
  
    const getCharactersOne = async (): Promise<void> => {
      setLoadingOne(true);
      try {
        const response = await axios.get<ApiResponse>(
          `${config.api.API_URL}character?page=${currentPageOne}&name=${searchOne}`
        );
        setCharactersOne(response.data.results);
        setTotalPagesOne(response.data.info.pages);
      } catch (error) {
        setCharactersOne([]);
        setCurrentPageOne(1);
        console.error('Error fetching charactersOne:', error);
      } finally {
        setLoadingOne(false);
      }
      try {
        const response = await fetch(`api_url`);
        
      } catch (error) {
        console.error('Error fetching charactersOne:', error);
        setCharactersOne([]);
        setCurrentPageOne(1);
      } finally {
        setLoadingOne(false);
      }
    };

    const getCharactersTwo = async (): Promise<void> => {
      setLoadingTwo(true);
      try {
        const response = await axios.get<ApiResponse>(
          `${config.api.API_URL}character?page=${currentPageTwo}&name=${searchTwo}`
        );
        setCharactersTwo(response.data.results);
        setTotalPagesTwo(response.data.info.pages);
      } catch (error) {
        setCharactersTwo([]);
        console.error('Error fetching charactersTwo:', error);
      } finally {
        setLoadingTwo(false);
      }
    };
  
    const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
      setCurrentPage(page);
      setSelectedCharacterOne(null);
      setSelectedCharacterTwo(null);
    };
  
    return {
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
    handlePageChange,
    handleCharacterOneSelect: (character: Character | null) => setSelectedCharacterOne(character),
    handleCharacterTwoSelect: (character: Character | null) => setSelectedCharacterTwo(character),
    };
  };