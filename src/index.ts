import * as tf from '@tensorflow/tfjs'
import { load as loadModel } from '@teachablemachine/image'
import { WebSocketServer, WebSocket } from 'ws'

import camera from './camera'
import inference from './inference'

const inferenceDelay = 250
const port = 18769

window.onload = async () => {

  const video = await camera()
  const model = await loadModel('./model/model.json', './model/metadata.json')
  const wss = new WebSocketServer({ port })

  setInterval(() => {
    inference(model, video)
  }, inferenceDelay)
}