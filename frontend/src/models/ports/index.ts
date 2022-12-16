import { createStore, createEvent, createEffect } from 'effector'
import { CheckSSH, CheckVNC } from '../../../wailsjs/go/main/Ports'

interface PortStatus {
  ip: string
  status?: 'online' | 'offline'
}

type PortStatuses = Array<PortStatus>

export interface NodeState {
  node_name: string
  status: 'online' | 'offline' | undefined
}
export type NodesState = Array<NodeState>

export const $vncList = createStore<PortStatuses>([])

export const checkVNC = createEvent<string>()

export const checkVNCFx = createEffect(async (ip: string) => {
  const res = await CheckVNC(ip)
  console.log(res)
  const data: PortStatus = {
    ip,
    status: res ? 'online' : 'offline',
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

export const $sshList = createStore<PortStatuses>([])
export const checkSSH = createEvent<string>()
export const checkSSHFx = createEffect(async (ip: string) => {
  const res = await CheckSSH(ip)
  const data: PortStatus = {
    ip,
    status: res ? 'online' : 'offline',
  }
  return data
})

export const checkSSHForAllNodesFx = createEffect(
  async (ips: Array<string>) => {
    ips.forEach((ip) => {
      ip.split(', ').forEach((v) => checkSSH(v))
    })
  }
)

export const $nodesState = createStore<NodesState>([])
