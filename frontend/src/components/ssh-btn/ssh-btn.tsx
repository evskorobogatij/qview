import { clsx } from 'clsx'
import { connectBySSH } from '@/models/connections'
import { useUnit } from 'effector-react'
import { useCallback, useMemo } from 'react'
import { showSSHMenu } from '@/models/node_menu'

interface SSHBtnProps {
  ip: string
  hovered: boolean
}

export const SSHBtn = ({ ip, hovered }: SSHBtnProps): JSX.Element => {
  const handleConnectBySSH = useUnit(connectBySSH)
  const onClick = useCallback(() => {
    handleConnectBySSH(ip)
  }, [ip, handleConnectBySSH])

  const ipList = useMemo(() => ip.split(', '), [ip])
  const showMenu = useUnit(showSSHMenu)

  const handleShowMenu = useCallback(() => {
    showMenu(ipList)
  }, [ipList, showMenu])

  return (
    <>
      <button
        className={clsx(
          'mx-1 rounded-lg border border-green-800 bg-white px-2 py-1 text-xs font-medium text-green-800 transition duration-300 ease-in-out hover:bg-green-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800',
          hovered ? 'opacity-100' : 'opacity-0'
        )}
        onClick={ipList.length === 1 ? onClick : handleShowMenu}
      >
        SSH
      </button>      
    </>
  )
}
