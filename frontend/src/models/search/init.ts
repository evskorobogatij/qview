import { sample } from 'effector'
import { $search, performSearch, searchChanged, searchFx } from '.'

sample({
  clock: searchChanged,
  target: $search,
})

sample({
  clock: performSearch,
  source: $search,
  target: searchFx,
})
