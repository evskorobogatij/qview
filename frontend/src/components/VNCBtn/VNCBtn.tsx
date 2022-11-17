import React from 'react'
import { clsx } from 'clsx'
import { connectByVNC } from '../../models/connections'
import { useEvent } from 'effector-react'
import { useCallback, useMemo, useState } from 'react'

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

  const [activeMenu, setActiveMenu] = useState(false)

  const showMenu = useCallback(() => setActiveMenu(true), [])
  const hideMenu = useCallback(() => setActiveMenu(false), [])

  const onClickInMenu = useCallback(
    (ip: string) => {
      hideMenu()
      handleConnectByVNC(ip)
    },
    [handleConnectByVNC, hideMenu]
  )

  return (
    <>
      {ipList.length === 1 ? (
        <button
          className={clsx(
            'rounded-lg border border-blue-800 bg-white px-3 py-2 text-xs font-medium text-blue-800 transition duration-300 ease-in-out hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
            hovered ? 'opacity-100' : 'opacity-0'
          )}
          onClick={onClick}
        >
          VNC
        </button>
      ) : (
        <>
          <button
            onClick={showMenu}
            className={clsx(
              'rounded-lg border border-blue-800 bg-white px-3 py-2 text-xs font-medium text-blue-800 transition duration-300 ease-in-out hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
              hovered ? 'opacity-100' : 'opacity-0'
            )}
          >
            VNC
          </button>
          {activeMenu && (
            <>
              <div
                onClick={hideMenu}
                className="fixed top-0 left-0 bottom-0 right-0 z-[1000] flex w-full items-center justify-center bg-slate-500 bg-opacity-50"
              >
                <div className="z-[1010] mt-1 block w-72 min-w-[15rem] rounded-lg bg-white p-4 opacity-100  shadow-md">
                  <div className="py-2 text-sm font-medium">
                    Выберите адрес для подключения
                  </div>
                  {ipList.map((ip) => (
                    <a
                      key={ip}
                      onClick={() => onClickInMenu(ip)}
                      className="flex cursor-pointer items-center gap-x-3.5 rounded-md py-2 px-3 text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                    >
                      {ip}
                    </a>
                  ))}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  )
}
