const audioCtx = new (window.AudioContext || window.webkitAudioContext)

// Volume control
const volume = audioCtx.createGain()
volume.connect(audioCtx.destination)

// create the oscillating instruments sinea, sineb, sinec
const sinea = audioCtx.createOscillator()
const sineb = audioCtx.createOscillator()
const sinec = audioCtx.createOscillator()

// sinea instrument
sinea.frequency.value = 440 // A4(?)
sinea.type = "sine"
sinea.start()
sinea.connect(volume)

// sineb instrument
sineb.frequency.value = 523.25 // note?
sineb.type = "sine"
sineb.start()
sineb.connect(volume)

// sinec instrument
sinec.frequency.value = 698.46 // note?
sinec.type = "sine"
sinec.start()
sinec.connect(volume)

// gain value of volume
volume.gain.value=0.2
