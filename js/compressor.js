const myAudio = document.querySelector('audio');
const compPre = document.querySelector('#compressor-controls');
const myScript = document.querySelector('script');
const button = document.querySelector('#comp-button');
let audioCtx;

compPre.innerHTML = myScript.innerHTML;

myAudio.addEventListener('play', () => {
  if(!audioCtx) {
    // Set up AudioContext
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();

    // Create a MediaElementAudioSourceNode
    // Feed the HTMLMediaElement into it
    const source = audioCtx.createMediaElementSource(myAudio);

    // Create a compressor node
    const compressor = audioCtx.createDynamicsCompressor();
    compressor.threshold.value = -50;
    compressor.knee.value = 40;
    compressor.ratio.value = 12;
    compressor.attack.value = 0;
    compressor.release.value = 0.25;


    // connect the AudioBufferSourceNode to the destination
    source.connect(audioCtx.destination);

    button.onclick = function() {
      const active = button.getAttribute('data-active');
      if(active === 'false') {
        button.setAttribute('data-active', 'true');
        button.innerHTML = 'Remove compression';

        source.disconnect(audioCtx.destination);
        source.connect(compressor);
        compressor.connect(audioCtx.destination);
      } else if(active === 'true') {
        button.setAttribute('data-active', 'false');
        button.innerHTML = 'Add compression';

        source.disconnect(compressor);
        compressor.disconnect(audioCtx.destination);
        source.connect(audioCtx.destination);
      }
    }
  }
})
