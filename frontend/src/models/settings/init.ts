import { sample } from 'effector'
import { $dataUrl, loadSettings, loadSettingsFx, SettingsGate } from '.'

sample({
  clock: SettingsGate.open,
  target: loadSettings
})

sample({
  clock: loadSettings,
  target: loadSettingsFx
})

sample({
  clock: loadSettingsFx.doneData,
  target: $dataUrl,
})
