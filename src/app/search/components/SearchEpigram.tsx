import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { Epigram, EpigramTag } from '@/src/types/epigrams';
import { getEpigrams } from '../../api/epigram';
import EmptyEpigram from './EmptyEpigram';
import Loader from '@/src/components/commons/Loader';

const LIMIT = 7;

const SearchEpigram: React.FC = () => {
  const router = useRouter();
  const searchWord = useSearchParams().get('query') || ''; // 쿼리에서 searchWord 가져오기
  const [epigrams, setEpigrams] = useState<Epigram[]>([]);
  const [loading, setLoading] = useState(false);
  const [cursor, setCursor] = useState<number | null>(null);
  const [allEpigrams, setAllEpigrams] = useState<Epigram[]>([]); // 전체 데이터를 저장할 상태
  const [hasSearched, setHasSearched] = useState(false); // 검색 여부 상태 추가
  const fetchSearchEpigrams = useCallback(async () => {
    if (!searchWord) return; // 검색어가 없으면 함수 종료

    try {
      setLoading(true);
      const response = await getEpigrams(999, 0, searchWord); // 전체 데이터를 가져옵니다.
      const epigramList: Epigram[] = response.list;

      // 태그에 포함된 경우 우선적으로 정렬
      epigramList.sort((a: Epigram, b: Epigram) => {
        const aIncludesKeywordInTag = a.tags?.some((tag: EpigramTag) => tag.name.includes(searchWord));
        const bIncludesKeywordInTag = b.tags?.some((tag: EpigramTag) => tag.name.includes(searchWord));
        return (bIncludesKeywordInTag ? 1 : 0) - (aIncludesKeywordInTag ? 1 : 0);
      });

      // 전체 데이터를 상태에 저장
      setAllEpigrams(epigramList);
      setEpigrams(epigramList.slice(0, LIMIT)); // 처음 LIMIT 개수만 보여줌
      setCursor(epigramList.length > LIMIT ? epigramList[LIMIT - 1].id : null); // 다음 cursor 설정
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [searchWord]);

  
  useEffect(() => {
    if (searchWord) {
      fetchSearchEpigrams(); // 쿼리 값이 있을 경우 검색 데이터 요청
      setHasSearched(true);
    } else {
      setEpigrams([]); // 검색어가 없을 경우 초기 상태로 설정
      setHasSearched(false); // 검색하지 않음
    }
  }, [searchWord, fetchSearchEpigrams]);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      const clientHeight = document.documentElement.clientHeight || window.innerHeight;
  
      if (scrollTop + clientHeight >= scrollHeight - 100 && !loading) {
        if (searchWord) {
          const currentLength = epigrams.length;
          if (allEpigrams.length > currentLength) {
            const nextEpigrams = allEpigrams.slice(currentLength, currentLength + LIMIT);
            setEpigrams(prev => [...prev, ...nextEpigrams]);
          }
        } 
      }
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, epigrams.length, allEpigrams, searchWord, cursor]);

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
  console.log(hasSearched)
  return (
    <div className='w-[360px] md:w-[384px] xl:w-[640px] xl:text-[20px]'>
      <div>
        {epigrams.length > 0 ? (
          epigrams.map((epigram, index) => (
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
                {epigram.tags.map((tag, tagIndex) => (
                  <div className='text-blue-400 font-pretendard font-normal' key={`${tag.name}-${tagIndex}`}>
                    #{highlightText(tag.name, searchWord)}
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          hasSearched && <EmptyEpigram /> // 데이터가 없을 경우 EmptyEpigram 컴포넌트를 렌더링
        )}
      </div>
      {loading && (
  <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pb-[100px] flex flex-col items-center">
    <Loader />
  </div>
)}
    </div>
  );
}
export default SearchEpigram;