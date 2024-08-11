import React from 'react';
import xIcon from '@/public/assets/ic_close.svg';
import searchIcon from '@/public/assets/searchIcon.svg';
import Image from 'next/image';

interface SearchHistoryProps {
  searchWords: string[];
  clearSearchHistory: () => void;
  removeSearchWord: (word: string) => void;
  onSearchWordClick: (word: string) => void;
  handleIsFocusedClose: () => void;
}

export const SearchIcon = ({ color = '#ABB8CE', className = '' }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M22.3333 35.6667C29.6971 35.6667 35.6667 29.6971 35.6667 22.3333C35.6667 14.9695 29.6971 9 22.3333 9C14.9695 9 9 14.9695 9 22.3333C9 29.6971 14.9695 35.6667 22.3333 35.6667Z"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M39 39L31.75 31.75"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SearchHistory: React.FC<SearchHistoryProps> = ({ searchWords, clearSearchHistory, removeSearchWord, onSearchWordClick, handleIsFocusedClose }) => {
  
  const handleClearSearchHistory = () => {
    if (window.confirm("최근검색어를 모두 삭제하시겠습니까?")) {
      clearSearchHistory();
    }
  };

  return (
    <div className='flex flex-col w-[312px] gap-[4px] mt-[4px] md:w-[384px] md:mt-[8px] md:gap-[8px] xl:w-[640px] xl:mt-[12px] xl:gap-[16px]'>
      <div className={`flex items-center px-[8px] md:px-[12px] xl:px-[16px] ${searchWords.length > 0 ? 'justify-between' : 'justify-normal'}`}>
        <div className='md:text-[20px] xl:text-[24px]'>최근 검색어</div>
        {searchWords.length > 0 && (
          <div 
            className='text-[12px] text-red-100 cursor-pointer hover:underline md:text-[14px] xl:text-[16px]'
            onClick={handleClearSearchHistory}
          >
            전체삭제
          </div>
        )}
      </div>
      <div className='flex flex-col flex-wrap'>
        {searchWords.length === 0 ? (
          <div className='flex w-full justify-center'>
            <div className='py-[28px] text-[14px] md:text-[16px] md:py-[36px] xl:py-[48px] xl:text-[20px] text-blue-500'>최근 검색어 내역이 없습니다.</div>
          </div>
        ) : (
          searchWords.map((word, index) => (
            <div key={index} onClick={() => onSearchWordClick(word)} className='cursor-pointer w-full relative px-[12px] py-[8px] text-black-300 hover:bg-bg-100 hover:underline md:px-[14px] md:text-[20px] xl:py-[12px] xl:px-[18px] xl:text-[24px]'>
              <div className='flex items-center gap-[8px] md:gap-[12px] xl:gap-[16px]'>
                <SearchIcon className={`w-[16px] h-[16px] md:w-[20px] md:h-[20px] xl:w-[24px] xl:h-[24px] `}/>
                <div>{word}</div>
              </div>
              <div className='absolute w-[14px] h-[14px] top-[12px] right-[9px] md:right-[12px] md:w-[16px] md:h-[16px] md:top-[14px] xl:right-[16px] xl:top-[20px] xl:w-[20px] xl:h-[20px]'>
                <Image className='search-history-icon' src={xIcon} onClick={(e) => {
                  e.stopPropagation();
                  removeSearchWord(word);
                }} alt='removebtn' />
              </div>
            </div>
          ))
        )}
      </div>
      <div className='border border-blue-200'></div>
      <div className='flex justify-end items-center pr-[10px] pb-[6px] w-full text-blue-400 text-[12px] md:pb-[8px] md:text-[14px] md:pr-[14px] xl:pb-[12px] xl:text-[16px] xl:pr-[18px]'>
        <div onClick={handleIsFocusedClose} className='cursor-pointer hover:underline'>
          닫기
        </div>
      </div>
    </div>
  );
};

export default SearchHistory;