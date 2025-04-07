import { renderHook, act, waitFor } from '@testing-library/react';
import axios from 'axios';
import { useCharacterData } from '@/hooks/useCharacterData';
import { mockCharacters } from '../components/CharacterList/CharacterList.test';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;


const mockApiResponse = {
  data: {
    info: {
      count: 2,
      pages: 1,
      next: null,
      prev: null,
    },
    results: mockCharacters,
  },
};

describe('hook useCharacterData test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('should handle errors when getting characters', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Error en charactersOne'));
    mockedAxios.get.mockRejectedValueOnce(new Error('Error en charactersTwo'));
  
    const { result } = renderHook(() => useCharacterData());
  
    await waitFor(() => {
      expect(result.current.loadingOne).toBe(false);
      expect(result.current.loadingTwo).toBe(false);
    });
  
    expect(result.current.charactersOne).toEqual([]);
    expect(result.current.charactersTwo).toEqual([]);
  });
  it('should change the selected character', () => {
    const { result } = renderHook(() => useCharacterData());

    const newCharacter = mockCharacters[0];

    act(() => {
      result.current.handleCharacterOneSelect(newCharacter);
    });

    expect(result.current.selectedCharacterOne).toEqual(newCharacter);
  });

  it('should change the search and the page', () => {
    const { result } = renderHook(() => useCharacterData());

    act(() => {
      result.current.setSearchOne('rick');
      result.current.setCurrentPageOne(2);
    });

    expect(result.current.searchOne).toBe('rick');
    expect(result.current.currentPageOne).toBe(2);
  });
});
