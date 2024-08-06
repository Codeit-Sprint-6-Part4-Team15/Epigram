import CommentsContainer from '@/src/components/CommentContainer';
import Loader from '@/src/components/commons/Loader';

export default function EpigramsPage() {
  return (
    <div className="flex min-h-[100vh] flex-col items-center bg-bg-100">
      <div className="w-[384px] py-[36px] xl:w-[640px] xl:py-[80px]">
        <h3 className="typo-lg-semibold mb-[16px] text-black-600 xl:typo-2xl-semibold xl:mb-[40px]">
          최신 댓글
        </h3>
        <CommentsContainer type="recent" />
      </div>
    </div>
  );
}
