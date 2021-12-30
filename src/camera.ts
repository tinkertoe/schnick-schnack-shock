export default async () => {
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

  return video
}