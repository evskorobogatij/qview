import { sample } from 'effector'
import { $ipList, hideVNCMenu, showVNCMenu } from '.'

sample({
  clock: showVNCMenu,
  target: $ipList,
})

sample({
  clock: hideVNCMenu,
  fn: () => [],
  target: $ipList,
})
