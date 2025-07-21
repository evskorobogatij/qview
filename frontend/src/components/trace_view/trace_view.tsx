import { useEvent, useStore } from 'effector-react'
import {
  $tracerouteTarget,
  $tracing,
  $tracingHistory,
  hideTraceRouteView,
} from '@/models/traceroute'

export const TraceView = () => {
  const target = useStore($tracerouteTarget)
  const tracing = useStore($tracing)
  const tracingHistory = useStore($tracingHistory)
  const hideTraceView = useEvent(hideTraceRouteView)
  // const hideMenu  =

  return (
    <div
      onClick={hideTraceView}
      className="fixed top-0 left-0 bottom-0 right-0 z-[1000] flex w-full items-center justify-center bg-slate-500 bg-opacity-50"
    >
      <div className="mt-1 block h-5/6 w-10/12 min-w-[15rem] rounded-lg bg-white p-4  opacity-100">
        <div className="flex flex-row items-center gap-1">
          <div className="py-2 text-sm font-medium">
            Трассируем маршрут к {target}
          </div>
          {tracing && (
            <span className="h-6 w-6 text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                <rect
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-width="15"
                  width="30"
                  height="30"
                  x="25"
                  y="85"
                >
                  <animate
                    attributeName="opacity"
                    calcMode="spline"
                    dur="2"
                    values="1;0;1;"
                    keySplines=".5 0 .5 1;.5 0 .5 1"
                    repeatCount="indefinite"
                    begin="-.4"
                  ></animate>
                </rect>
                <rect
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-width="15"
                  width="30"
                  height="30"
                  x="85"
                  y="85"
                >
                  <animate
                    attributeName="opacity"
                    calcMode="spline"
                    dur="2"
                    values="1;0;1;"
                    keySplines=".5 0 .5 1;.5 0 .5 1"
                    repeatCount="indefinite"
                    begin="-.2"
                  ></animate>
                </rect>
                <rect
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-width="15"
                  width="30"
                  height="30"
                  x="145"
                  y="85"
                >
                  <animate
                    attributeName="opacity"
                    calcMode="spline"
                    dur="2"
                    values="1;0;1;"
                    keySplines=".5 0 .5 1;.5 0 .5 1"
                    repeatCount="indefinite"
                    begin="0"
                  ></animate>
                </rect>
              </svg>
            </span>
          )}
        </div>

        <div
          className="overflow-y-auto"
          style={{ height: 'calc(100% - 50px)' }}
        >
          {tracingHistory.map((item) => (
            <div key={item.HOP} className="flex flex-row gap-2">
              <span className="w-8 font-semibold">{item.HOP}</span>
              <span className="w-32">{item.IP}</span>
              <span className="">{item.TimeElapsedMS.toFixed(1)} ms</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
