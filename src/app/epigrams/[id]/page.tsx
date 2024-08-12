import EpigramDetailPageCommentsSection from '@/src/components/EpigramDetailPageCommentsSection';

export default function EpigramDetailPage({
  params,
}: {
  params: { id: string };
}) {
  console.log('params.slug:', params.id);

  const epigramId = parseInt(params.id, 10);
  console.log('epigramId:', epigramId);

  if (isNaN(epigramId)) {
    console.error('Invalid epigram ID');
    return <div>유효하지 않은 에피그램 ID입니다.</div>;
  }

  return (
    <div>
      <EpigramDetailPageCommentsSection epigramId={epigramId} />
    </div>
  );
}
