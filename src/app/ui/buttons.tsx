'use client';

import { useRouter } from 'next/navigation';

export function BackButton() {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <button
      onClick={goBack}
      className='bg-black text-white hover:bg-white hover:text-black font-semibold py-1 px-4 border border-gray-400 rounded shadow'
    >
      Back
    </button>
  );
}
