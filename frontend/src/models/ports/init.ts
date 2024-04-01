import { sample } from 'effector'

import {
  $nodesState,
  // $sshList,
  // $vncList,
  checkSSH,
  checkSSHFx,
  checkVNC,

  checkVNCFx,
  emitSSHStatus,
  emitVNCStatus,
  NodesState,
} from '.'
import { $computers, getComputersFx } from '../computers'

sample({
  clock: checkVNC,
  target: checkVNCFx,
})

sample({
  clock: checkVNCFx.doneData,
  target: emitVNCStatus
})

sample({
  clock: emitVNCStatus,
  source: $nodesState,
  fn: (nodes, item) => {
    // nodes.map(v => v.id === item.id ? { id: v.id, ssh_status: v.ssh_status, vnc_status: item.status } : v),

    const tmpArr = Array.from(nodes)
    const findIndex = nodes.findIndex(v => v.id === item.id)
    if (findIndex >= 0) {
      const [tmp] = tmpArr.splice(findIndex,1)
      tmpArr.splice(findIndex,0,{...tmp,vnc_status: item.status})
      return tmpArr
    } else {
      return [...nodes,{id: item.id, vnc_status: item.status, ssh_status: undefined}]
    }

    
  },
  target: $nodesState
})
// sample({
//   clock: checkVNCFx.doneData,
//   source: $vncList,
//   fn: (store, port) => {
//     const newStore = store.filter((p) => p.ip !== port.ip)
//     newStore.push(port)
//     return newStore
//   },
//   target: $vncList,
// })

sample({
  clock: checkSSH,
  target: checkSSHFx,
})

sample({
  clock: checkSSHFx.doneData,
  target: emitSSHStatus
})

sample({
  clock: emitSSHStatus,
  source: $nodesState,
  fn: (nodes, item) => {
    // nodes.map(v => v.id === item.id ? { id: v.id, ssh_status: v.ssh_status, vnc_status: item.status } : v),

    const tmpArr = Array.from(nodes)
    const findIndex = nodes.findIndex(v => v.id === item.id)
    if (findIndex >= 0) {
      const [tmp] = tmpArr.splice(findIndex,1)
      tmpArr.splice(findIndex,0,{...tmp,ssh_status: item.status})
      return tmpArr
    } else {
      return [...nodes,{id: item.id, ssh_status: item.status, vnc_status: undefined}]
    }

    
  },
  target: $nodesState
})

// sample({
//   clock: checkSSHFx.doneData,
//   source: $sshList,
//   fn: (store, port) => {
//     const newStore = store.filter((p) => p.ip !== port.ip)
//     newStore.push(port)
//     return newStore
//   },
//   target: $sshList,
// })

// sample({
//   clock: getComputersFx.doneData,
//   fn: (computers) => computers.map((cmp) => cmp.ip),
//   target: checkVNCForAllNodesFx,
// })

// sample({
//   clock: getComputersFx.doneData,
//   fn: (computers) => computers.map((cmp) => cmp.ip),
//   target: checkSSHForAllNodesFx,
// })

// sample({
//   source: { computers: $computers, ssh: $sshList, vnc: $vncList },
//   fn: ({ computers, ssh, vnc }): NodesState => {
//     const list = computers?.map((cmp) => {
//       const node_name = cmp.node_name
//       const ipList = cmp.ip.split(', ')
//       const vncStates = ipList
//         .map((ip) => vnc.find((v) => v.ip === ip))
//         .filter((status) => status !== undefined)

//       const sshStates = ipList
//         .map((ip) => ssh.find((s) => s.ip === ip))
//         .filter((status) => status !== undefined)

//       const states = [...vncStates, ...sshStates]
//       const status: 'online' | 'offline' | undefined =
//         states.length > 0
//           ? states.find((s) => s?.status === 'online') !== undefined
//             ? 'online'
//             : 'offline'
//           : undefined

//       return { node_name, status }
//     })

//     return list ?? []
//   },
//   target: $nodesState,
// })

// sample({
//   clock: refreshStatuses,
//   source: $computers,
//   fn: (computers) => (computers ? computers.map((cmp) => cmp.ip) : []),
//   target: [checkVNCForAllNodesFx, checkSSHForAllNodesFx],
// })
