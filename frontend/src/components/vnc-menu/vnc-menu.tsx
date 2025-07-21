import { useEvent, useStore } from 'effector-react'
import { useCallback } from 'react'
import { connectByVNC } from '@/models/connections'
import { $ipList, hideVNCMenu } from '@/models/node_menu'

export const VNCMenu = (): JSX.Element => {
  const hide = useEvent(hideVNCMenu)
  const hideMenu = useCallback(() => hide(), [hide])

  const handleConnectByVNC = useEvent(connectByVNC)

  const ipList = useStore($ipList)

  const onClickInMenu = useCallback(
    (ip: string) => {
      hideMenu()
      handleConnectByVNC(ip)
    },
    [handleConnectByVNC, hideMenu]
  )

  return (
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
  )
}
