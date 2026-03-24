import { getLeaderboard, getMyGamificationStatus } from './actions'
import LeaderboardClient from './leaderboard-client'

export const dynamic = 'force-dynamic'

export default async function LeaderboardPage() {
  const [leaderboard, myStatus] = await Promise.all([
    getLeaderboard(),
    getMyGamificationStatus()
  ])

  return (
    <LeaderboardClient 
      initialLeaderboard={leaderboard} 
      initialMyStatus={myStatus} 
    />
  )
}
