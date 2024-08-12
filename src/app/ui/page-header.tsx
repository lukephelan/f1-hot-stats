import { BackButton } from '@/app/ui/buttons';

export default function PageHeader({
  title,
  showBackButton,
}: {
  title: string;
  showBackButton?: boolean;
}) {
  return (
    <div className='flex w-full items-center justify-between p-5 rounded-lg bg-white text-black shadow-md'>
      <div className='min-h-10'>
        <h1 className='text-2xl'>{title}</h1>
      </div>
      {showBackButton && <BackButton />}
    </div>
  );
}
