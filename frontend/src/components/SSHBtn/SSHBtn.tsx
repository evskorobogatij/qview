import { clsx } from 'clsx'
import { connectBySSH } from '../../models/connections'
import { useEvent } from 'effector-react'
import { useCallback, useMemo, useState } from 'react'

interface SSHBtnProps {
  ip: string
  hovered: boolean
}

export const SSHBtn = ({ ip, hovered }: SSHBtnProps): JSX.Element => {
  const handleConnectBySSH = useEvent(connectBySSH)
  const onClick = useCallback(() => {
    handleConnectBySSH(ip)
  }, [ip, handleConnectBySSH])

  const ipList = useMemo(() => ip.split(', '), [ip])

  const [activeMenu, setActiveMenu] = useState(false)

  const showMenu = useCallback(() => setActiveMenu(true), [])
  const hideMenu = useCallback(() => setActiveMenu(false), [])

  const onClickInMenu = useCallback(
    (ip: string) => {
      hideMenu()
      handleConnectBySSH(ip)
    },
    [handleConnectBySSH, hideMenu]
  )

  return (
    <>
      {ipList.length === 1 ? (
        <button
          className={clsx(
            'rounded-lg border border-green-800 bg-white px-3 py-2 text-xs font-medium text-green-800 transition duration-300 ease-in-out hover:bg-green-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800',
            hovered ? 'opacity-100' : 'opacity-0'
          )}
          onClick={onClick}
        >
          SSH
        </button>
      ) : (
        <>
          <button
            onClick={showMenu}
            className={clsx(
              'rounded-lg border border-green-800 bg-white px-3 py-2 text-xs font-medium text-green-800 transition duration-300 ease-in-out hover:bg-green-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800',
              hovered ? 'opacity-100' : 'opacity-0'
            )}
          >
            SSH
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
