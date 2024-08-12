import { TablePageSkeleton } from '@/app/ui/skeletons';
import { HEADERS } from './constants';

export default function Loading() {
  return <TablePageSkeleton headers={HEADERS} />;
}
