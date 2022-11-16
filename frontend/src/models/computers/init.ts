import { sample } from 'effector'
import { $computers, getComputersFx } from '.'
import { loadSettingsFx } from '../settings'

sample({
  clock: loadSettingsFx.done,
  target: getComputersFx,
})


sample({
  clock: getComputersFx.doneData,
  target: $computers
})