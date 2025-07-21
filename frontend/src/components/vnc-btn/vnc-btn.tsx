import { clsx } from 'clsx'
import { connectByVNC } from '@/models/connections'
import { useEvent } from 'effector-react'
import { useCallback, useMemo } from 'react'
import { showVNCMenu } from '@/models/node_menu'

interface VNCBtnProps {
  ip: string
  hovered: boolean
}

export const VNCBtn = ({ ip, hovered }: VNCBtnProps): JSX.Element => {
  const handleConnectByVNC = useEvent(connectByVNC)
  const onClick = useCallback(() => {
    handleConnectByVNC(ip)
  }, [ip, handleConnectByVNC])

  const ipList = useMemo(() => ip.split(', '), [ip])
  const showMenu = useEvent(showVNCMenu)

  const handleShowMenu = useCallback(() => {
    showMenu(ipList)
  }, [ipList, showMenu])

  return (
    <>
      <button
        onClick={ipList.length === 1 ? onClick : handleShowMenu}
        className={clsx(
          'rounded-lg border border-blue-800 bg-white px-2 py-1 text-xs font-medium text-blue-800 transition duration-300 ease-in-out hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
          hovered ? 'opacity-100' : 'opacity-0'
        )}
      >
        VNC
      </button>
    </>
  )
}
