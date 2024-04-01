import { createStore, createEffect, createEvent } from 'effector'
import { CheckAllSSH, CheckAllVNC, GetComputersList, LoadComputers } from '../../../wailsjs/go/main/Computer'
import { main } from '../../../wailsjs/go/models'

import { EventsOn } from '../../../wailsjs/runtime'
import { emitSSHStatus, emitVNCStatus } from '../ports'

export const $computers = createStore<main.ComputerItem[] | null>(null)

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

EventsOn("sendVNCStatus", (data: main.NodeStatus) => {
  emitVNCStatus({
    id: data.id, status: data.available
      ? 'online' : 'offline'
  })
})

EventsOn("sendSSHStatus", (data: main.NodeStatus) => {
  emitSSHStatus({
    id: data.id, status: data.available
      ? 'online' : 'offline'
  })
})