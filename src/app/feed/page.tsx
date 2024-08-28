import ClientSideFeed from "../../components/epigrams/ClientSideFeed";

const API_URL = process.env.NEXT_PUBLIC_API;

// 에피그램 목록 조회
export async function fetchEpigramsByServer(limit = 6, cursor = 0, keyword = '') {
    try {
        const response = await fetch(`${API_URL}/epigrams?limit=${limit}&cursor=${cursor}&keyword=${keyword}`);
        
        if (!response.ok) {
            throw new Error('에피그램 목록을 불러오는데 실패했습니다.');
        }

        const data = await response.json();
        return {
            epigrams: data.list,
            nextCursor: data.nextCursor,
            hasMore: limit <= data.list.length
        };
    } catch (error: any) {
        console.error('에피그램 목록을 불러오는데 실패했습니다:', error);
        throw new Error('에피그램 목록을 불러오는데 실패했습니다');
    }
}

export default async function EpigramDetailPage({
  params,
}: {
  params: { slug: string; id: number };
}) {
  const limit = 6; // 필요에 따라 limit를 설정합니다.
  const cursor = 0; // 초기 cursor 값을 설정합니다.

  const { epigrams, nextCursor, hasMore } = await fetchEpigramsByServer(limit, cursor);

  return (
    <div>
      <ClientSideFeed initialEpigrams={epigrams} initialNextCursor={nextCursor} initialHasMore={hasMore} /> 
    </div>
  );
}