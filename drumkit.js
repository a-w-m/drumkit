const drumKeys = document.getElementsByClassName("drum-pad");
const volSlider = document.getElementById("volume-slider");
const clips = document.getElementsByClassName("clip");
const powerSlider = document.getElementById("power-slider");

function switchPower(e) {
  if (powerSlider.style.transform == "") {
    powerSlider.style.transform = "translateX(-5rem)";
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
  Array.from(clips).forEach(clip => {
    clip.volume = volSlider.value * 0.01;
  });
}

function keyClick(e) {
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
  let keyPress = event.key;
  let audio = document.getElementById(keyPress.toUpperCase());

  if (powerSlider.style.transform != "translateX(-5rem)") {
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
