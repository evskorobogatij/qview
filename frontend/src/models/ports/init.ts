import { sample } from 'effector'

import {
  $nodesState,
  $sshList,
  $vncList,
  checkSSH,
  checkSSHForAllNodesFx,
  checkSSHFx,
  checkVNC,
  checkVNCForAllNodesFx,
  checkVNCFx,
  NodesState,
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

sample({
  source: { computers: $computers, ssh: $sshList, vnc: $vncList },
  fn: ({ computers, ssh, vnc }): NodesState => {
    const list = computers?.map((cmp) => {
      const node_name = cmp.node_name
      const ipList = cmp.ip.split(', ')
      const vncStates = ipList
        .map((ip) => vnc.find((v) => v.ip === ip))
        .filter((status) => status !== undefined)

      const sshStates = ipList
        .map((ip) => ssh.find((s) => s.ip === ip))
        .filter((status) => status !== undefined)

      const states = [...vncStates, ...sshStates]
      const status: 'online' | 'offline' | undefined =
        states.length > 0
          ? states.find((s) => s?.status === 'online') !== undefined
            ? 'online'
            : 'offline'
          : undefined

      return { node_name, status }
    })

    return list ?? []
  },
  target: $nodesState,
})
