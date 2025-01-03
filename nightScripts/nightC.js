if (
  window.parent.location.href != "https://fnaj.briandean.dev/" &&
  Number(new URL(window.parent.location).searchParams.get("devmode")) != 1
)
  window.location.href = "https://fnaj.briandean.dev/";

var atDoor2 = false;
var door2Closed = false;
var time = 0;
var doorlightOn = false;
var mapPositions = {
  stage: "circle(7.6% at 66% 25%)",
  dining: "circle(7.6% at 65% 51%)",
  kitchen: "circle(7.6% at 55% 78%)",
  hallway2: "circle(7.6% at 75% 65%)",
  pantry: "circle(7.6% at 74% 77%)",
  hallway1: "circle(7.6% at 46% 24%)",
  arcade: "circle(7.6% at 30% 29%)",
  boysBathroom: "circle(7.6% at 13% 26%)",
  girlsBathroom: "circle(7.6% at 12% 50%)",
  storage: "circle(7.6% at 12% 72%)",
};

var halCanOpen = false;

var halTimeOut;

let params = new URL(document.location).searchParams;

var jimmyDifficulty = Number(params.get("jimmy"));
var halDifficulty = Number(params.get("hal"));
var foxDifficulty = Number(params.get("fox"));
var hootyDifficulty = Number(params.get("hooty"));
var sylviaDifficulty = Number(params.get("sylvia"));

var emptyDoorLight = document.querySelectorAll("img")[0];
var badDoorLight = document.querySelectorAll("img")[1];
var doorClosing = document.querySelectorAll("img")[2];
var doorClosed = document.querySelectorAll("img")[3];
var phone = document.querySelectorAll("img")[6];
var lorePoster = document.querySelectorAll("img")[7];
lorePoster.onclick = () => {
  if (lorePoster.style.opacity == "1") {
    window.location.href = "/nightHTMLs/secret.html";
  }
};
var clock = document.querySelectorAll("img")[8];
var mailBad = document.querySelectorAll("img")[4];
var map = document.querySelectorAll("img")[9];
var mapBad = document.querySelectorAll("img")[10];
var leftDoorBad = document.querySelectorAll("img")[5];

var buzzingNoise = new Audio("/assets/sounds/buzz.mp3");
buzzingNoise.loop = true;
var fanNoise = new Audio("/assets/sounds/fan.mp3");
fanNoise.loop = true;
var doorOpenNoise = new Audio("/assets/sounds/doorOpen.mp3");
var doorCloseNoise = new Audio("/assets/sounds/doorClose.mp3");
var monitorOnNoise = new Audio("/assets/sounds/monitoron.mp3");
var monitorOffNoise = new Audio("/assets/sounds/monitoroff.mp3");
var jumpscareNoise = new Audio("/assets/sounds/jumpscare.mp3");
var foxyJumpscareNoise = new Audio("/assets/sounds/foxyJumpscare.mp3");
var nightStartNoise = new Audio("/assets/sounds/nightStart.mp3");
nightStartNoise.volume = 0.25;
var nightEndNoise = new Audio("/assets/sounds/nightEnd.mp3");
nightEndNoise.volume = 0.25;
var sirenNoise = new Audio("/assets/sounds/Siren.mp3");
sirenNoise.loop = true;
sirenNoise.volume = 0;

monitorOffNoise.volume = 0;
monitorOnNoise.volume = 0;

var doorUseTime = 0;
var lightUseTime = 0;

var jimmyDeanPosition = 0;
var hideJimmy = true;

var clockCycle;

function fit() {
  var prevR = 0;
  var r = 1;
  while (r != prevR) {
    prevR = r;
    var width = document.querySelector(".game").offsetWidth;
    var height = document.querySelector(".game").offsetHeight;
    var windowWidth = $(document).outerWidth();
    var windowHeight = $(document).outerHeight();
    var r = 1;
    r = Math.min(windowWidth / width, windowHeight / height);

    $(".game").css({
      "-webkit-transform": "scale(" + r + ")",
      "-moz-transform": "scale(" + r + ")",
      "-ms-transform": "scale(" + r + ")",
      "-o-transform": "scale(" + r + ")",
      transform: "scale(" + r + ")",
    });
  }
  document.body.style.transition = "background 1s ease-out";
  document.body.style.background = "#0f0f0f";
  document.querySelector(".game").style.opacity = "1";
}

$(document).ready(fit);

window.addEventListener("resize", fit);

setInterval(() => {
  if (door2Closed) {
    doorUseTime++;
    if (doorUseTime > 60000) {
      doorOpenNoise.play();
      door2Closed = false;
      doorClosed.style.opacity = 0;
      document.querySelectorAll("button")[0].style.background = "transparent";
      setTimeout(() => {
        doorClosing.style.opacity = 0;
      }, 20);
    }
  }
  if (doorUseTime > 60000) {
    doorClosed.style.opacity = 0;
    doorClosing.style.opacity = 0;
  }
  if (doorlightOn) {
    lightUseTime++;
    if (lightUseTime > 60000) {
      emptyDoorLight.style.opacity = 0;
      badDoorLight.style.opacity = 0;
      document.querySelectorAll("button")[1].style.background = "transparent";
      doorlightOn = false;
      buzzingNoise.pause();
      sirenNoise.volume = 0;
    }
  }
}, 1);

nightStartNoise.play();
setTimeout(() => {
  monitorOffNoise.volume = 1;
  monitorOnNoise.volume = 1;
  document.getElementById("beginNight2").style.display = "none";
  fanNoise.play();
  sirenNoise.play();
  if (jimmyDifficulty != 0) {
    setTimeout(jimmyDean, Math.random() * 10000);
  }
  if (halDifficulty != 0) {
    setTimeout(halHubert, Math.round(Math.random() * 5000));
  }
  clockCycle = setInterval(() => {
    clock.style.opacity = 1;
    time += 1;
    if (time == 2) {
      clock.src = "/assets/images/3am.png";
    } else if (time == 3) {
      clock.src = "/assets/images/4_30am.png";
    } else if (time == 4) {
      clock.src = "/assets/images/6am.gif";
      time++;
      setTimeout(() => {
        document.body.style.background = "black";
        nightEndNoise.play();
        document.getElementById("endNight").style.display = "block";
        setTimeout(() => {
          if (
            jimmyDifficulty == 20 &&
            halDifficulty == 20 &&
            foxDifficulty == 20 &&
            hootyDifficulty == 20 &&
            sylviaDifficulty == 20
          ) {
            window.location.href = "/nightHTMLs/credits.html";
          } else {
            window.location.href = "/";
          }
        }, 10000);
        clearInterval(clockCycle);
      }, 4000);
    }
  }, 133750);
  setTimeout(() => {
    phone.style.opacity = 0;
    document.querySelectorAll("button")[3].style.display = "none";
  }, 15000);
}, 6000);

function activateLight(btn) {
  if (lightUseTime < 600000) {
    if (door2Closed || doorlightOn) {
      emptyDoorLight.style.opacity = 0;
      badDoorLight.style.opacity = 0;
      btn.style.background = "transparent";
      doorlightOn = false;
      buzzingNoise.pause();
      sirenNoise.volume = 0;
    } else {
      if (atDoor2) {
        badDoorLight.style.opacity = 1;
        sirenNoise.volume = 1;
      } else {
        emptyDoorLight.style.opacity = 1;
        sirenNoise.volume = 0;
      }
      btn.style.background = "#888888";
      doorlightOn = true;
      buzzingNoise.play();
    }
  }
}
function closeDoor(btn) {
  if (doorUseTime < 600000) {
    if (door2Closed) {
      doorOpenNoise.play();
      door2Closed = false;
      doorClosed.style.opacity = 0;
      btn.style.background = "transparent";
      setTimeout(() => {
        doorClosing.style.opacity = 0;
      }, 20);
    } else {
      doorCloseNoise.play();
      door2Closed = true;
      doorlightOn = false;
      buzzingNoise.pause();
      doorClosing.style.opacity = Number(doorUseTime < 600000);
      emptyDoorLight.style.opacity = 0;
      badDoorLight.style.opacity = 0;
      document.querySelectorAll("button")[1].style.background = "transparent";
      btn.style.background = "darkred";
      setTimeout(() => {
        doorClosed.style.opacity = Number(doorUseTime < 600000);
        sirenNoise.volume = 0;
      }, 20);
    }
  }
}

function pickupPhone(btn) {
  let call = new Audio("/assets/sounds/night4.mp3");
  call.play();
  phone.style.opacity = 0;
  btn.style.display = "none";
}

function closeMail() {
  if (mailBad.style.opacity == 1) {
    let closeSound = new Audio("/assets/sounds/mailClosing.mp3");
    closeSound.play();
  }
  mailBad.style.opacity = 0;
  clearTimeout(halTimeOut);
}

function blinkDoorLight() {
  if (doorlightOn && emptyDoorLight.style.opacity == 1) {
    emptyDoorLight.style.opacity = 0.5;
    setTimeout(() => {
      blinkDoorLight();
    }, Math.random() * 500);
  } else {
    if (!doorlightOn) {
      emptyDoorLight.style.opacity = 0;
    }
    setTimeout(() => {
      if (doorlightOn) {
        emptyDoorLight.style.opacity = 1;
      }
      setTimeout(() => {
        blinkDoorLight();
      }, Math.random() * 500);
    }, Math.random() * 500);
  }
}
blinkDoorLight();

var hootyOn = false;

function toggleMap(oo) {
  if (oo) {
    lorePoster.style.opacity = 0;
    monitorOnNoise.currentTime = 0;
    monitorOnNoise.play();
    if (
      Math.round(Math.random() * 200) <= hootyDifficulty &&
      hootyDifficulty != 0
    ) {
      document.getElementById("owlTrip").style.display = "block";
      if (!hootyOn) {
        hootyOn = true;
        setTimeout(() => {
          hootyOn = false;
          if (map.style.display == "block" && time != 5) {
            document.getElementById("jumpscare4").style.display = "block";
            sirenNoise.volume = 0;
            jumpscareNoise.play();
            setTimeout(() => {
              window.location.href = "/nightHTMLs/night5.html";
            }, 3000);
          }
        }, 1000);
      }
    }
    map.style.display = "block";
    if (!hideJimmy) {
      mapBad.style.display = "block";
    }
    if (halCanOpen) {
      halCanOpen = false;
      mailBad.style.opacity = 1;
      halTimeOut = setTimeout(() => {
        if (mailBad.style.opacity == 1 && time != 5) {
          document.getElementById("jumpscare2").style.display = "block";
          sirenNoise.volume = 0;
          jumpscareNoise.play();
          setTimeout(() => {
            window.location.href = "/";
          }, 3000);
        }
      }, 3000);
    }
  } else {
    document.getElementById("owlTrip").style.display = "none";
    if (Math.round(Math.random() * 1000) == 0) {
      lorePoster.style.opacity = 1;
    }

    monitorOffNoise.currentTime = 0;
    monitorOffNoise.play();
    map.style.display = "none";
    mapBad.style.display = "none";
  }
}

function jimmyDean() {
  jimmyDeanPosition == 4 ? (jimmyDeanPosition = 2) : jimmyDeanPosition;
  randomWalk = Math.round(Math.random() * 9);
  if (randomWalk <= 1) {
    jimmyDeanPosition--;
  } else if (randomWalk <= time + 5) {
    jimmyDeanPosition++;
  }
  jimmyDeanPosition = Math.max(Math.min(jimmyDeanPosition, 4), 0);

  switch (jimmyDeanPosition) {
    case 0:
      mapBad.style.clipPath = mapPositions.stage;
      atDoor2 = false;
      break;
    case 1:
      mapBad.style.clipPath = mapPositions.dining;
      atDoor2 = false;
      break;
    case 2:
      mapBad.style.clipPath = mapPositions.hallway1;
      atDoor2 = false;
      break;
    case 3:
      mapBad.style.clipPath = mapPositions.arcade;
      atDoor2 = true;
      setTimeout(testForDie, Math.random() * 3000 + 5000);
      break;
    case 4:
      mapBad.style.clipPath = mapPositions.boysBathroom;
      atDoor2 = false;
      break;
    default:
      mapBad.style.clipPath = "circle(0% at 0% 0%)";
      atDoor2 = false;
      break;
  }
  mapBad.style.filter = "hue-rotate(0deg);";
  if (
    Math.round(Math.random() * 200) <= sylviaDifficulty &&
    sylviaDifficulty != 0
  ) {
    mapBad.clipPath = "clip-path: circle(100% at 50% 50%);";
    mapBad.style.filter = "hue-rotate(275deg);";
  }
  hideJimmy = false;
  if (map.style.display == "block") {
    mapBad.style.display = "block";
  }
  setTimeout(() => {
    hideJimmy = true;
    if (map.style.display == "block") {
      mapBad.style.display = "none";
    }
  }, 1000);
  setTimeout(jimmyDean, (Math.random() * 7500 + 2500) / (jimmyDifficulty / 4));
}

function testForDie() {
  if (atDoor2 && !door2Closed && time != 5) {
    document.getElementById("jumpscare1").style.display = "block";
    sirenNoise.volume = 0;
    jumpscareNoise.play();
    setTimeout(() => {
      window.location.href = "/";
    }, 3000);
  } else if (atDoor2) {
    setTimeout(testForDie, Math.random() * 3000 + 5000);
  }
}

function spookyNoises() {
  let sound = Math.round(Math.random() * 100);
  let noise;
  if (sound == 0) {
    noise = new Audio("/assets/sounds/say3.wav");
    noise.volume = 1;
  } else if (sound < 45) {
    noise = new Audio("/assets/sounds/say2.wav");
    noise.volume = 1;
  } else if (sound < 90) {
    noise = new Audio("/assets/sounds/say1.wav");
    noise.volume = 1;
  } else {
    noise = new Audio("/assets/sounds/spoopymusic.wav");
    noise.volume = 0.5;
  }
  noise.play();
  setTimeout(spookyNoises, Math.round(Math.random() * 60000 + 60000));
}

function halHubert() {
  halCanOpen = true;
  setTimeout(
    halHubert,
    (Math.random() * 12500) / (halDifficulty / 4 + time) + 3200
  );
}

var theFoxIsComing = true;

function theFox() {
  if (theFoxIsComing) {
    if (leftDoorBad.style.opacity < 1) {
      leftDoorBad.style.opacity =
        Number(leftDoorBad.style.opacity) + 0.02 * (foxDifficulty / 4 + time);
      if (
        leftDoorBad.style.opacity >
        1 - 0.02 * (foxDifficulty / 4 + time) * 10
      ) {
        fanNoise.volume = 0;
        heartBeatNoise.currentTime = 0;
        heartBeatNoise.play();
      }
    } else if (map.style.display == "none" && time != 5) {
      heartBeatNoise.pause();
      document.getElementById("jumpscare3").style.display = "block";
      sirenNoise.volume = 0;
      fanNoise.volume = 0;
      foxyJumpscareNoise.play();
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    }
    if (map.style.display == "block" && leftDoorBad.style.opacity > 0.6) {
      heartBeatNoise.pause();
      fanNoise.volume = 1;
      leftDoorBad.style.opacity = 0;
      theFoxIsComing = false;
      setTimeout(
        () => {
          theFoxIsComing = true;
        },
        (Math.random() * 12500) / (foxDifficulty / 4 + time) + 13200
      );
    }
  }
  setTimeout(theFox, 100);
}

setTimeout(
  () => {
    spookyNoises();
    setTimeout(
      theFox,
      (Math.random() * 12500) / (foxDifficulty / 4 + time) + 13200
    );
  },
  Math.round(Math.random() * 10000) + 118000
);

document.body.onload = () => {
  $("img").mousedown(function (e) {
    e.preventDefault();
  });

  $("body").on("contextmenu", function (e) {
    return false;
  });

  $("body").on("keydown", function (e) {
    e.preventDefault();
  });
};
