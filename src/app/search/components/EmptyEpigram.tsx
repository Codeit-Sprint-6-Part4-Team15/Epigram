import Image from 'next/image';
import notice from '@/public/assets/ic_notice.svg'

function EmptyEpigram() {
  return (
    <div className='w-full pb-[200px] h-[400px] flex flex-col gap-[16px] justify-center items-center md:pb-[160px] xl:pb-[80px]'>
      <div className='text-[14px] md:text-[16px] xl:text-[20px]'>
        검색 결과가 없습니다.
      </div>
      <div>
        <Image width={80} height={80} className='md:w-[120px] md:h-[120px] xl:w-[150px] xl:h-[150px]' src={notice} alt='notice'></Image>
      </div>
    </div>
  )
}

export default EmptyEpigram;