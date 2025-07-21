import { sample } from 'effector'
import {
  $tracerouteTarget,
  $tracing,
  $tracingHistory,
  $tracingWindowShow,
  hideTraceRouteView,
  nextHopInfo,
  startTraceroute,
  tracerouteFx,
  tracingDone,
} from '.'

sample({
  clock: startTraceroute,
  target: tracerouteFx,
})

sample({
  clock: startTraceroute,
  // filter: (d) => d!=='',
  fn: (v) => v !== '',
  target: $tracingWindowShow,
})

sample({
  clock: startTraceroute,
  target: $tracerouteTarget,
})

sample({
  clock: startTraceroute,
  fn: () => true,
  target: $tracing,
})

sample({
  clock: tracingDone,
  fn: () => false,
  target: $tracing,
})

sample({
  clock: startTraceroute,
  fn: () => [],
  target: $tracingHistory,
})

sample({
  clock: nextHopInfo,
  source: $tracingHistory,
  fn: (history, info) => [...history, info],
  target: $tracingHistory,
})

sample({
  clock: hideTraceRouteView,
  source: $tracing,
  filter: (tracing) => !tracing,
  // filter: (show) => show,
  fn: () => false,
  target: $tracingWindowShow,
})
