'use client';

import { useRouter } from 'next/navigation';

export function BackButton({ href }: { href?: string }) {
  const router = useRouter();

  const goBack = () => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <button
      onClick={goBack}
      className='bg-cyan-600 text-white hover:bg-cyan-900 font-semibold py-1 px-4 border rounded shadow'
    >
      Back
    </button>
  );
}
