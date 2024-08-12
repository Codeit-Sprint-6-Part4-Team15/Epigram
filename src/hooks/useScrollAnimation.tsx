import { useEffect, useRef } from 'react';

import { useAnimation, useInView } from 'framer-motion';

export const useScrollAnimation = () => {
  //스크롤 애니메이션 커스텀 훅
  const animation = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      // 엘리먼트가 뷰포트 내에 들어오면 showState 애니메이션 실행
      animation.start('showState');
    } else {
      // 엘리먼트가 뷰포트에서 벗어나면 hiddenState 애니메이션 실행
      animation.start('hiddenState');
    }
  }, [animation, isInView]);

  return { ref, animation };
};
