import { useStore, useEvent } from 'effector-react'
import { useState, useCallback } from 'react'
import { clsx } from 'clsx'
import { $findedComputers, $searchRegExp } from '../../models/search'
import { connectBySSH, connectByVNC } from '../../models/connections'

export const ComputersList = (): JSX.Element => {
  const computers = useStore($findedComputers)
  const [curretPC, setCurrentPC] = useState<string>('')
  const searchRegExp = useStore($searchRegExp)

  const handleConnectByVNC = useEvent(connectByVNC)
  const handleConnectBySSH = useEvent(connectBySSH)

  return (
    <>
      <div className="relative m-2 h-fit max-w-full overflow-x-auto overscroll-y-auto rounded-lg border-2 border-gray-300 shadow-md">
        <table className="w-full border-collapse border-slate-400  text-sm">
          <thead className="sticky top-0 z-[1000] h-8 rounded-tl-lg rounded-tr-lg bg-slate-200 bg-fixed text-xs uppercase">
            <tr>
              <th
                scope="col"
                className="sticky top-0 flex w-80  whitespace-nowrap  rounded-tl-lg py-4 px-6"
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
                className="sticky top-0 w-80 whitespace-nowrap border-r border-slate-400 py-4  px-6"
              >
                Подразделение
              </th>
              <th
                scope="col"
                className="sticky top-0 w-80  whitespace-nowrap border-r border-slate-400 py-4  px-6"
              >
                Кабинет
              </th>
              <th
                scope="col"
                className="sticky top-0 w-96 whitespace-nowrap rounded-tr-lg py-4  px-6"
              >
                Подключения
              </th>
            </tr>
          </thead>
          <tbody className="  bg-slate-200">
            {computers?.map((cmp) => (
              <tr
                key={cmp.id}
                className={
                  'z-10 border-b border-slate-400 bg-gray-100 transition duration-300 ease-in-out hover:bg-gray-200'
                }
                onMouseEnter={() => setCurrentPC(cmp.id)}
                onMouseLeave={() => setCurrentPC('')}
              >
                <td className="sticky z-50 py-2 px-4">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: cmp.node_name.replace(
                        searchRegExp,
                        '<mark class="bg-blue-500 text-white">$&</mark>'
                      ),
                    }}
                  ></span>
                  {}
                </td>
                <td className="py-2 px-4">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: cmp.serialnumber.replace(
                        searchRegExp,
                        '<mark class="bg-blue-500 text-white">$&</mark>'
                      ),
                    }}
                  />
                </td>
                <td className="py-2 px-4">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: cmp.ip.replace(
                        searchRegExp,
                        '<mark class="bg-blue-500 text-white">$&</mark>'
                      ),
                    }}
                  />
                </td>
                <td className="text-ellipsis whitespace-nowrap py-2 px-4">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: cmp.fio_user.replace(
                        searchRegExp,
                        '<mark class="bg-blue-500 text-white">$&</mark>'
                      ),
                    }}
                  />
                </td>
                <td className="py-2 px-4">{cmp.user_phone}</td>
                <td className="py-2 px-4">{cmp.department}</td>
                <td className="py-2 px-4">{cmp.room}</td>
                <td className="py-2 px-4">
                  <div className="flex gap-2 ">
                    <button
                      className={clsx(
                        'rounded-lg border border-green-800 bg-white px-3 py-2 text-xs font-medium text-green-800 transition duration-300 ease-in-out hover:bg-green-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800',
                        curretPC === cmp.id ? 'opacity-100' : 'opacity-0'
                      )}
                      onClick={() => handleConnectBySSH(cmp.ip)}
                    >
                      SSH
                    </button>

                    <button
                      className={clsx(
                        'rounded-lg border border-blue-800 bg-white px-3 py-2 text-xs font-medium text-blue-800 transition duration-300 ease-in-out hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
                        curretPC === cmp.id ? 'opacity-100' : 'opacity-0'
                      )}
                      onClick={() => handleConnectByVNC(cmp.ip)}
                    >
                      VNC
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
