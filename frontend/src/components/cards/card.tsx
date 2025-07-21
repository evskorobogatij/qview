import clsx from 'clsx'

interface CardProps {
  name: string
  count: number
  type: 'primary' | 'error' | 'default'
}

export const Card = ({ name, count, type }: CardProps): JSX.Element => {
  return (
    <div
      className={clsx(
        'm-2 mb-4 flex h-28 min-w-[160px] flex-col gap-2 rounded-lg border bg-white p-2 text-5xl font-extrabold transition-all shadow-none hover:text-6xl hover:shadow-md',
        type === 'primary'
          ? 'border-green-600 text-green-600  hover:shadow-green-600/50'
          : type === 'error'
            ? 'border-red-600 text-red-600 hover:shadow-red-600/60'
            : 'border-blue-600 text-blue-600 hover:shadow-blue-600/60'
      )}
    >
      <div className="w-full text-left text-sm font-semibold">{name}</div>
      <div className="flex w-full flex-1 flex-col justify-center">
        <div className="w-full text-right">{count}</div>
      </div>
    </div>
  )
}
