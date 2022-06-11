let start = document.getElementById('btnStart');
let stop = document.getElementById('btnStop');
let output = document.getElementById("output")
let h1 = document.getElementById("head")
let singleBlob;

async function recordScreen() { 
    const mimeType = 'video/webm'; 
    let stream;
    const displayStream = await navigator.mediaDevices.getDisplayMedia({video: {width : 640 , height : 480}, audio: false}); 
    let ask = confirm("Record Voice?")
    if(ask){
        const voiceStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false }); 
        let tracks = [...displayStream.getTracks(), ...voiceStream.getAudioTracks()] 
        stream = new MediaStream(tracks);
    }else{
        stream = displayStream
    }
    handleRecord({stream, mimeType})
}
recordScreen()

const handleRecord = function ({stream, mimeType}) {          
    const mediaRecorder = new MediaRecorder(stream);
    start.addEventListener('click', (ev)=>{
        if(mediaRecorder.state === "inactive"){
        mediaRecorder.start();
        h1.textContent = "Recording the Screen Now...."
        h1.style.color = "green"
        }
    })
    stop.addEventListener('click', (ev)=>{
        if(mediaRecorder.state === "recording" ){
            mediaRecorder.stop();
            h1.textContent = "not Recording the Screen"
            h1.style.color = "red"
        }
    });    
    mediaRecorder.ondataavailable = function (e) {     
        if (e.data.size > 0) {       
            singleBlob = e.data
        }        
    };   
    mediaRecorder.onstop = function () {      
        let videoURL = window.URL.createObjectURL(singleBlob);
        let videoEl = document.createElement("video") 
        videoEl.setAttribute("controls","")
        videoEl.src = videoURL;
        output.appendChild(videoEl)
    };  
};