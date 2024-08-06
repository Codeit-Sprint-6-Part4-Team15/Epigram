import React, { useEffect, useState, useRef } from 'react';
import axios from '@/src/app/api/axios';
import { mockData, Epigram } from '@/mockData';

interface SearchEpigramProps {
  searchWord: string;
}

const SearchEpigram: React.FC<SearchEpigramProps> = ({ searchWord }) => {
  const [epigrams, setEpigrams] = useState<Epigram[]>([]);
  const [filteredEpigrams, setFilteredEpigrams] = useState<Epigram[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  
  const isFirstRender = useRef(true); // 개발 모드 strictmode 에러 해결 때문에 사용

  const LIMIT = 5;

  const fetchEpigrams = async (pageNum: number) => {
    try {
      setLoading(true);
      // const response = await axios.get(`/epigrams?limit=${LIMIT}`);
      // const newEpigrams = response.data.list;

      const start = (pageNum - 1) * LIMIT;
      const end = start + LIMIT;
      const newEpigrams = mockData.list.slice(start, end);

      setEpigrams(prevEpigrams => [...prevEpigrams, ...newEpigrams]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { // 첫 화면 렌더링 
    if (isFirstRender.current) {
      isFirstRender.current = false;
      fetchEpigrams(page);
    }
  }, []); 

  useEffect(() => { // 무한 스크롤
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight && !loading) {
        setPage(prevPage => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]); // loading 상태가 변경될 때마다 호출됩니다.

  useEffect(() => {
    if (page > 1) {
      fetchEpigrams(page);
    }
  }, [page]);

  useEffect(() => { // 검색 기능
    if (searchWord) {
      setFilteredEpigrams(
        mockData.list.filter(epigram => 
          epigram.content.toLowerCase().includes(searchWord.toLowerCase()) ||
          epigram.author.toLowerCase().includes(searchWord.toLowerCase()) ||
          epigram.tags.some(tag => tag.name.toLowerCase().includes(searchWord.toLowerCase()))
        )
      );
    } else {
      setFilteredEpigrams(epigrams);
    }
  }, [searchWord, epigrams]);

  const highlightText = (text: string, highlight: string) => { // 검색어 하이라이팅 기능
    if (!highlight) return text;

    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} style={{ color: '#5195EE' }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className='w-[360px] md:w-[384px] xl:w-[640px] xl:text-[20px]'>
      <div>
        {filteredEpigrams.map(epigram => (
          <div className='flex border-b border-gray-100 flex-col gap-[8px] py-[16px] px-[24px] xl:py-[24px] xl:gap-[16px]' key={epigram.id}>
            <div className='flex flex-col gap-[4px] md:gap-[8px] xl:gap-[24px]'>
              <div className='text-black-600'>{highlightText(epigram.content, searchWord)}</div>
              <div className='text-blue-400'>- {highlightText(epigram.author, searchWord)} -</div>
            </div>
            <div className='flex gap-[12px] justify-end'>
              {epigram.tags.map(tag => (
                <div className='text-blue-400' key={tag.name}>
                  #{highlightText(tag.name, searchWord)}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {loading && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pb-[100px]">
          Loading...
        </div>
      )}
    </div>
  );
}

export default SearchEpigram;