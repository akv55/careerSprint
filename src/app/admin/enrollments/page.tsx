import { getAdminEnrollments } from '../actions'
import EnrollmentsDirectoryClient from './enrollments-client'

export const dynamic = 'force-dynamic'

export default async function EnrollmentsDirectory({
  searchParams
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const search = typeof searchParams?.search === 'string' ? searchParams.search : ''
  const statusFilter = typeof searchParams?.status === 'string' ? searchParams.status : 'all'
  const page = typeof searchParams?.page === 'string' ? parseInt(searchParams.page, 10) : 1
  const pageSize = 10

  const { enrollments, totalCount } = await getAdminEnrollments({ search, status: statusFilter, page, pageSize })

  return (
    <EnrollmentsDirectoryClient 
      initialEnrollments={enrollments || []} 
      totalCount={totalCount || 0} 
      currentPage={page} 
      currentSearch={search}
      currentStatus={statusFilter}
      pageSize={pageSize}
    />
  )
}

