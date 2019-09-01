const drumKeys = document.getElementsByClassName("drum-pad");
const volSlider = document.getElementById("volume-slider");
const clips = document.getElementsByClassName("clip")

volSlider.addEventListener("change", ()=>{
    Array.from(clips).forEach(clip => {
        clip.volume =volSlider.value * .01

})
})


Array.from(drumKeys).forEach(key => {
  let audio = key.childNodes[1]
  key.onclick = function() {
    if (audio){
        audio.currentTime =0;

        audio.parentElement.classList.toggle ("playing")

                setTimeout(()=>{
                    audio.parentElement.classList.toggle("playing")

                }, 200)
    audio.play();
    display.innerHTML = key.id;
    }
  };
});


function KeyboardPress(){
    let keyPress = event.key
    let audio = document.getElementById(keyPress.toUpperCase())

    if (powerSlider.style.transform !="translateX(-5rem)"){
        if(audio){
            //audio.clearTimeout()
            audio.currentTime =0;
        

                audio.parentElement.classList.toggle ("playing")

                setTimeout(()=>{
                    audio.parentElement.classList.toggle("playing")

                }, 200)

                

            

            audio.play()
            display.innerHTML =audio.parentElement.id
            
        }
    }
    else{
        event.preventDefault();
    }


}
document.addEventListener("keydown", KeyboardPress)



const powerSlider = document.getElementById("power-slider")

powerSlider.addEventListener('click', () => {
    if (powerSlider.style.transform == "") {

    powerSlider.style.transform = "translateX(-5rem)"
    powerSlider.innerHTML = "I"
    display.style.opacity = ".1"

    

    Array.from(drumKeys).forEach(key =>{ 
        key.style.opacity = ".1"
        key.style.pointerEvents = "none"
        
    })
    
      
}
    else{
        powerSlider.style.transform = ""
        powerSlider.innerHTML= "O"
        display.style.opacity = "1"
    
        
        
    Array.from(drumKeys).forEach(key =>{ 
        key.style.opacity = "1"
        key.style.pointerEvents = ""

        
    })
    
        

    }
})




