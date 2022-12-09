import { useStore } from 'effector-react'
import { useState, useCallback } from 'react'
import { $activeSSHMenu, $activeVNCMenu } from '../../models/node_menu'
import { $findedComputers } from '../../models/search'
import { SSHMenu } from '../SSHMenu'
import { VNCMenu } from '../VNCMenu'
import { ComputerRowItem } from './ComputerRowItem'

export const ComputersList = (): JSX.Element => {
  const computers = useStore($findedComputers)
  const [curretPC, setCurrentPC] = useState<string>('')

  const handleComputerItemHover = useCallback(
    (id: string) => setCurrentPC(id),
    []
  )
  const handleComputerItemLeave = useCallback(() => setCurrentPC(''), [])

  const activeVNCMenu = useStore($activeVNCMenu)
  const activeSSHMenu = useStore($activeSSHMenu)

  return (
    <>
      <div className="relative m-2 h-full max-w-full overflow-x-auto overscroll-y-auto rounded-lg border-2 border-gray-300 shadow-md">
        <table className="w-full border-collapse border-slate-400  text-sm">
          <thead className="sticky top-0 z-[100] h-8 rounded-tl-lg rounded-tr-lg bg-slate-200 bg-fixed text-xs uppercase">
            <tr>
              <th
                scope="col"
                className="sticky top-0 left-0 z-20 flex w-80 whitespace-nowrap  rounded-tl-lg  bg-slate-200 py-4 px-6"
              >
                Имя компьютера
              </th>
              <th
                scope="col"
                className="sticky top-0 w-80 whitespace-nowrap  py-4  px-6"
              >
                Серийный номер
              </th>
              <th
                scope="col"
                className="sticky top-0 w-80 whitespace-nowrap  py-4  px-6"
              >
                IP адрес
              </th>
              <th
                scope="col"
                className="sticky top-0 w-80 whitespace-nowrap  py-4  px-6"
              >
                Пользователь
              </th>
              <th
                scope="col"
                className="sticky top-0 w-80 whitespace-nowrap  py-4  px-6"
              >
                Телефон
              </th>
              <th
                scope="col"
                className="sticky top-0 w-80 whitespace-nowrap border-slate-400 py-4  px-6"
              >
                Подразделение
              </th>
              <th
                scope="col"
                className="sticky top-0 w-80  whitespace-nowrap border-slate-400 py-4  px-6"
              >
                Кабинет
              </th>
              <th
                scope="col"
                className="sticky top-0 right-0 w-96 whitespace-nowrap rounded-tr-lg bg-slate-200 py-4  px-6"
              >
                Подключения
              </th>
            </tr>
          </thead>
          <tbody className="  bg-slate-200">
            {computers?.map((cmp) => (
              <ComputerRowItem
                key={cmp.id}
                {...cmp}
                hovered={curretPC === cmp.id}
                onHovered={handleComputerItemHover}
                onLeave={handleComputerItemLeave}
              />
            ))}
          </tbody>
        </table>
      </div>

      {activeVNCMenu && <VNCMenu />}
      {activeSSHMenu && <SSHMenu />}
    </>
  )
}
