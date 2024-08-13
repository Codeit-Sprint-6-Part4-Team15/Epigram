
'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setToken } from './token';

export default function Login() {
  const [token, setTokenValue] = useState('');
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setToken(token);
    router.push('/mypage'); // 로그인 후 EmotionCalendar 페이지로 이동
  };

  return (
    <div className="login-container">
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <label>
          액세스 토큰:
          <input
            type="text"
            value={token}
            onChange={(e) => setTokenValue(e.target.value)}
          />
        </label>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}
