import Image from 'next/image';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col'>
      <div className='rounded-lg bg-white text-black p-5 shadow-md'>
        <h1 className='text-2xl'>F1 Hot Stats!</h1>
        <p className='py-5'>Select a page from the menu to get started.</p>
        <p>
          This project was built for educational purposes only. Therefore some
          statistics may be incorrect. Information is drawn from data between
          1950 and March 2024, and some data may be incomplete.
        </p>
        <div className='pt-10 flex justify-end'>
          <a
            href='https://github.com/lukephelan/f1-hot-stats'
            target='_blank'
            rel='noopener noreferrer'
          >
            <Image
              src='/github-mark/github-mark.png'
              width={50}
              height={50}
              alt='GitHub link'
            />
          </a>
        </div>
      </div>
    </main>
  );
}
