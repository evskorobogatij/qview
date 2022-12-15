import { sample } from 'effector'
import {
  $vncList,
  checkVNC,
  checkVNCForAllNodesFx,
  checkVNCFx,
} from '.'
import { getComputersFx } from '../computers'

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
  fn: (computers) => computers.map((cmp) => cmp.ip),
  target: checkVNCForAllNodesFx,
})
