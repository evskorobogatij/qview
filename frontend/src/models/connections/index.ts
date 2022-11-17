import { createEvent, createEffect } from 'effector'
import {
  ConnectByVNC,
  ConnectBySSH,
} from '../../../wailsjs/go/main/Connections'

export const connectByVNC = createEvent<string>()
export const connectBySSH = createEvent<string>()

export const connectByVNCFx = createEffect(async (host: string) => {
  await ConnectByVNC(host)
})

export const connectBySSHFx = createEffect(async (host: string) => {
  await ConnectBySSH(host)
})
