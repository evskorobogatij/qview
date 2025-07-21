import { useUnit } from 'effector-react'
import { $nodesCount } from '@/models/computers'
import { $availableCount, $unavailableCount } from '@/models/ports'
import { Card } from '@/components/cards'

export const CardsList = (): JSX.Element => {
  const availableCount = useUnit($availableCount)
  const nodesCount = useUnit($nodesCount)
  const unavailableCount = useUnit($unavailableCount)
  return (
    <div className="flex flex-row flex-wrap">
      <Card count={nodesCount} name={'Всего'} type={'default'} />
      <Card count={availableCount} name={'Доступно'} type={'primary'} />
      <Card count={unavailableCount} name={'Недоступно'} type={'error'} />
    </div>
  )
}
