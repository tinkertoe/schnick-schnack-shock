import shock from './shock'
import { Predictions, Player } from './types'


export default async (predictions: Predictions) => {
  const gestures = [predictions.left, predictions.right]
  const gesturePlayers: Player[] = ['left', 'right']

  if (gestures.includes('rock') && gestures.includes('paper')) {
    shock(gesturePlayers[gestures.indexOf('paper')])
  }

  if (gestures.includes('rock') && gestures.includes('scissors')) {
    shock(gesturePlayers[gestures.indexOf('rock')])
  }

  if (gestures.includes('paper') && gestures.includes('scissors')) {
    shock(gesturePlayers[gestures.indexOf('scissors')])
  }
}