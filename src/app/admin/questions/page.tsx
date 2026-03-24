import React from 'react'
import { getAdminQuestions, getAdminFilterOptions } from '../actions'
import QuestionBankClient from './questions-client'

export const dynamic = 'force-dynamic'

export default async function QuestionBank(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = await props.searchParams
  const search = typeof searchParams?.search === 'string' ? searchParams.search : ''
  const domain = typeof searchParams?.domain === 'string' ? searchParams.domain : ''
  const page = typeof searchParams?.page === 'string' ? parseInt(searchParams.page, 10) : 1
  const pageSize = 10

  const [
    { questions, totalCount },
    { domains }
  ] = await Promise.all([
    getAdminQuestions({ search, domain, page, pageSize }),
    getAdminFilterOptions()
  ])

  return (
    <QuestionBankClient 
      initialQuestions={questions} 
      totalCount={totalCount || 0}
      currentPage={page}
      currentSearch={search}
      currentDomain={domain}
      availableDomains={domains}
    />
  )
}
