import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Epigram } from '@/src/types/epigrams';
import { getEpigrams } from '../../api/epigram';

interface SearchEpigramProps {
  searchWord: string;
}

const LIMIT = 7;

const SearchEpigram: React.FC<SearchEpigramProps> = ({ searchWord }) => {
  const [epigrams, setEpigrams] = useState<Epigram[]>([]);
  const [loading, setLoading] = useState(false);
  const [cursor, setCursor] = useState<number | null>(null);

  const isFirstRender = useRef(true);
  const router = useRouter();

  const fetchEpigrams = useCallback(async (reset: boolean = false) => {
    try {
      setLoading(true);
      const response = await getEpigrams(LIMIT, reset ? undefined : cursor ?? undefined, searchWord ?? '');
      const epigramList = response.list;
      const nextCursor = epigramList.length > 0 ? epigramList[epigramList.length - 1].id : null;
      setCursor(nextCursor);

      if (reset) {
        setEpigrams(epigramList);
      } else {
        setEpigrams(prevEpigramList => [...prevEpigramList, ...epigramList]);
      }

      // 로컬 스토리지에 검색 결과 저장
      localStorage.setItem('epigrams', JSON.stringify(epigramList));
      localStorage.setItem('cursor', nextCursor ? nextCursor.toString() : 'null');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [cursor, searchWord]);

  const loadEpigramsFromLocalStorage = () => {
    const storedEpigrams = localStorage.getItem('epigrams');
    const storedCursor = localStorage.getItem('cursor');

    if (storedEpigrams) {
      setEpigrams(JSON.parse(storedEpigrams));
    }
    
    if (storedCursor) {
      setCursor(storedCursor === 'null' ? null : Number(storedCursor));
    }
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      loadEpigramsFromLocalStorage();  // 로컬 스토리지에서 데이터 로드
      fetchEpigrams();
    }
  }, []);

  useEffect(() => {
    const fetchOnSearchWordChange = async () => {
      setCursor(null);
      setEpigrams([]);
      await fetchEpigrams(true);
    };

    fetchOnSearchWordChange();
  }, [searchWord]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      const clientHeight = document.documentElement.clientHeight || window.innerHeight;

      if (
        scrollTop + clientHeight >= scrollHeight - 1 &&
        !loading &&
        cursor !== null
      ) {
        fetchEpigrams();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, cursor, fetchEpigrams]);

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

  const handleItemClick = (id: number) => {
    router.push(`/epigrams/${id}`);
  };

  return (
    <div className='w-[360px] md:w-[384px] xl:w-[640px] xl:text-[20px]'>
      <div>
        {epigrams.map((epigram, index) => (
          <div
            className='flex border-b border-gray-100 flex-col gap-[8px] py-[16px] px-[24px] xl:py-[24px] xl:gap-[16px] cursor-pointer'
            key={`${epigram.id}-${index}`}
            onClick={() => handleItemClick(epigram.id)}
          >
            <div className='flex flex-col font-iropke gap-[4px] md:gap-[8px] xl:gap-[24px]'>
              <div className='text-black-600'>{highlightText(epigram.content, searchWord)}</div>
              <div className='text-blue-400'>- {highlightText(epigram.author, searchWord)} -</div>
            </div>
            <div className='flex gap-[12px] justify-end'>
              {epigram.tags.map(tag => (
                <div className='text-blue-400 font-pretendard font-normal' key={`${tag.name}-${index}`}>
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
};

export default SearchEpigram;