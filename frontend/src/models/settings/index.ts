import { createEvent, createStore, createEffect } from 'effector'
import { createGate } from 'effector-react'
import { LoadDataUrl } from '@wails/go/app/App'

export const $dataUrl = createStore<string>('')

export const loadSettings = createEvent()
export const loadSettingsFx = createEffect(async () => {
  const data = await LoadDataUrl()
  return data
})

export const SettingsGate = createGate()
