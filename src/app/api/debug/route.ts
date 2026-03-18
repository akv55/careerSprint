import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()

  const { data: leads, error: errorLeads } = await supabase
    .from('enrollment_leads')
    .select('*')
    .limit(1)

  const { data: enrollments, error: errorEnrollments } = await supabase
    .from('enrollments')
    .select('*')
    .limit(1)

  return NextResponse.json({
    leads,
    errorLeads,
    enrollments,
    errorEnrollments
  })
}
