import { createEvent, createEffect, createStore } from 'effector'
import {
  ConnectByVNC,
  ConnectBySSH,
} from '@wails/go/connections/Connections'


export const connectByVNC = createEvent<string>()
export const connectBySSH = createEvent<string>()

export const connectByVNCFx = createEffect(async (host: string) => {
  await ConnectByVNC(host)
})

export const connectBySSHFx = createEffect(async (host: string) => {
  await ConnectBySSH(host)
})

export const $ipListTrace = createStore<Array<string>>([])
export const $activeTraceMenu = $ipListTrace.map((list) => list.length > 0)
export const showTracertMenu = createEvent<Array<string>>()
export const hideTracertMenu = createEvent()


