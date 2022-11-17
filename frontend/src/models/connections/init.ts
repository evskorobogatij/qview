import { sample } from 'effector'
import { connectBySSH, connectBySSHFx, connectByVNC, connectByVNCFx } from '.'

sample({
  clock: connectByVNC,
  target: connectByVNCFx,
})

sample({
  clock: connectBySSH,
  target: connectBySSHFx,
})
