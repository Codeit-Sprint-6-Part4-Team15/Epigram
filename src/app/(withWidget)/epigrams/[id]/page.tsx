import ClientSideEpigramDetail from "@/src/components/epigrams/ClientSideEpigramDetail";

const API_URL = process.env.NEXT_PUBLIC_API;

async function getEpigramById(id:number) {
  const res = await fetch(`${API_URL}/epigrams/${id}`)
  if (!res.ok) {
    throw new Error(`${id}번 에피그램을 불러오는데 실패했습니다.`);
  }
  return res.json()
}

async function getUserMe(id:number) {
  const res = await fetch(`${API_URL}/users/me`)
  if (!res.ok) {
    console.error('유저 정보를 불러오는 데 실패했습니다.');
  }
  return res.json()
}

export default async function EpigramDetailPage({
  params,
}: {
  params: { slug: string; id: number };
}) {
  const epigram = await getEpigramById(params.id);
  const userData = await getUserMe(768); // USER_ID는 이 함수가 호출될 때 유효한 값이어야 함.

  return (
    <div>
      <ClientSideEpigramDetail epigram={epigram} user={userData} />
    </div>
  );
}
