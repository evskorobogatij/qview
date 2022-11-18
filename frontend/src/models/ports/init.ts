import { sample } from 'effector'
import {
  $vncList,
  checkVNC,
  checkVNCForAllNodes,
  checkVNCForAllNodesFx,
  checkVNCFx,
} from '.'
import { $computers, getComputersFx } from '../computers'

sample({
  clock: checkVNC,
  target: checkVNCFx,
})

sample({
  clock: checkVNCFx.doneData,
  source: $vncList,
  fn: (store, port) => {
    const newStore = store.filter((p) => p.ip !== port.ip)
    newStore.push(port)
    return newStore
  },
  target: $vncList,
})

$vncList.watch((list) => console.log('PORT SATETUS', list))

sample({
  clock: getComputersFx.doneData,
  target: checkVNCForAllNodes,
})

sample({
  clock: checkVNCForAllNodes,
  source: $computers,
  fn: (computers) => {
    return computers !== null ? computers.map((cmp) => cmp.ip) : []
  },
  target: checkVNCForAllNodesFx,
})
