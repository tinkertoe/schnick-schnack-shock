import { CustomMobileNet } from '@teachablemachine/image'
import evaluate from './evaluate'
import { Gesture } from './types'

const minProbability = 0.99

export default async (model: CustomMobileNet, video: HTMLVideoElement) => {
  // create canvas for frame splitting
  const canvas = document.createElement('canvas')
  canvas.width = video.width
  canvas.height = video.height

  // draw frame from video
  const ctx = canvas.getContext('2d')
  ctx.drawImage(video, 0, 0)

  // split frame in left and right
  const leftImageData = ctx.getImageData(0, 0, Math.floor(canvas.width/2), canvas.height)
  const rightImageData = ctx.getImageData(Math.floor(canvas.width/2), 0, Math.floor(canvas.width/2), canvas.height)

  // run inference, get predictions
  const leftPredictions = await model.predict(await createImageBitmap(leftImageData))
  const rightPredictions = await model.predict(await createImageBitmap(rightImageData))

  // determine most likely case for left side
  let leftPrediction: Gesture
  let leftPredictionProbability = 0

  leftPredictions.forEach(prediction => {
    if (prediction.probability > leftPredictionProbability) {
      leftPrediction = prediction.className as Gesture
      leftPredictionProbability = prediction.probability
    }
  })

  // determine most likely case for right side
  let rightPrediction: Gesture
  let rightPredictionProbability = 0

  rightPredictions.forEach(prediction => {
    if (prediction.probability > rightPredictionProbability) {
      rightPrediction = prediction.className as Gesture
      rightPredictionProbability = prediction.probability
    }
  })

  // does this free memory? hm?
  canvas.remove()

  console.log(`left: ${leftPrediction} (${leftPredictionProbability})`)
  console.log(`right: ${rightPrediction} (${rightPredictionProbability})`)

  if (leftPredictionProbability >= minProbability && rightPredictionProbability >= minProbability) {
    evaluate({
      left: leftPrediction,
      right: rightPrediction
    })
  }

}