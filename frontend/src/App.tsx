import { useGate } from 'effector-react'
import { SettingsGate } from './models/settings'

function App() {
  useGate(SettingsGate)
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-sky-700 text-white">
      <div className="text-3xl font-bold">Утилита удаленного подключения</div>
    </div>
  )
}

export default App
