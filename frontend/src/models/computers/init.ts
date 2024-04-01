import { sample } from 'effector'
import { not } from 'patronum'
import { $computers, $loadingComputers, checkSSHForAllNodes, checkSSHForAllNodesFx, checkVNCForAllNodes, checkVNCForAllNodesFx, getComputersFx } from '.'
import { loadSettingsFx } from '../settings'

sample({
  clock: loadSettingsFx.done,
  filter: not($loadingComputers),
  target: getComputersFx,
})


sample({
  clock: getComputersFx.doneData,
  target: $computers
})


sample({
  clock: checkVNCForAllNodes,
  target: checkVNCForAllNodesFx
})

sample({
  clock: checkSSHForAllNodes,
  target: checkSSHForAllNodesFx
})

sample({
  clock: getComputersFx.doneData,
  target: [checkVNCForAllNodes, checkSSHForAllNodes]
})