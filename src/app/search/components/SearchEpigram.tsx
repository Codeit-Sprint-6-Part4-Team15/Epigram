import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { Epigram } from '@/src/types/epigrams';
import { getEpigrams } from '../../api/epigram';

interface SearchEpigramProps {
  searchWord: string;
}

const SearchEpigram: React.FC<SearchEpigramProps> = ({ searchWord }) => {
  const [epigrams, setEpigrams] = useState<Epigram[]>([]);
  const [allEpigrams, setAllEpigrams] = useState<Epigram[]>([]);
  const [filteredEpigrams, setFilteredEpigrams] = useState<Epigram[]>([]);
  const [loading, setLoading] = useState(false);
  const [cursor, setCursor] = useState<number | null>(null);

  const isFirstRender = useRef(true); // 개발 모드 strictmode 에러 해결 때문에 사용

  const LIMIT = 5;

  const fetchEpigrams = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getEpigrams(LIMIT, cursor ?? undefined);
      const allItemRes = await getEpigrams(9999, 0);
      const epigramList = response.list;
      const nextCursor = epigramList.length > 0 ? epigramList[epigramList.length - 1].id : null;
      setAllEpigrams(allItemRes.list);
      setCursor(nextCursor);

      setEpigrams(prevEpigramList => [...prevEpigramList, ...epigramList]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [cursor]);

  useEffect(() => { // 첫 화면 렌더링 
    if (isFirstRender.current) {
      isFirstRender.current = false;
      fetchEpigrams();
    }
  }, [fetchEpigrams]); 

  useEffect(() => { // 무한 스크롤
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight &&
        !loading &&
        cursor !== null // 다음 커서가 존재하는 경우에만 fetchEpigrams 호출
      ) {
        fetchEpigrams();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, cursor, fetchEpigrams]); // loading 상태와 cursor가 변경될 때마다 호출됩니다.

  useEffect(() => { // 검색 기능
    if (searchWord) {
      setFilteredEpigrams(
        allEpigrams.filter(epigram => 
          epigram.content.toLowerCase().includes(searchWord.toLowerCase()) ||
          epigram.author.toLowerCase().includes(searchWord.toLowerCase()) ||
          epigram.tags.some(tag => tag.name.toLowerCase().includes(searchWord.toLowerCase()))
        )
      );
    } else {
      setFilteredEpigrams(epigrams);
    }
  }, [searchWord, allEpigrams]);

  const highlightText = useCallback((text: string, highlight: string) => {
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
  }, []);

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