import { getAdminUsers } from '../actions'
import UserDirectoryClient from './users-client'

export const dynamic = 'force-dynamic'

export default async function UserDirectory({
  searchParams
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const search = typeof searchParams?.search === 'string' ? searchParams.search : ''
  const page = typeof searchParams?.page === 'string' ? parseInt(searchParams.page, 10) : 1
  const pageSize = 10

  const { users, totalCount } = await getAdminUsers({ search, page, pageSize })

  return (
    <UserDirectoryClient 
      initialUsers={users} 
      totalCount={totalCount || 0} 
      currentPage={page} 
      currentSearch={search}
      pageSize={pageSize}
    />
  )
}

