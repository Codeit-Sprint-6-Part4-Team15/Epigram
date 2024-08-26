'use client';

import { useEffect, useState } from 'react';

import TodayEmotionSelector from '@/src/components/commons/TodayEmotionSelector';

export function ClientSideUser() {
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const user =
      typeof window !== 'undefined'
        ? JSON.parse(localStorage.getItem('user')!)
        : null;
    setUserId(user ? user.id : null);
  }, []);

  return (
    <div className="flex justify-center">
      <TodayEmotionSelector userId={userId} />
    </div>
  );
}
