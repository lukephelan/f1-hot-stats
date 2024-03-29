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
      className='bg-white hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-white rounded'
    >
      Back
    </button>
  );
}
