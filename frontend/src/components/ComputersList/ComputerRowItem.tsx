import { useStore, useEvent } from 'effector-react'
import { main } from '../../../wailsjs/go/models'
import { $sshList, $vncList, checkSSH, checkVNC } from '../../models/ports'
import { $searchRegExp } from '../../models/search'
import { SSHBtn } from '../SSHBtn'
import { VNCBtn } from '../VNCBtn'
import { useCallback, useMemo } from 'react'
import { clsx } from 'clsx'

interface ComputerRowItemProps extends main.ComputerItem {
  onHovered: (id: string) => void
  onLeave: () => void
  hovered: boolean
  notScrolledOnLeft: boolean
  notScrolledOnRight: boolean
}

export const ComputerRowItem = (cmp: ComputerRowItemProps) => {
  const vncStatuses = useStore($vncList)
  const sshStatuses = useStore($sshList)
  const searchRegExp = useStore($searchRegExp)
  const handleCheckVNC = useEvent(checkVNC)

  const handleHovered = useCallback(() => cmp.onHovered(cmp.id), [cmp])
  const handleLeave = useCallback(() => cmp.onLeave, [cmp.onLeave])

  const node_name = useMemo(
    () =>
      searchRegExp.source !== '(?:)'
        ? cmp.node_name.replace(
          searchRegExp,
          '<mark class="bg-blue-500 text-white">$&</mark>'
        )
        : cmp.node_name,
    [cmp.node_name, searchRegExp]
  )

  const serialnumber = useMemo(
    () =>
      searchRegExp.source !== '(?:)'
        ? cmp.serialnumber.replace(
          searchRegExp,
          '<mark class="bg-blue-500 text-white">$&</mark>'
        )
        : cmp.serialnumber,
    [cmp.serialnumber, searchRegExp]
  )

  const ip = useMemo(
    () =>
      searchRegExp.source !== '(?:)'
        ? cmp.ip.replace(
          searchRegExp,
          '<mark class="bg-blue-500 text-white">$&</mark>'
        )
        : cmp.ip,
    [cmp.ip, searchRegExp]
  )

  const fio_user = useMemo(
    () =>
      searchRegExp.source !== '(?:)'
        ? cmp.fio_user.replace(
          searchRegExp,
          '<mark class="bg-blue-500 text-white">$&</mark>'
        )
        : cmp.fio_user,
    [cmp.fio_user, searchRegExp]
  )

  const ipList = useMemo(() => cmp.ip.split(', '), [cmp.ip])
  const statusesForVNC = useMemo(() => {
    const d = ipList
      .map((ip_a) => vncStatuses.find((vnc) => vnc.ip === ip_a))
      .filter((status) => status !== undefined)

    return d
  }, [ipList, vncStatuses])

  const vncStatus = useMemo(
    () =>
      statusesForVNC.length > 0
        ? statusesForVNC.find((s) => s?.status === 'online') !== undefined
          ? 'online'
          : 'offline'
        : undefined,
    [statusesForVNC]
  )

  const statusesForSSH = useMemo(() => {
    const d = ipList
      .map((ip_a) => sshStatuses.find((ssh) => ssh.ip === ip_a))
      .filter((status) => status !== undefined)
    return d
  }, [ipList, sshStatuses])

  const sshStatus = useMemo(
    () =>
      statusesForSSH.length > 0
        ? statusesForSSH.find((s) => s?.status === 'online') !== undefined
          ? 'online'
          : 'offline'
        : undefined,
    [statusesForSSH]
  )

  const status = useMemo(() => {
    if (vncStatus === undefined && sshStatus === undefined) return undefined
    if (vncStatus === 'online' || sshStatus === 'online') return 'online'
    else return 'offline'
  }, [sshStatus, vncStatus])

  const onItemClick = useCallback(() => {
    ipList.forEach((ip) => handleCheckVNC(ip))
    ipList.forEach((ip) => checkSSH(ip))
  }, [handleCheckVNC, ipList])

  return (
    <>
      <tr
        key={cmp.id}
        className={
          'z-10 items-center border-b border-slate-400 bg-gray-100 transition duration-300 ease-in-out hover:bg-gray-200'
        }
        onMouseEnter={handleHovered}
        onMouseLeave={handleLeave}
        onClick={onItemClick}
      >
        <td
          className={clsx(
            cmp.notScrolledOnLeft ? '' : 'br',
            'sticky left-0 bg-inherit py-2 px-4'
          )}
        >
          <div className="flex h-full flex-row">
            <div
              className={clsx(
                'm-2 h-2.5 w-2.5 rounded-2xl ',
                status !== undefined
                  ? status === 'online'
                    ? 'bg-green-600'
                    : 'bg-red-600'
                  : 'bg-gray-600'
              )}
            ></div>

            <div
              dangerouslySetInnerHTML={{
                __html: node_name,
              }}
            ></div>
          </div>
        </td>
        <td className="py-2 px-4">
          <span
            dangerouslySetInnerHTML={{
              __html: serialnumber,
            }}
          />
        </td>
        <td className="py-2 px-4">
          <span
            dangerouslySetInnerHTML={{
              __html: ip,
            }}
          />
        </td>
        <td className="text-ellipsis whitespace-nowrap py-2 px-4">
          <span
            dangerouslySetInnerHTML={{
              __html: fio_user,
            }}
          />
        </td>
        <td className="py-2 px-4">{cmp.user_phone}</td>
        <td className="py-2 px-4">{cmp.department}</td>
        <td className="py-2 px-4">{cmp.room}</td>
        <div className="w-0" />
        <td
          className={clsx(
            cmp.notScrolledOnRight ? '' : 'bl',
            'sticky right-0 bg-inherit py-2 px-4'
          )}
        >
          <div className="flex gap-2 ">
            <SSHBtn ip={cmp.ip} hovered={cmp.hovered} />
            <VNCBtn ip={cmp.ip} hovered={cmp.hovered} />
          </div>
        </td>
      </tr>
    </>
  )
}
