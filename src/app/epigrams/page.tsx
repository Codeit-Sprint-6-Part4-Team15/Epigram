import CommentsContainer from "@/src/components/CommentContainer";

export default function EpigramsPage() {
  return (
    <div className="flex flex-col items-center bg-bg-100 min-h-[100vh]">
      <div className="w-[384px] xl:w-[640px] py-[36px] xl:py-[80px]">
        <h3 className="typo-lg-semibold xl:typo-2xl-semibold text-black-600 mb-[16px] xl:mb-[40px]">최신 댓글</h3>
        <CommentsContainer type="recent"/>
      </div>
    </div>
  )
}