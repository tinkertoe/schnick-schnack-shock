async function getCameraStream() {
    const userMedia = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
    });
    return userMedia.getVideoTracks()[0];
}
getCameraStream().then((mediaStream)=>{
    console.log(mediaStream);
}).catch((err)=>{
    console.log(err);
});

//# sourceMappingURL=index.fb5312c9.js.map
