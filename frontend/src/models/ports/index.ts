import { createStore, createEvent, createEffect } from 'effector'
import { CheckVNC } from '../../../wailsjs/go/main/Ports'

interface PortStatus {
  ip: string
  status?: 'online' | 'offine'
}

type PortStatuses = Array<PortStatus>

export const $vncList = createStore<PortStatuses>([])

export const checkVNC = createEvent<string>()

export const checkVNCFx = createEffect(async (ip: string) => {
  const res = await CheckVNC(ip)
  console.log(res)
  const data: PortStatus = {
    ip,
    status: res ? 'online' : 'offine',
  }
  return data
})

export const checkVNCForAllNodes = createEvent()
export const checkVNCForAllNodesFx = createEffect(
  async (ips: Array<string>) => {
    ips.forEach((ip) => {
      ip.split(', ').forEach((v) => checkVNC(v))
    })
    //
  }
)
