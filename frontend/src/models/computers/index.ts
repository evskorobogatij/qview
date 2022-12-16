import { createStore, createEffect } from 'effector'
import { LoadComputers } from '../../../wailsjs/go/main/Computer'
import { main } from '../../../wailsjs/go/models'

export const $computers = createStore<main.ComputerItem[] | null>(null)

export const getComputersFx = createEffect(async () => {
  //
  const res = await LoadComputers()
  return res
})

export const $loadingComputers = getComputersFx.pending.map(
  (pending) => pending
)

export const $nodesCount = $computers.map((s) => (s ? s.length : 0))
