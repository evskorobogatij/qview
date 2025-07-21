import { sample } from 'effector'
import {
  $ipListTrace,
  connectBySSH,
  connectBySSHFx,
  connectByVNC,
  connectByVNCFx,
  hideTracertMenu,
  showTracertMenu,

} from '.'

sample({
  clock: connectByVNC,
  target: connectByVNCFx,
})

sample({
  clock: connectBySSH,
  target: connectBySSHFx,
})




sample({
  clock: showTracertMenu,
  target: $ipListTrace
})

sample({
  clock: hideTracertMenu,
  fn: () => [],
  target: $ipListTrace
})