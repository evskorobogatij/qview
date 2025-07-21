import { createStore, createEffect, createEvent } from 'effector'
import { CheckAllSSH, CheckAllVNC, GetComputersList, LoadComputers } from '@wails/go/computers/Computer'
import { computers  } from '@wails/go/models'

import { EventsOn } from '@wails/runtime'
import { emitSSHStatus, emitVNCStatus } from '../ports'

export const $computers = createStore<computers.ComputerItem[] | null>(null)

export const getComputersFx = createEffect(async () => {
  //
  console.log("GET NODES LIST")
  await LoadComputers()
  const res = await GetComputersList()
  return res
})

export const $loadingComputers = getComputersFx.pending.map(
  (pending) => pending
)

export const $nodesCount = $computers.map((s) => (s ? s.length : 0))


export const checkVNCForAllNodes = createEvent()
export const checkVNCForAllNodesFx = createEffect(async () => {
  console.log("Start checking nodes")
  await CheckAllVNC()
})

export const checkSSHForAllNodes = createEvent()
export const checkSSHForAllNodesFx = createEffect(async () => {
  console.log("Start checking nodes")
  await CheckAllSSH()
})

EventsOn("sendVNCStatus", (data: computers.NodeStatus) => {
  emitVNCStatus({
    id: data.id, status: data.available
      ? 'online' : 'offline'
  })
})

EventsOn("sendSSHStatus", (data: computers.NodeStatus) => {
  emitSSHStatus({
    id: data.id, status: data.available
      ? 'online' : 'offline'
  })
})