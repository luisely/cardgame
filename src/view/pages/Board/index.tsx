import { ConfettiComp } from '../../components/ConfettiComp'
import { BoardProvider } from './components/BoardContext'
import { RulesModal } from './components/CenterBoard/Modals/RulesModal'
import { Layout } from './layout'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export function Board() {
  return (
    <DndProvider backend={HTML5Backend}>
      <BoardProvider>
        <Layout />
        <RulesModal />
        <ConfettiComp />
      </BoardProvider>
    </DndProvider>
  )
}
