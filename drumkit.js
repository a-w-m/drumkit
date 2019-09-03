const drumKeys = document.getElementsByClassName("drum-pad");
const volSlider = document.getElementById("volume-slider");
const clips = document.getElementsByClassName("clip");
const powerSlider = document.getElementById("power-slider");

function switchPower(e) {
    /*This function is for the powerSlider 'click' event listener and controls the
     'power switch' feature of the drumkit, managing the off/on transition of the switch */
  if (powerSlider.style.transform == "") {
    powerSlider.style.transform = "translateX(-100%)";
    powerSlider.innerHTML = "I";
    display.style.opacity = ".1";

    Array.from(drumKeys).forEach(key => {
      key.style.opacity = ".1";
      key.style.pointerEvents = "none";
    });
  } else {
    powerSlider.style.transform = "";
    powerSlider.innerHTML = "O";
    display.style.opacity = "1";

    Array.from(drumKeys).forEach(key => {
      key.style.opacity = "1";
      key.style.pointerEvents = "";
    });
  }
}

Array.from(clips).forEach(clip => {
  clip.volume = 0.5;
});

function changeVolume(e) {
    /*This function changes the volume of the audio elements as the volume slider changes*/
  Array.from(clips).forEach(clip => {
    clip.volume = volSlider.value * 0.01;
  });
}

function keyClick(e) {
    /* function for the key(drum-pad) 'click' event listener, plays the audio when key is clicked and changes the display text, 
    allows for successive clicks with currentTime=0*/
  let key = document.getElementById(e.srcElement.id);
  let audio = document.getElementById(e.srcElement.innerText);

  if (audio) {
    audio.currentTime = 0;
    audio.parentElement.classList.toggle("playing");
    audio.play();
    display.innerHTML = key.id;
  }
}

function keyboardPress() {
 /* function for the document 'keydown' event listener, plays the audio when key is pressed and changes the display text, 
    allows for successive pressed with currentTime=0*/
  let keyPress = event.key;
  let audio = document.getElementById(keyPress.toUpperCase());

  if (powerSlider.style.transform != "translateX(-100%)") {
    if (audio) {
      audio.currentTime = 0;
      audio.parentElement.classList.toggle("playing");
      audio.play();
      display.innerHTML = audio.parentElement.id;
    }
  } else {
    event.preventDefault();
  }
}

function removeTransition(e) {
    /*function that removes playing class on keys, used in transitionend event listener*/
  this.classList.remove("playing");
}

powerSlider.addEventListener("click", switchPower);

volSlider.addEventListener("change", changeVolume);

Array.from(drumKeys).forEach(key => {
  key.addEventListener("click", keyClick);
});

Array.from(drumKeys).forEach(key => {
  key.addEventListener("transitionend", removeTransition);
});

document.addEventListener("keydown", keyboardPress);
