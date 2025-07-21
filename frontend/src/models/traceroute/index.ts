import { createEffect, createEvent, createStore } from 'effector'
import { EventsOn } from '../../../wailsjs/runtime/runtime'
import { CheckPath } from '../../../wailsjs/go/main/Traceroute'
import { main } from '../../../wailsjs/go/models'
import { debug } from 'patronum'

export const $tracerouteTarget = createStore('')
export const $tracingWindowShow = createStore(false)

export const startTraceroute = createEvent<string>()
export const tracerouteFx = createEffect(async (host: string) => {
  await CheckPath(host)
})

export const $tracing = createStore(false,{name:'is tracing now'})
export const tracingDone = createEvent()

export const nextHopInfo = createEvent<main.Result>()
export const $tracingHistory = createStore<Array<main.Result>>([])

export const hideTraceRouteView = createEvent({ name: 'hideTraceRouteView' })

EventsOn('startTracert', (data: main.TracertedNode) => {
  console.log('start traceroute', data)
})

EventsOn('nextHopInfo', (data: main.Result) => {
  console.log('tracert hop', data)
  nextHopInfo(data)
})

EventsOn('nextHopFail', (data: main.Result) => {
  console.log('tracert hop', data)
  nextHopInfo(data)
})

EventsOn('doneTracert', () => {
  console.log('tracert done')
  tracingDone()
})

debug(hideTraceRouteView)
debug($tracing)