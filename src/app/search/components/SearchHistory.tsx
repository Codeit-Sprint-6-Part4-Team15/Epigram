import React from 'react';
import xIcon from '@/public/assets/xIcon.svg';
import Image from 'next/image';

interface SearchHistoryProps {
  searchWords: string[];
  clearSearchHistory: () => void;
  removeSearchWord: (word: string) => void;
  onSearchWordClick: (word: string) => void;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({ searchWords, clearSearchHistory, removeSearchWord, onSearchWordClick }) => {
  return (
    <div className='flex flex-col w-[312px] pb-[24px] gap-[16px] mt-[24px] md:w-[384px] md:mt-[32px] md:gap-[24px] xl:w-[640px] xl:mt-[40px] xl:gap-[40px]'>
      <div className={`flex items-center ${searchWords.length > 0 ? 'justify-between' : 'justify-normal'}`}>
        <div className='md:text-[20px] xl:text-[24px]'>최근 검색어</div>
        {searchWords.length > 0 && (
          <div 
            className='text-[12px] text-red-100 cursor-pointer hover:underline md:text-[14px] xl:text-[16px]'
            onClick={clearSearchHistory}
          >
            모두 지우기
          </div>
        )}
      </div>
      <div className='flex gap-[8px] flex-wrap md:gap-[16px]'>
        {searchWords.length === 0 ? (
          <div className='flex w-full justify-center'>
            <div className='text-[14px] md:text-[16px] xl:text-[20px] text-blue-500'>최근 검색어 내역이 없습니다.</div>
          </div>
        ) : (
          searchWords.map((word, index) => (
            <div key={index} onClick={() => onSearchWordClick(word)} className='rounded-2xl cursor-pointer relative bg-bg-100 px-[12px] py-[8px] text-black-300 hover:bg-bg-200 hover:text-white md:text-[20px] xl:py-[12px] xl:px-[14px] xl:text-[24px]'>
              <div>{word}</div>
              <div className='absolute w-[14px] h-[14px] top-[3px] right-[2px]'>
                <Image className='search-history-icon' src={xIcon} onClick={(e) => {
                  e.stopPropagation();
                  removeSearchWord(word);
                }} alt='removebtn' />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchHistory;