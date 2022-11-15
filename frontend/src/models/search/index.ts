import { createStore, createEvent, createEffect } from 'effector'
import { debounce } from 'patronum/debounce'

export const $search = createStore<string>('')
export const searchChanged = createEvent<string>()
export const performSearch = debounce({ source: searchChanged, timeout: 500 })

export const searchFx = createEffect((search: string) => {
  //
})

export const searching = searchFx.pending.map((pending) => pending)
