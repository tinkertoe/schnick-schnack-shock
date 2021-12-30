import * as tf from '@tensorflow/tfjs'
import { load as loadModel } from '@teachablemachine/image'

import camera from './camera'
import inference from './inference'

const inferenceDelay = 250

window.onload = async () => {

  const video = await camera()
  const model = await loadModel('./model/model.json', './model/metadata.json')

  setInterval(() => {
    inference(model, video)
  }, inferenceDelay)
}