import * as tf from '@tensorflow/tfjs'
import { load as loadModel } from '@teachablemachine/image'
import { WebSocketServer, WebSocket } from 'ws'

import camera from './camera'
import inference from './inference'

const inferenceDelay = 250
const port = 18769

export const wss = new WebSocketServer({ port })
wss.on('connection', socket => {
  console.log('New socket', socket)
  socket.on('close', () => {
    console.log('Socket left', socket)
  })
})

window.onload = async () => {
  const video = await camera()
  const model = await loadModel('./model/model.json', './model/metadata.json')

  setInterval(() => {
    inference(model, video)
  }, inferenceDelay)
}
