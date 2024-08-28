import { getToken } from "@/src/app/api/axios";
import ClientSideEpigramDetail from "@/src/components/epigrams/ClientSideEpigramDetail";

const API_URL = process.env.NEXT_PUBLIC_API;

async function getEpigramById(id: number) {
  try {
    const res = await fetch(`${API_URL}/epigrams/${id}`);

    if (!res.ok) {
      throw new Error(`${id}번 에피그램을 불러오는데 실패했습니다.`);
    }

    return res.json();
  } catch (error) {
    throw new Error(`${id}번 에피그램을 불러오는데 실패했습니다.`);
  }
}


export default async function EpigramDetailPage({
  params,
}: {
  params: { slug: string; id: number };
}) {
  const epigram = await getEpigramById(params.id);
  return (
    <div>
      <ClientSideEpigramDetail epigram={epigram} id={params.id} />
    </div>
  );
}
