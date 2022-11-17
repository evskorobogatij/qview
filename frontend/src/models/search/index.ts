import { createStore, createEvent, createEffect } from 'effector'
import { debounce } from 'patronum/debounce'
import { main } from '../../../wailsjs/go/models'

interface ComputersSearchProps {
  search: string
  computers: main.ComputerItem[] | null
}

export const $search = createStore<string>('')
export const searchChanged = createEvent<string>()
export const performSearch = debounce({ source: searchChanged, timeout: 500 })

export const $searchRegExp = createStore(new RegExp('','gi'))

export const searchFx = createEffect(
  ({ search, computers }: ComputersSearchProps) => {
    const data = computers?.filter(
      (computer) =>
        computer.node_name.toUpperCase().includes(search.toUpperCase()) ||
        computer.serialnumber.toUpperCase().includes(search.toUpperCase()) ||
        computer.ip.toUpperCase().includes(search.toUpperCase()) ||
        computer.fio_user.toUpperCase().includes(search.toUpperCase())
    )
    return data ?? []
  }  
)

export const $searching = searchFx.pending.map((pending) => pending)

export const $findedComputers = createStore<main.ComputerItem[] | null>(null)