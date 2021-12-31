import { Player } from './types'
import { wss } from './index'
export default async (winner: Player) => {
  console.log(winner)
  
  wss.clients.forEach(socket => {
    if (winner === 'left') {
      socket.send('right')
    }
    if (winner === 'right') {
      socket.send('left')
    }
  })
}