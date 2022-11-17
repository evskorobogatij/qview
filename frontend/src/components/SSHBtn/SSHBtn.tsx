import { clsx } from 'clsx'
import { connectBySSH } from '../../models/connections'
import { useEvent } from 'effector-react'
import { useCallback } from 'react'

interface SSHBtnProps {
  ip: string
  hovered: boolean
}

export const SSHBtn = ({ ip, hovered }: SSHBtnProps): JSX.Element => {
  const handleConnectBySSH = useEvent(connectBySSH)
  const onClick = useCallback(() => {
    handleConnectBySSH(ip)
  }, [ip, handleConnectBySSH])
  return (
    <button
      className={clsx(
        'rounded-lg border border-green-800 bg-white px-3 py-2 text-xs font-medium text-green-800 transition duration-300 ease-in-out hover:bg-green-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800',
        hovered ? 'opacity-100' : 'opacity-0'
      )}
      onClick={onClick}
    >
      SSH
    </button>
  )
}
