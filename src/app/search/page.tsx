"use client";
import Image from 'next/image';
import searchIcon from '@/public/assets/searchIcon.svg';
import smallLogo from '@/public/assets/epigramSmallLogo.svg';
import { useState, useEffect, useRef } from 'react';
import SearchHistory from './components/SearchHistory';
import SearchEpigram from './components/SearchEpigram';
import FloatingButtons from '@/src/components/FloatingButtons';
import { useRouter, useSearchParams } from 'next/navigation';

function SearchPage() {
  const router = useRouter();
  const [searchWord, setSearchWord] = useState('');
  const [currentSearchWord, setCurrentSearchWord] = useState('');
  const [searchWords, setSearchWords] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const searchHistoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleRouteChange = () => {
      const query = new URLSearchParams(window.location.search).get('query');
      if (query) {
        setCurrentSearchWord(query);
        setSearchWord(query); // input value도 업데이트
      } else {
        // 쿼리가 없을 때 전체 데이터를 보여주기 위한 로직 추가
        setCurrentSearchWord(''); // 전체 데이터 경우에 사용할 검색어 초기화
        setSearchWord(''); // input value도 초기화
      }
    };
  
    // 클라이언트에서만 실행되도록 체크
    if (typeof window !== 'undefined') {
      handleRouteChange();
      window.addEventListener('popstate', handleRouteChange);
    }
  
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('popstate', handleRouteChange);
      }
    };
  }, []);
  
  //tag 수정한 부분
  const params=useSearchParams();
  const tag=params.get('tag')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };

  const handleIsFocusedClose = () => {
    setIsFocused(false);
  }

  const saveToLocalStorage = (word: string) => {
    if (word.trim()) {
      let updatedSearchWords = searchWords.filter(w => w !== word); 
      updatedSearchWords.unshift(word); 

      if (updatedSearchWords.length > 8) {
        updatedSearchWords = updatedSearchWords.slice(0, 8);
      }

      localStorage.setItem('searchWords', JSON.stringify(updatedSearchWords));
      setSearchWords(updatedSearchWords);
      setIsFocused(false); // 검색 후 포커스를 잃도록 설정
    }
  };

  const handleSearch = (word: string) => { 
    if (!word.trim()) { // ""로 검색 했을 때(나중에 수정 하는 부분)
      alert('검색어를 입력해주세요.');
      return;
    }
    saveToLocalStorage(word);
    setCurrentSearchWord(word);
    setSearchWord(word); // 현재 검색어를 입력란에 반영
  
    // URL에 검색어를 쿼리 파라미터로 추가
    router.push(`/search?query=${encodeURIComponent(word)}`);
  };

  const removeSearchWord = (word: string) => {
    const updatedSearchWords = searchWords.filter(searchWord => searchWord !== word);
    localStorage.setItem('searchWords', JSON.stringify(updatedSearchWords));
    setSearchWords(updatedSearchWords);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(searchWord);
    }
  };

  const handleIconClick = () => {
    handleSearch(searchWord);
  };

  const clearSearchHistory = () => {
    setSearchWords([]);
    localStorage.removeItem('searchWords');
  };

  const handleClickOutside = (event: MouseEvent) => { //최근 검색어 탭 제어 기능
    if (
      searchHistoryRef.current &&
      !searchHistoryRef.current.contains(event.target as Node) &&
      !(event.target as HTMLElement).classList.contains('search-history-icon')
    ) {
      setIsFocused(false);
    }
  };

  const handleInputClick = () => { // input 클릭했을 때 최근 검색어 탭 토글 기능
    setIsFocused(true);
  };

  const handleSearchWordClick = (word: string) => { // 태그 클릭 시 검색 기능
    setSearchWord(word);
    handleSearch(word);
    setIsFocused(false); // 태그 클릭 후 포커스를 잃도록 설정
  };

  useEffect(() => { 
    const storageSearchWords = JSON.parse(localStorage.getItem('searchWords') || '[]');
    setSearchWords(storageSearchWords);
  }, []);

  useEffect(() => {
      //tag 수정한 부분
    if (tag) {
      setSearchWord(tag); // 'tag' 값을 검색어로 설정
      handleSearch(tag); // 'tag'로 검색을 실행
    }
    if (isFocused) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isFocused,tag]);


  return (
    <div className='flex justify-center'>
      <div className='flex flex-col md:w-[384px] md:px-0 xl:w-[640px]'>
        <div className='flex justify-center relative'>
          <div className='flex items-center mt-[8px] relative w-[312px] h-[52px] md:mt-[16px] md:w-[384px] md:h-[60px] xl:mt-[24px] xl:w-[640px] xl:h-[80px]'>
            <input
              className={`w-full border border-blue-600 rounded-full outline-none transition-shadow duration-300 placeholder-blue-300 h-[52px] pl-[52px] pr-[32px] md:h-[60px] md:text-[20px] xl:pr-[42px] xl:pl-[74px] xl:h-[80px] xl:text-[24px] ${isFocused ? 'rounded-none border-transparent shadow-custom-focus xl:shadow-custom-focus-xl' : 'hover:shadow-custom-hover'}`}
              type="text"
              value={searchWord}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              onClick={handleInputClick}
              placeholder="검색어를 입력해 주세요."
            />
            <a className='flex items-center' href='/search'>
              <Image className='absolute cursor-pointer left-[12px] md:left-[12px] xl:left-[16px] xl:w-[42px] xl:h-[42px]' priority src={smallLogo} alt='smallLogo' />
            </a>
            <Image
              className='w-[20px] h-[20px] cursor-pointer absolute right-[10px] bottom-[17px] md:bottom-[22px] xl:w-[36px] xl:h-[36px] xl:bottom-[23px]'
              src={searchIcon}
              alt='searchIcon'
              onClick={handleIconClick}
            />
          </div>
          {isFocused && (
            <div className='absolute top-full w-[312px] mt-[4px] bg-white rounded-b-lg shadow-lg md:left-0 md:w-[384px] md:px-0 xl:w-[640px]' ref={searchHistoryRef}>
              <SearchHistory searchWords={searchWords} handleIsFocusedClose={handleIsFocusedClose} onSearchWordClick={handleSearchWordClick} clearSearchHistory={clearSearchHistory} removeSearchWord={removeSearchWord} />
            </div>
          )}
        </div>
        <div>
          <SearchEpigram/>
        </div>
        <FloatingButtons />
      </div>
    </div>
  );
}

export default SearchPage;