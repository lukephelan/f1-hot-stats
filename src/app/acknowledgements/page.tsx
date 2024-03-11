import Link from 'next/link';

export default function Page() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between pb-5">
        <h1 className="text-2xl">Acknowledgements</h1>
      </div>
      <p>Acknowledgements to <Link href='http://ergast.com/mrd/' target="_blank" className={
        'text-blue-500'
      }>Ergast</Link> for the database image.
      </p>
    </div>
  )
}