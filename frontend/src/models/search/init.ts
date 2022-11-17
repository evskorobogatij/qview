import { sample } from 'effector'
import {
  $findedComputers,
  $search,
  $searchRegExp,
  performSearch,
  searchChanged,
  searchFx,
} from '.'
import { $computers } from './../computers'

sample({
  clock: searchChanged,
  target: $search,
})

sample({
  clock: [performSearch, $computers.updates],
  source: { search: $search, computers: $computers },
  target: searchFx,
})

sample({
  clock: searchFx.doneData,
  target: $findedComputers,
})

sample({
  clock: performSearch,
  fn: (search) => new RegExp(search, 'gi'),
  target: $searchRegExp,
})
