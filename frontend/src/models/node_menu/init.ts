import { sample } from 'effector'
import {
  $ipList,
  $ipListSSH,
  hideSSHMenu,
  hideVNCMenu,
  showSSHMenu,
  showVNCMenu,
} from '.'

sample({
  clock: showVNCMenu,
  target: $ipList,
})

sample({
  clock: hideVNCMenu,
  fn: () => [],
  target: $ipList,
})

sample({
  clock: showSSHMenu,
  target: $ipListSSH,
})

sample({
  clock: hideSSHMenu,
  fn: () => [],
  target: $ipListSSH,
})
