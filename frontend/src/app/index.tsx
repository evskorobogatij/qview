import { useGate } from 'effector-react'
import { Search } from '../components/Search'
import { SettingsGate } from '../models/settings'

export function App() {
  useGate(SettingsGate)
  return (
    <div className="flex h-screen w-screen flex-col gap-2 bg-slate-100">
      <Search />

      

      <div className="text-3xl font-bold m-4 ">Утилита удаленного подключения</div>
    </div>
  )
}
