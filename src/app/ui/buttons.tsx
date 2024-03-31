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
      className='bg-black text-white hover:bg-white hover:text-black font-semibold py-1 px-4 hover:border-black border rounded shadow'
    >
      Back
    </button>
  );
}
