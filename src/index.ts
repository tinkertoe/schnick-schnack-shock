import * as tf from '@tensorflow/tfjs'
import * as tmImage from '@teachablemachine/image'

window.onload = async () => {

  const constrains: MediaStreamConstraints = {
    audio: false,
    video: {
      width: 1920,
      height: 1080,
      frameRate: 60,
    }
  }

  const userMedia = await navigator.mediaDevices.getUserMedia(constrains)

  const video = document.getElementById('video') as HTMLVideoElement
  video.width = userMedia.getVideoTracks()[0].getSettings().width
  video.height = userMedia.getVideoTracks()[0].getSettings().height
  video.srcObject = userMedia

  const canvas = document.createElement('canvas')
  canvas.width = video.width
  canvas.height = video.height

  const ctx = canvas.getContext('2d')

  const model = await tmImage.loadFromFiles()
  
  
  
  const loop = setInterval(() => {
    
  }, 500)


}