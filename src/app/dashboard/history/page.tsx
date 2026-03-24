import { getTestHistory } from '../exam-actions'
import HistoryList from './history-list'

export default async function HistoryPage() {
  const history = await getTestHistory()
  return <HistoryList sessions={history} />
}
