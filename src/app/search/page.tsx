'use client';

import { Suspense, useEffect, useRef, useState } from 'react';

import smallLogo from '@/public/assets/epigramSmallLogo.svg';
import searchIcon from '@/public/assets/searchIcon.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import FloatingButtons from '@/src/components/FloatingButtons';

import SearchEpigram from './components/SearchEpigram';
import SearchHistory from './components/SearchHistory';

function SearchPage() {
  const router = useRouter();
  const [searchWord, setSearchWord] = useState('');
  const [searchWords, setSearchWords] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const searchHistoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleRouteChange = () => {
      const query = new URLSearchParams(window.location.search).get('query');
      if (query) {
        setSearchWord(query); // input value도 업데이트
      } else {
        // 쿼리가 없을 때 전체 데이터를 보여주기 위한 로직 추가

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };

  const handleIsFocusedClose = () => {
    setIsFocused(false);
  };

  const saveToLocalStorage = (word: string) => {
    if (word.trim()) {
      let updatedSearchWords = searchWords.filter((w) => w !== word);
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
    if (!word.trim()) {
      // ""로 검색 했을 때(나중에 수정 하는 부분)
      alert('검색어를 입력해주세요.');
      return;
    }
    saveToLocalStorage(word);
    setSearchWord(word); // 현재 검색어를 입력란에 반영

    // URL에 검색어를 쿼리 파라미터로 추가
    router.push(`/search?query=${encodeURIComponent(word)}`);
  };

  const removeSearchWord = (word: string) => {
    const updatedSearchWords = searchWords.filter(
      (searchWord) => searchWord !== word,
    );
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

  const handleClickOutside = (event: MouseEvent) => {
    //최근 검색어 탭 제어 기능
    if (
      searchHistoryRef.current &&
      !searchHistoryRef.current.contains(event.target as Node) &&
      !(event.target as HTMLElement).classList.contains('search-history-icon')
    ) {
      setIsFocused(false);
    }
  };

  const handleInputClick = () => {
    // input 클릭했을 때 최근 검색어 탭 토글 기능
    setIsFocused(true);
  };

  const handleSearchWordClick = (word: string) => {
    // 태그 클릭 시 검색 기능
    setSearchWord(word);
    handleSearch(word);
    setIsFocused(false); // 태그 클릭 후 포커스를 잃도록 설정
  };

  useEffect(() => {
    const storageSearchWords = JSON.parse(
      localStorage.getItem('searchWords') || '[]',
    );
    setSearchWords(storageSearchWords);
  }, []);

  useEffect(() => {
    if (isFocused) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isFocused]);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col md:w-[384px] md:px-0 xl:w-[640px]">
        <div className="relative flex justify-center">
          <div className="relative mt-[8px] flex h-[52px] w-[312px] items-center md:mt-[16px] md:h-[60px] md:w-[384px] xl:mt-[24px] xl:h-[80px] xl:w-[640px]">
            <input
              className={`h-[52px] w-full rounded-full border border-blue-600 pl-[52px] pr-[32px] placeholder-blue-300 outline-none transition-shadow duration-300 md:h-[60px] md:text-[20px] xl:h-[80px] xl:pl-[74px] xl:pr-[42px] xl:text-[24px] ${isFocused ? 'rounded-none border-transparent shadow-custom-focus xl:shadow-custom-focus-xl' : 'hover:shadow-custom-hover'}`}
              type="text"
              value={searchWord}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              onClick={handleInputClick}
              placeholder="검색어를 입력해 주세요."
            />
            <a className="flex items-center" href="/search">
              <Image
                className="absolute left-[12px] cursor-pointer md:left-[12px] xl:left-[16px] xl:h-[42px] xl:w-[42px]"
                priority
                src={smallLogo}
                alt="smallLogo"
              />
            </a>
            <Image
              className="absolute bottom-[17px] right-[10px] h-[20px] w-[20px] cursor-pointer md:bottom-[22px] xl:bottom-[23px] xl:h-[36px] xl:w-[36px]"
              src={searchIcon}
              alt="searchIcon"
              onClick={handleIconClick}
            />
          </div>
          {isFocused && (
            <div
              className="absolute top-full mt-[4px] w-[312px] rounded-b-lg bg-white shadow-lg md:left-0 md:w-[384px] md:px-0 xl:w-[640px]"
              ref={searchHistoryRef}
            >
              <SearchHistory
                searchWords={searchWords}
                handleIsFocusedClose={handleIsFocusedClose}
                onSearchWordClick={handleSearchWordClick}
                clearSearchHistory={clearSearchHistory}
                removeSearchWord={removeSearchWord}
              />
            </div>
          )}
        </div>
        <Suspense>
          <SearchEpigram />
        </Suspense>
        <FloatingButtons />
      </div>
    </div>
  );
}

export default SearchPage;
