import { useGate } from 'effector-react'
import { ComputersList } from '../components/ComputersList'
import { Search } from '../components/Search'
import { SettingsGate } from '../models/settings'

export function App() {
  useGate(SettingsGate)
  return (
    <div className="flex h-screen max-h-screen w-screen flex-col bg-slate-100">
      <Search />

      <ComputersList />
    </div>
  )
}
