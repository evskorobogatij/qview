import { createStore, createEvent } from 'effector'

export const $ipList = createStore<Array<string>>([])

export const $activeVNCMenu = $ipList.map((list) => list.length > 0)
export const showVNCMenu = createEvent<Array<string>>()
export const hideVNCMenu = createEvent()
