let start = document.getElementById('btnStart');
let stop = document.getElementById('btnStop');
let output = document.getElementById("output")
let singleBlob;

async function recordScreen() { 
    const mimeType = 'video/webm';  
    const displayStream = await navigator.mediaDevices.getDisplayMedia({video: true, audio: true}); 
    const voiceStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false }); 
    let tracks = [...displayStream.getTracks(), ...voiceStream.getAudioTracks()] 
    const stream = new MediaStream(tracks); 
    handleRecord({stream, mimeType}) 
    window.alert("recordScreen Started")
}
recordScreen()

const handleRecord = function ({stream, mimeType}) {          
    const mediaRecorder = new MediaRecorder(stream);
    start.addEventListener('click', (ev)=>{
        if(mediaRecorder.state === "inactive"){
        mediaRecorder.start();
        window.alert("start Event")
        }
    })
    stop.addEventListener('click', (ev)=>{
        if(mediaRecorder.state === "recording" ){
            mediaRecorder.stop();
            window.alert("Stop Event")
        }
    });    
    mediaRecorder.ondataavailable = function (e) {     
        if (e.data.size > 0) {       
            singleBlob = e.data
            window.alert("onAvailabe")
        }        
    };   
    mediaRecorder.onstop = function () {      
        let videoURL = window.URL.createObjectURL(singleBlob);
        let videoEl = document.createElement("video") 
        videoEl.setAttribute("controls","")
        videoEl.src = videoURL;
        output.appendChild(videoEl)
        window.alert("onStop")
    };  
};