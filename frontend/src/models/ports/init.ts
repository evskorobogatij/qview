import { sample } from 'effector'
import {
  $sshList,
  $vncList,
  checkSSH,
  checkSSHForAllNodesFx,
  checkSSHFx,
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

sample({
  clock: checkSSH,
  target: checkSSHFx,
})
sample({
  clock: checkSSHFx.doneData,
  source: $sshList,
  fn: (store, port) => {
    const newStore = store.filter((p) => p.ip !== port.ip)
    newStore.push(port)
    return newStore
  },
  target: $sshList,
})

sample({
  clock: getComputersFx.doneData,
  fn: (computers) => computers.map((cmp) => cmp.ip),
  target: checkVNCForAllNodesFx,
})

sample({
  clock: getComputersFx.doneData,
  fn: (computers) => computers.map((cmp) => cmp.ip),
  target: checkSSHForAllNodesFx,
})
