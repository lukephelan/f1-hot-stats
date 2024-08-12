import { TablePageSkeleton } from '@/app/ui/skeletons';
import { HEADERS } from './page'

export default function Loading() {
  return <TablePageSkeleton headers={HEADERS} />
}
