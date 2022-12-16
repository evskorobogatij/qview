import { useGate, useStore } from 'effector-react'
import { CardsList } from '../components/CardsList'
import { ComputersList } from '../components/ComputersList'
import { LoadingBox } from '../components/LoadingBox'
import { Search } from '../components/Search'
import { $loadingComputers } from '../models/computers'
import { SettingsGate } from '../models/settings'

export function App() {
  const loading = useStore($loadingComputers)
  useGate(SettingsGate)
  return (
    <div className="flex h-screen max-h-screen w-screen flex-col  bg-slate-100">
      <Search />
      {loading ? <LoadingBox /> : <ComputersList />}
      {!loading && <CardsList />}
    </div>
  )
}
