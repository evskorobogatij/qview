import clsx from 'clsx'
import { useEvent } from 'effector-react'
import { showTracertMenu } from '../../models/connections'
import { useCallback, useMemo } from 'react'
import { startTraceroute } from '../../models/traceroute'

interface TraceBtnProps {
  ip: string
  hovered: boolean
}

export const TraceBtn = ({ hovered, ip }: TraceBtnProps) => {
  const handleStartTraceroute = useEvent(startTraceroute)
  const onClick = useCallback(() => {
    handleStartTraceroute(ip)
  }, [ip, handleStartTraceroute])

  const ipList = useMemo(() => ip.split(', '), [ip])
  const showMenu = useEvent(showTracertMenu)

  const handleShowMenu = useCallback(() => {
    showMenu(ipList)
  }, [ipList, showMenu])

  return (
    <div
      className={clsx(
        'mx-1 cursor-pointer rounded-lg border border-red-800 bg-white px-2 py-1 text-red-700 ',
        'transition duration-300 ease-in-out',
        'hover:bg-red-700 hover:text-white',
        hovered ? 'opacity-100' : 'opacity-0'
      )}
      onClick={ipList.length === 1 ? onClick : handleShowMenu}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="lucide lucide-waypoints-icon lucide-waypoints"
      >
        <circle cx="12" cy="4.5" r="2.5" />
        <path d="m10.2 6.3-3.9 3.9" />
        <circle cx="4.5" cy="12" r="2.5" />
        <path d="M7 12h10" />
        <circle cx="19.5" cy="12" r="2.5" />
        <path d="m13.8 17.7 3.9-3.9" />
        <circle cx="12" cy="19.5" r="2.5" />
      </svg>
    </div>
  )
}
