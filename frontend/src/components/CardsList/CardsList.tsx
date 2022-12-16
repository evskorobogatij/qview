import { useStore } from 'effector-react'
import { $nodesCount } from '../../models/computers'
import { $availableCount, $unavailableCount } from '../../models/ports'
import { Card } from '../Card/Card'

export const CardsList = (): JSX.Element => {
  const availableCount = useStore($availableCount)
  const nodesCount = useStore($nodesCount)
  const unavailableCount = useStore($unavailableCount)
  return (
    <div className="flex flex-row flex-wrap">
      <Card count={nodesCount} name={'Всего'} type={'default'} />
      <Card count={availableCount} name={'Доступно'} type={'primary'} />
      <Card count={unavailableCount} name={'Недоступно'} type={'error'} />
    </div>
  )
}
