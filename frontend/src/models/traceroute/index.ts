import { createEffect, createEvent, createStore } from 'effector'
import { EventsOn } from '@wails/runtime/runtime'
import { CheckPath } from '@wails/go/traceroute/Traceroute'
import { traceroute } from '@wails/go/models'
import { debug } from 'patronum'

export const $tracerouteTarget = createStore('')
export const $tracingWindowShow = createStore(false)

export const startTraceroute = createEvent<string>()
export const tracerouteFx = createEffect(async (host: string) => {
  await CheckPath(host)
})

export const $tracing = createStore(false,{name:'is tracing now'})
export const tracingDone = createEvent()

export const nextHopInfo = createEvent<traceroute.Result>()
export const $tracingHistory = createStore<Array<traceroute.Result>>([])

export const hideTraceRouteView = createEvent({ name: 'hideTraceRouteView' })

EventsOn('startTracert', (data: traceroute.TracertedNode) => {
  console.log('start traceroute', data)
})

EventsOn('nextHopInfo', (data: traceroute.Result) => {
  console.log('tracert hop', data)
  nextHopInfo(data)
})

EventsOn('nextHopFail', (data: traceroute.Result) => {
  console.log('tracert hop', data)
  nextHopInfo(data)
})

EventsOn('doneTracert', () => {
  console.log('tracert done')
  tracingDone()
})

debug(hideTraceRouteView)
debug($tracing)