'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect the user to /client when they hit the home route
    router.push('/client');
  }, [router]);

  return null; // Optionally return null since the user is being redirected
}
