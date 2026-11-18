const padBank = document.getElementById("pad-bank")
const drumStick = document.getElementById("drum-stick")
const drumPads = Array.from(document.querySelectorAll(".drum-pad"))
const display = document.getElementById("display")
const powerToggle = document.getElementById("power")
const powerState = document.getElementById("power-state")
const volume = document.getElementById("volume")
const volumeValue = document.getElementById("volume-value")

padBank.addEventListener("mousemove", (e)=>{
    const rect = padBank.getBoundingClientRect()

    drumStick.style.left = `${e.clientX - rect.left}px`
    drumStick.style.top = `${e.clientY - rect.top}px`

    drumStick.classList.add("active")
})
padBank.addEventListener("mouseleave",()=>{
    drumStick.classList.remove("active")
})
powerToggle.addEventListener("change", ()=>{
    powerState.textContent = powerToggle.checked ? "On" : "Off"
})
function updateVolumeBackground(){
    const percentage = Number(volume.value)*100
    volume.style.background = `linear-gradient(to right, #7255d8 ${percentage}%, #ddd ${percentage}%)`
    volumeValue.textContent = `${Math.round(percentage)}%`
}
volume.addEventListener("input", updateVolumeBackground)
updateVolumeBackground()
function playAudio(audio){
    if(powerToggle.checked || audio){
        audio.volume = volume.value
        audio.currentTime = 0
        audio.play()
        const pad = audio.parentElement;
        pad.classList.add("active");
        setTimeout(() => {
            pad.classList.remove("active");
        }, 150);
        display.innerText = pad.id    
    } else{
        
        display.innerText =  "Power off"
    }
}
drumPads.forEach((pad)=>{
    const audio = pad.querySelector("audio")
    pad.addEventListener("click",()=>  playAudio(audio))
})
    
    
document.addEventListener("keydown", (e)=> {

    const audios = drumPads.map((pad)=> pad.querySelector(`audio`))
    const audio = audios.find((a) => a.id === e.key.toUpperCase())
    playAudio(audio)
    
})
    
