import { createStore, createEvent, createEffect } from 'effector'
import { debug } from 'patronum'
import { main } from '../../../wailsjs/go/models'
import { CheckSSH, CheckVNC } from '../../../wailsjs/go/main/Computer'


interface NodeStatus {
  id: string
  status?: 'online' | 'offline'
}

export interface NodeState {
  id: string
  vnc_status: 'online' | 'offline' | undefined
  ssh_status: 'online' | 'offline' | undefined
}
export type NodesState = Array<NodeState>


export const checkVNC = createEvent<string>()
export const checkVNCFx = createEffect(async (id: string) => {
  const res = await CheckVNC(id)
  console.log('vnc', res)
  const data: NodeStatus = {
    id,
    status: res.available ? 'online' : 'offline',
  }
  return data
})
export const emitVNCStatus = createEvent<NodeStatus>()


export const checkSSH = createEvent<string>()
export const checkSSHFx = createEffect(async (id: string) => {
  const res = await CheckSSH(id)
  console.log('ssh', res)
  const data: NodeStatus= {
    id,
    status: res.available ? 'online' : 'offline',
  }
  return data
})
export const emitSSHStatus = createEvent<NodeStatus>()


// export const refreshStatuses = createEvent()
// setInterval(() => refreshStatuses(), 10 * 60 * 1000)

export const $nodesState = createStore<NodesState>([], { name: "nodes_state" })

export const $availableCount = $nodesState.map(s => s.filter(v => v.vnc_status === 'online' || v.ssh_status === 'online').length)
export const $unavailableCount = $nodesState.map(s => s.filter(v => v.vnc_status === 'offline' && v.ssh_status == 'offline').length)


debug($nodesState)