import { useGate, useUnit } from 'effector-react'
import { CardsList } from '@/components/cards-list'
import { ComputersList } from '@/components/computers-list'
import { LoadingBox } from '@/components/loading-box'
import { Search } from '@/components/search'
import { $loadingComputers } from '@/models/computers'
import { SettingsGate } from '@/models/settings'

export function App() {
  const loading = useUnit($loadingComputers)
  useGate(SettingsGate)
  return (
    <div className="flex h-screen max-h-screen w-screen flex-col  bg-slate-100">
      <Search />
      {loading ? <LoadingBox /> : <ComputersList />}
      {!loading && <CardsList />}
    </div>
  )
}
