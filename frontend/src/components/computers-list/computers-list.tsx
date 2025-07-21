import clsx from 'clsx'
import { useStore } from 'effector-react'
import { useState, useCallback } from 'react'
import { useElementInView } from '@/lib/hooks'
import { $activeSSHMenu, $activeVNCMenu } from '@/models/node_menu'
import { $findedComputers } from '@/models/search'
// import { SSHMenu } from '@components/'
import { SSHMenu } from '@/components/ssh-menu'
import { VNCMenu } from '@/components/vnc-menu'
import { ComputerRowItem } from './computer-row-item'
import { TracertMenu } from '@/components/trace-menu'
import { TraceView } from '@/components//trace_view'
import { $tracingWindowShow } from '@/models/traceroute'
import { $activeTraceMenu } from '@/models/connections'

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
  const activeTracertMenu = useStore($activeTraceMenu)
  const tracingWindowShow = useStore($tracingWindowShow)

  const { containerRef, isVisible: notStrolled } = useElementInView()

  const { containerRef: leftRef, isVisible: notScrolledOnLeft } =
    useElementInView()
  const { containerRef: rightRef, isVisible: notScrolledOnRight } =
    useElementInView()

  return (
    <>
      <div
        className="relative m-2 h-full max-w-full flex-1 overflow-x-auto overscroll-y-auto rounded-lg border-2 border-gray-300 shadow-md 
      transition-all scrollbar-thin scrollbar-track-slate-300/50 scrollbar-thumb-slate-500 scrollbar-track-rounded-full scrollbar-thumb-rounded-full hover:scrollbar-track-slate-300"
      >
        <table className="w-full border-collapse border-slate-400  text-sm ">
          <thead
            className={clsx(
              'sticky top-0 z-[100] h-8 rounded-tl-lg rounded-tr-lg bg-slate-200 bg-fixed text-xs uppercase shadow-slate-500/50 transition-shadow',
              !notStrolled ? 'shadow-lg' : 'shadow-none'
            )}
          >
            <tr>
              <th
                scope="col"
                className="sticky top-0 left-0 z-20 flex w-80 whitespace-nowrap  rounded-tl-lg  bg-slate-200 py-4 px-6"
              >
                Имя компьютера
              </th>
              <div ref={leftRef} className={'sticky w-0'} />
              <th
                scope="col"
                className="sticky top-0 w-80 whitespace-nowrap  py-4  px-6"
              >
                <div>Серийный номер</div>
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
            </tr>
          </thead>
          <tbody className="  bg-slate-200">
            <div className="sticky left-0 h-0" ref={containerRef} />
            {computers?.map((cmp) => (
              <ComputerRowItem
                key={cmp.id}
                {...cmp}
                hovered={curretPC === cmp.id}
                onHovered={handleComputerItemHover}
                onLeave={handleComputerItemLeave}
                notScrolledOnLeft={notScrolledOnLeft}
                notScrolledOnRight={notScrolledOnRight}
              />
            ))}
          </tbody>
        </table>
      </div>

      {activeVNCMenu && <VNCMenu />}
      {activeSSHMenu && <SSHMenu />}
      {activeTracertMenu && <TracertMenu />}
      {tracingWindowShow && <TraceView />}
    </>
  )
}
