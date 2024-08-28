'use client';

import { useEffect, useState } from 'react';

import { User } from '@/src/types/auth';
import { usePathname } from 'next/navigation';

import HeaderServer from '@/src/components/Header/HeaderServer';

import instance from './api/axios';

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsLoggedIn(true);
      const fetchUser = async () => {
        try {
          const userData = await instance.get('users/me');
          setUser(userData.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
          setIsLoggedIn(false);
        } finally {
          setIsLoading(false);
        }
      };
      fetchUser();
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
    }
  }, [pathname]);

  return (
    <div>
      <HeaderServer
        user={user}
        isLoggedIn={isLoggedIn}
        isLoading={isLoading}
        pathname={pathname}
      />
    </div>
  );
}
