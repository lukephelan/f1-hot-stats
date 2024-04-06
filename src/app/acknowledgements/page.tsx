export default function Page() {
  return (
    <div className='w-full'>
      <div className='rounded-lg bg-white text-black p-5 shadow-md'>
        <h1 className='text-2xl'>Acknowledgements</h1>
        <ul className='list-disc p-5'>
          <li>
            Database image is from{' '}
            <a
              href='http://ergast.com/mrd/'
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-600 visited:text-purple-600'
            >
              Ergast.
            </a>
          </li>
          <li>
            Favicon is from{' '}
            <a
              href='https://www.flaticon.com'
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-600 visited:text-purple-600'
            >
              Flaticon
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
